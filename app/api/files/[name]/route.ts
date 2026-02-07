import fs from 'fs/promises';
import path from 'path';
import { generatePDF } from '../generatePdf';

export async function GET() {
  const { renderToString } = await import('react-dom/server');
  const { createElement } = await import('react');
  const Portfolio = (await import('@/components/Portfolio')).default;

  const data = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), 'data', 'profile.json'),
      'utf-8'
    )
  );

  const html = renderToString(createElement(Portfolio, { data }));
  const pdf = await generatePDF(html);

  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="portfolio.pdf"'
    }
  });
}