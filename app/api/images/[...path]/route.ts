import fs from 'fs/promises';
import getDir from '@/libs/getDir';

// /public 이 아닌 경로의 이미지 파일 표시 
// 브라우저 주소창에 이미지 경로 작성

/**
 * App Router
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 * /api/<파라미터명>/route.ts
 * 라우터 함수명은 메소드명 대문자로 작성
 */
export async function GET(
  _: Request,
  context: { params: Promise<{ path: string[]; }>; }
) {
  const params = await context.params;
  const imagePath = getDir("images", ...params.path);
  const image = await fs.readFile(imagePath);

  const ext = params.path[params.path.length - 1].split('.').pop();
  return new Response(image, {
    headers: { 'Content-Type': `image/${ext}` }
  });
}