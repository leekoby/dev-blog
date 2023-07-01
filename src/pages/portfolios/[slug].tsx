import { PageLayout } from '@/components/layouts';
import { getPortfolioBySlugWithMarkdown, getPortfolioSlugs } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  portfolio: Portfolio;
}

const PortfolioDetail: NextPage<Props> = ({ portfolio }) => {
  return (
    <PageLayout pageTitle={portfolio.title}>
      <div className='w-2/3 m-auto'>{portfolio.title}</div>
    </PageLayout>
  );
};

/** 2023/07/01 - params slug type  - by leekoby */
interface Params extends ParsedUrlQuery {
  slug: string;
}

/** 2023/07/01 - 포트폴리오 상세글 GetStaticProps  - by leekoby */
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { slug } = context.params!;
  const portfolio = await getPortfolioBySlugWithMarkdown(slug);

  return {
    props: { portfolio },
  };
};
/** 2023/07/01 - 포트폴리오 상세글 GetStaticPaths  - by leekoby */
export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPortfolioSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  console.log('---paths----');
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default PortfolioDetail;
