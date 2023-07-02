import classess from '@/styles/markdown.module.css';
import { PageLayout } from '@/components/layouts';
import { getPortfolioBySlugWithMarkdown, getPortfolioSlugs } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import PortfolioHeader from '@/components/portfoilo/portfolio-header';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, dracula, prism, materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import CustomReactMarkdown from '@/components/common/custom-react-markdown';

interface Props {
  portfolio: Portfolio;
}

const PortfolioDetail: NextPage<Props> = ({ portfolio }) => {
  return (
    <PageLayout pageTitle={portfolio.title}>
      <div className='m-auto '>
        <PortfolioHeader portfolio={portfolio} />

        {/* highlight */}
        <div className='my-10 '>
          <h3 className='text-3xl font-semibold text-gray-900'>Highlights</h3>
          <div className='mt-7 '>
            <ul role='list' className='list-disc space-y-5 pl-4 text-2xl'>
              {portfolio.highlights.map((highlight) => (
                <li key={highlight} className='text-gray-700'>
                  <span className='text-gray-600'>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        {/* content */}
        <article className='prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none my-10'>
          <CustomReactMarkdown data={portfolio} />
        </article>
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
