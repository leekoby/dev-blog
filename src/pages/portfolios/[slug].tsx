import { PageLayout } from '@/components/layouts';
import { getPortfolioBySlugWithMarkdown, getPortfolioSlugs } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Image from 'next/image';

interface Props {
  portfolio: Portfolio;
}

const PortfolioDetail: NextPage<Props> = ({ portfolio }) => {
  return (
    <PageLayout pageTitle={portfolio.title}>
      <div className='pt-6'>
        <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
              {portfolio.title}
            </h1>
          </div>
          <div className='mt-4 lg:row-span-3 lg:mt-0 relative'>
            <Image
              layout='fill'
              className='h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full'
              alt=''
              src={portfolio.coverImage}
            />
          </div>

          <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8'>
            <div>
              <h3 className='sr-only'>Description</h3>

              <div className='space-y-6'>
                <p className='text-base text-gray-900'>{portfolio.description}</p>
              </div>
            </div>

            <div className='mt-10'>
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

            <div className='mt-10'>
              <h2 className='text-sm font-medium text-gray-900'>Details</h2>
              <div className='mt-4 space-y-6'>
                <article className='text-sm text-gray-600'>
                  <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
                </article>
              </div>
            </div>
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

  console.log('---paths----');
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default PortfolioDetail;
