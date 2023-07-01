import { PageLayout } from '@/components/layouts';
import { PortfolioList } from '@/components/portfoilo';
import { getPortfolios } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  portfolios: Portfolio[];
}
/** 2023/07/01 - All Portfolios Page - by leekoby */

const PortfoliosPage: NextPage<Props> = ({ portfolios }) => {
  return (
    <PageLayout pageTitle={'All Portfolios'}>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        <>All Portfolios</>
      </h2>
      <PortfolioList portfolios={portfolios} />
    </PageLayout>
  );
};

export default PortfoliosPage;

/** 2023/07/01 - All Portfolios Page GetStaticProps- by leekoby */
export const getStaticProps: GetStaticProps = () => {
  const portfolios = getPortfolios();

  return { props: { portfolios } };
};
