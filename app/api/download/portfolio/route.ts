import { NextRequest } from 'next/server';
import { FILE_URL } from '@/constants/url';
import generatePDF from '@/libs/generatePdf';

/*
 [Issue] 컴포넌트 직렬화 방식: Ecmascript file had an error
 특정 라이브러리가 브라우저 전용 API 를 사용하거나 ES Module로만 작성되어 있을 때, 
 NextJS 가 서버에서 pre-render 하려고 하면 에러 발생
 => Dynamic Import 로 해결
 */

//  import { renderToString } from 'react-dom/server';
//  import { createElement } from 'react';
//  import Portfolio from '@/components/Portfolio';
//  import { PortfolioData } from '@/types/Data';

//  export function renderPortfolio(data: PortfolioData) {
//    return renderToString(createElement(Portfolio, { ...data }));
//  }

export async function GET(req: NextRequest) {
  // [Issue] 컴포넌트 직렬화 방식은 Link, Image 로 인해 에러 발생 => 특정 페이지 캡쳐 방식 사용
  // const [
  //   profileData,
  // ] = await Promise.all([
  //   getJson('profile.json') as Promise<ProfileType>,
  // ]);
  // const html = renderToString(createElement(Portfolio, {
  //   profile: profileData,
  // }));
  // const pdf = await generatePDF(html);

  // 캡쳐할 화면 페이지 주소
  const url = new URL(`${FILE_URL}/portfolio`, req.url);
  const pdf = await generatePDF(url.href);
  if (!pdf) {
    return new Response('Failed to generate PDF', { status: 500 });
  }

  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="portfolio.pdf"'
    }
  });
}