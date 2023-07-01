import { Portfolio } from '@/types/portfolio';
import PortfolioItem from './PortfolioItem';

interface Props {
  portfolios: Portfolio[];
}

/** 2023/06/30 - 포트폴리오 리스트 - by leekoby */
const PortfolioList: React.FC<Props> = ({ portfolios }): JSX.Element => {
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {portfolios.map((portfolio) => (
        <PortfolioItem portfolio={portfolio} key={portfolio.slug} />
      ))}
    </div>
  );
};

export default PortfolioList;
