import type { Browser, LaunchOptions } from 'puppeteer-core';

// https://vercel.com/kb/guide/deploying-puppeteer-with-nextjs-on-vercel
// https://vercel.com/templates/template/puppeteer-on-vercel
// https://github.com/gabenunez/puppeteer-on-vercel/blob/main/app/api/screenshot/route.ts

/*
[Issue] puppeteer vercel 배포 이슈
puppeteer-core + @sparticuz/chromium-min

개발 환경에서만 puppeteer, 나머지는 전부 puppeteer-core
run build => run start 할 때 정상 작동하는 이유는 
devDependencies 가 node_modules 에 포함되었기 때문

Failed to get Chromium path: AssertionError [ERR_ASSERTION]: protocol mismatch
위 이슈로 http 환경에서는 @sparticuz/chromium-min 사용 불가
*/

const isProduction = process.env.NODE_ENV === 'production';

export default async function generatePDF(html: string) {
  let browser: Browser | undefined;

  try {
    let puppeteer;
    const launchOptions: LaunchOptions = { headless: true };

    if (isProduction) {
      // Vercel: puppeteer-core 와 다운로드한 Chromium 바이너리 사용
      puppeteer = await import("puppeteer-core");
      const chromium = (await import("@sparticuz/chromium-min")).default;
      // 캐시된 Chromium 실행 파일 경로 가져오기
      const executablePath = await getChromiumPath();
      // 브라우저 실행 옵션에 Chromium 전용 인자 추가: 보안, 샌드박스 설정 등
      launchOptions.args = chromium.args;
      // Chromium 바이너리 위치 지정 (기본 Chrome 대신 다운로드한 파일 사용)
      launchOptions.executablePath = executablePath;
      console.log("Launching browser with executable path:", executablePath);
    } else {
      // Local: puppeteer 사용
      // An `executablePath` or `channel` must be specified for `puppeteer-core`
      puppeteer = await import("puppeteer");
    }

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // 한글 폰트 포함
    const htmlWithFont = `
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Noto Sans KR', sans-serif; }
  </style>
</head>
<body>
  ${html}
</body>
</html>
`;
    await page.setContent(htmlWithFont, {
      waitUntil: 'networkidle0' // 요청 완료까지 대기
    });
    const pdf = await page.pdf();
    await browser.close();

    return pdf;
  } catch (error) {
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 다운로드 데이터 캐싱
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

async function getChromiumPath(): Promise<string> {
  if (cachedExecutablePath) return cachedExecutablePath;

  // install 된 패키지와 버전이 동일해야 함
  const CHROMIUM_PACK_URL = "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";

  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium
      .executablePath(CHROMIUM_PACK_URL) // tar 파일 다운로드 + 압축 해제
      .then((path) => {
        cachedExecutablePath = path;
        console.log("Chromium path resolved:", path);
        return path;
      })
      .catch((error) => {
        console.error("Failed to get Chromium path:", error);
        downloadPromise = null; // 실패 시 초기화 (다음 요청에서 재시도)
        throw error;
      });
  }

  return downloadPromise;
}
