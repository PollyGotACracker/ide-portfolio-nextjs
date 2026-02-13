/**
 * 1. 컴포넌트 코드를 HTML로 변환 후 직렬화, 서버 라우터에서 전달 => Image 컴포넌트 이슈 발생
 * 2. 배포 환경에서 chromium 서버 별도 실행 후 링크 화면 렌더링, 서버 라우터에서 전달 => 다운로드 속도 저하(15초 이상)
 * => 프로젝트 빌드 후 서버를 실행하고 pdf 파일 생성 후 배포
 */

// 빌드 결과물을 기반으로 실행(next start)
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import 'dotenv/config'; // .env 읽기

const BASE_URL = 'http://localhost';
const PORT = '3333';
const URL = `${BASE_URL}:${PORT}`;
const STATIC_PATH_TARGET = 'public/files';
const STATIC_PATH_FONT = 'public/fonts/NanumGothic-Regular.ttf';

const pages = [
  { pagePath: '/portfolio', filePath: '/portfolio.pdf' }
];

// 저장할 경로가 없으면 생성
const dir = path.join(process.cwd(), STATIC_PATH_TARGET);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 서버 준비 및 대기(30초)
const server = spawn('npx', ['next', 'start', '-p', PORT], {
  shell: true,
  stdio: 'pipe'
});
for (let i = 0; i < 30; i++) {
  try {
    await fetch(URL);
    break;
  } catch {
    await new Promise(r => setTimeout(r, 1000));
  }
}

// 브라우저 실행 및 URL 화면 렌더링
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--font-render-hinting=none'],
});

for (const { pagePath, filePath } of pages) {
  const page = await browser.newPage();
  // 페이지 진입을 위한 헤더 설정
  await page.setExtraHTTPHeaders({
    'x-build-id': process.env.BUILD_BYPASS_TOKEN
  });
  // React hydration 이슈 방지
  await page.setJavaScriptEnabled(false);
  const response = await page.goto(URL + pagePath, { waitUntil: 'domcontentloaded' });
  console.log('PDF Status:', response.status());

  // light 테마 강제 적용
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' }
  ]);
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
  });

  // ttf 폰트를 사용하여 한국어 적용
  const fontBuffer = fs.readFileSync(path.join(process.cwd(), STATIC_PATH_FONT));
  const fontBase64 = fontBuffer.toString('base64');
  await page.addStyleTag({
    content: `
    @font-face {
      font-family: 'NanumGothic';
      src: url(data:font/truetype;base64,${fontBase64}) format('truetype');
    }
    * { font-family: 'NanumGothic' !important; }
  `
  });
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: STATIC_PATH_TARGET + filePath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  });
  await page.close();
}

await browser.close();
server.kill();
console.log('PDF generated!');
process.exit(0);