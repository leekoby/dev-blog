import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { BlogHeader } from '@/components/blogs';
import { PageLayout } from '@/components/layouts';

import { getBlogBySlugWithMarkdown, getBlogsSlugs } from '@/lib/blogs';

import { Blog } from '@/types/blog';
import CustomReactMarkdown from '@/components/common/custom-react-markdown';

interface Props {
  blog: Blog;
}

/** 2023/06/30 - 블로그 게시글 상세 페이지 - by leekoby */
const BlogDetail: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <PageLayout pageTitle={blog.title}>
        <div className=' m-auto'>
          {/* Blog Header Starts */}
          <BlogHeader blog={blog} />
          {/* Blog Header Ends */}
         

          <article className='prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none my-10'>
            {/* Blog Content Here */}
            <CustomReactMarkdown data={blog} />
          </article>
        </div>
      </PageLayout>
    </>
  );
};

export default BlogDetail;

/** 2023/06/30 - params slug type  - by leekoby */
interface Params extends ParsedUrlQuery {
  slug: string;
}

/** 2023/06/30 - 블로그 상세글 GetStaticProps  - by leekoby */
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { slug } = context.params!;
  const blog = await getBlogBySlugWithMarkdown(slug);

  return {
    props: { blog },
  };
};
/** 2023/06/30 - 블로그 상세글 GetStaticPaths  - by leekoby */
export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getBlogsSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
