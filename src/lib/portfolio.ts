import { Portfolio } from '@/types/portfolio';
import { join } from 'path';
import { getBlogFileNames } from './blogs';
import { getAllItems, getDir, getFileNames, getItemInPath, markdwonToHtml } from './md';

/** 2023/07/01 - 포트폴리오 경로 - by leekoby */
const PORTFOLIO_DIR = getDir('/src/content/portfolios');

/** 2023/07/01 - PORTFOLIO_DIR 디렉토리에 위치한 모든 게시물의 파일 이름을 가져오기 / getFileNames 함수를 호출 - by leekoby */
const getPortfoliosFileNames = () => {
  return getFileNames(PORTFOLIO_DIR);
};

/** 2023/07/01 - getBlogFileNames을 호출해서 모든 게시물의 이름을 가져온 후 slug만 배열 가공해서 리턴하는 함수 - by leekoby */
const getPortfolioSlugs = () => {
  return getPortfoliosFileNames().map((fileName) => fileName.replace(/.md$/, ''));
};

/** 2023/07/01 - 인자로 주어진 파일명에 해당하는 게시물의 내용을 가져오는 함수 - by leekoby */
const getPortfolio = (filename: string): Portfolio => {
  const portfolio = getItemInPath(join(PORTFOLIO_DIR, filename)) as Portfolio;
  portfolio.slug = filename.replace(/.md$/, '');
  return portfolio;
};
/** 2023/07/01 - 모든 블로그 게시물들을 Portfolio[] 형식의 배열로 반환 - by leekoby */
const getPortfolios = (): Portfolio[] => {
  const names = getPortfoliosFileNames();
  return getAllItems(names, getPortfolio) as Portfolio[];
};

/** 2023/07/01 - slug를 통해 포트폴리오 글을 가져오도록 하는 함수 - by leekoby */
const getPortfolioBySlugs = (slug: string) => {
  const fileName = slug + '.md';
  return getPortfolio(fileName);
};

/** 2023/07/01 - html을 markdown으로 변환해주는 함수 - by leekoby */
const getPortfolioBySlugWithMarkdown = async (slug: string): Promise<Portfolio> => {
  const portfolio = getPortfolioBySlugs(slug);
  portfolio.content = await markdwonToHtml(portfolio.content);
  return portfolio;
};

export { getPortfolios, getPortfolioBySlugWithMarkdown, getPortfolioSlugs };
