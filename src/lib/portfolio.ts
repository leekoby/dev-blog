import { Portfolio } from '@/types/portfolio';
import { join } from 'path';
import { getBlogFileNames } from './blogs';
import { getAllItems, getDir, getFileNames, getItemInPath } from './md';

/** 2023/07/01 - 포트폴리오 경로 - by leekoby */
const PORTFOLIO_DIR = getDir('/src/content/portfolios');

/** 2023/06/30 - PORTFOLIO_DIR 디렉토리에 위치한 모든 게시물의 파일 이름을 가져오기 / getFileNames 함수를 호출 - by leekoby */
const getPortfoliosFileNames = () => {
  return getFileNames(PORTFOLIO_DIR);
};

/** 2023/06/30 - 인자로 주어진 파일명에 해당하는 게시물의 내용을 가져오는 함수 - by leekoby */
const getPortfolio = (filename: string): Portfolio => {
  const portfolio = getItemInPath(join(PORTFOLIO_DIR, filename)) as Portfolio;
  portfolio.slug = filename.replace(/.md$/, '');
  return portfolio;
};
/** 2023/06/30 - 모든 블로그 게시물들을 Portfolio[] 형식의 배열로 반환 - by leekoby */
const getPortfolios = (): Portfolio[] => {
  const names = getPortfoliosFileNames();
  return getAllItems(names, getPortfolio) as Portfolio[];
};

export { getPortfolios };
