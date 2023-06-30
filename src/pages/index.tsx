import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { BlogList } from '@/components/blogs';
import { PortfolioList } from '@/components/portfoilo';
import { BaseLayout } from '@/components/layouts';
import { getBlogFileNames, getBlog } from '@/lib/md';
import { join } from 'path';

/** 2023/06/30 - 메인페이지 - by leekoby */
const Home: NextPage = () => {
  return (
    <BaseLayout>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        Newest Blogs
        <Link legacyBehavior href='/blogs'>
          <a className='text-sm ml-1 text-indigo-600'>(See All)</a>
        </Link>
      </h2>

      {/* Blog List  */}
      <BlogList />

      <br></br>

      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        Portfolios
        <Link legacyBehavior href='/portfolios'>
          <a className='text-sm ml-1 text-indigo-600'>(See All)</a>
        </Link>
      </h2>

      {/* Portfolio List */}
      <PortfolioList />
    </BaseLayout>
  );
};

/** 2023/06/30 - 메인페이지 StaticProps - by leekoby */
export const getStaticProps: GetStaticProps = () => {
  // 블로그 파일 이름 가져오기
  const blogFileNames = getBlogFileNames();

  // 블로그 내용 가져오기
  blogFileNames.forEach((blogFileName) => {
    const blogContent = getBlog(blogFileName);
    console.log(blogContent);
  });

  return {
    props: {},
  };
};

export default Home;
