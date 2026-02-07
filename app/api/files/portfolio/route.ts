import { generatePDF } from '../generatePdf';
import { getJson } from '@/libs/getter';
import {
  ProfileType,
  // SkillsType 
} from '@/types/Data';
const { renderToString } = await import('react-dom/server');
const { createElement } = await import('react');
const Portfolio = (await import('@/components/Portfolio')).default;

/*
 [Issue] Ecmascript file had an error
 특정 라이브러리가 브라우저 전용 API 를 사용하거나 ES Module로만 작성되어 있을 때, 
 NextJS 가 서버에서 pre-render 하려고 하면 에러 발생
 => Dynamic Import 로 해결
 */
export async function GET() {
  const [
    profileData,
    // skillsData
  ] = await Promise.all([
    getJson('profile.json') as Promise<ProfileType>,
    // getJson('skills.json') as Promise<SkillsType>,
  ]);

  const html = renderToString(createElement(Portfolio, {
    profile: profileData,
    // skills: skillsData,
  }));
  const pdf = await generatePDF(html);

  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="portfolio.pdf"'
    }
  });
}