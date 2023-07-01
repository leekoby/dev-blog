import { PageLayout } from '@/components/layouts';
import { getPortfolioBySlugWithMarkdown, getPortfolioSlugs } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import PortfolioHeader from '@/components/portfoilo/portfolio-header';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  portfolio: Portfolio;
}

const PortfolioDetail: NextPage<Props> = ({ portfolio }) => {
  return (
    <PageLayout pageTitle={portfolio.title}>
      <div className='w-2/3 m-auto'>
        <PortfolioHeader portfolio={portfolio} />
        {/* highlight */}
        <div className='my-10'>
          <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

          <div className='mt-4'>
            <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
              {portfolio.highlights.map((highlight) => (
                <li key={highlight} className='text-gray-400'>
                  <span className='text-gray-600'>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        {/* content */}
        <div className='mt-10'>
          <div className='mt-4 space-y-6'>
            <article className='prose lg:prose-lg text-sm text-gray-600'>
              <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
            </article>
          </div>
        </div>
      </div>
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

  return {
    paths,
    fallback: false,
  };
};

export default PortfolioDetail;
