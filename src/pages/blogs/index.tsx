import { BlogList } from '@/components/blogs';
import { PageLayout } from '@/components/layouts';
import { getBlogs } from '@/lib/blogs';
import { Blog } from '@/types/blog';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  blogs: Blog[];
}
/** 2023/07/01 - All Blogs Page - by leekoby */
const BlogsPage: NextPage<Props> = ({ blogs }) => {
  return (
    <PageLayout pageTitle={'All Blogs'}>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        <>All Blogs</>
      </h2>
      <BlogList blogs={blogs} />
    </PageLayout>
  );
};

export default BlogsPage;
/** 2023/07/01 - All Blogs Page GetStaticProps- by leekoby */
export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();

  return { props: { blogs } };
};
