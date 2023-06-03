import BlogCard from '@/components/BlogCard';
import { InferGetStaticPropsType, NextPage } from 'next';

interface PostApiResponse {
  postInfo: {
    title: string;
    slug: string;
    meta: string;
  }[];
}

export const getStaticProps = async () => {
  const { postInfo }: PostApiResponse = await fetch('http://localhost:3000/api/posts').then(
    (data) => data.json()
  );
  return {
    props: { posts: postInfo },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-3xl mx-auto p-5 space-y-5'>
      {posts.map((post) => (
        <BlogCard title={post.title} desc={post.slug} key={post.slug} slug={post.slug} />
      ))}
    </div>
  );
};

export default Blogs;
