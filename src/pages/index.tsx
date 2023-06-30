import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { BlogList } from '@/components/blogs';
import { PortfolioList } from '@/components/portfoilo';
import { BaseLayout } from '@/components/layouts';
import { getBlogs } from '@/lib/blogs';
import { Blog } from '@/types/blog';
import { saveSearchData } from '@/lib/md';



interface Props {
  blogs: Blog[];
}

/** 2023/06/30 - 메인페이지 - by leekoby */
const Home: NextPage<Props> = ({ blogs }) => {
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
      <PortfolioList />
    </BaseLayout>
  );
};

/** 2023/06/30 - 메인페이지 StaticProps - by leekoby */
export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();

  saveSearchData(blogs);

  return {
    props: { blogs },
  };
};

export default Home;
