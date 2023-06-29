import PortfolioItem from './PortfolioItem';

interface Props {}

const portfolios = [
  {
    slug: 'test1',
    title: 'test1',
    description: 'test1',
    date: '2023-06-30',
    coverImage: 'https://thrangra.sirv.com/Ethereum_blue_light-small.jpg',
  },
];
/** 2023/06/30 - 포트폴리오 리스트 - by leekoby */
const PortfolioList: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {portfolios.map((portfolio) => (
        <PortfolioItem portfolio={portfolio} key={portfolio.slug} />
      ))}
    </div>
  );
};

export default PortfolioList;
