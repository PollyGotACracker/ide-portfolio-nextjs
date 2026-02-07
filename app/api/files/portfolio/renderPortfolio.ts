import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import Portfolio from '@/components/Portfolio';
import { PortfolioData } from '@/types/Data';

export function renderPortfolio(data: PortfolioData) {
  return renderToString(createElement(Portfolio, { ...data }));
}