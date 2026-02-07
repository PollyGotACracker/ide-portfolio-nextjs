import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import Portfolio from '@/components/Portfolio';

export function renderPortfolio(data: { hello: string; }) {
  return renderToString(createElement(Portfolio, { data }));
}