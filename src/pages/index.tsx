import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { BlogList } from '@/components/blogs';
import { PortfolioList } from '@/components/portfoilo';
import { BaseLayout } from '@/components/layouts';
import { getBlogs } from '@/lib/blogs';
import { Blog } from '@/types/blog';
import { saveSearchData } from '@/lib/md';
import { getPortfolios } from '@/lib/portfolio';
import { Portfolio } from '@/types/portfolio';

interface Props {
  blogs: Blog[];
  portfolios: Portfolio[];
}

/** 2023/06/30 - 메인페이지 - by leekoby */
const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  return (
    <BaseLayout>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        <>
          Newest Blogs
          <Link href='/blogs' className='text-sm ml-1 text-indigo-600'>
            (See All)
          </Link>
        </>
      </h2>

      {/* Blog List  */}
      <BlogList blogs={blogs} />

      <br></br>

      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        <>
          Portfolios
          <Link href='/portfolios' className='text-sm ml-1 text-indigo-600'>
            (See All)
          </Link>
        </>
      </h2>

      {/* Portfolio List */}
      <PortfolioList portfolios={portfolios} />
    </BaseLayout>
  );
};

/** 2023/06/30 - 메인페이지 StaticProps - by leekoby */
export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();
  const portfolios = getPortfolios();

  saveSearchData(blogs);

  return {
    props: { blogs, portfolios },
  };
};

export default Home;
