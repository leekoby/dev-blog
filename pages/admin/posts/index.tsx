import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import PostCard from '@/components/common/PostCard';
import { PostDetail } from '@/utils/types';
import { formatPosts, readPostsFromDb } from '@/lib/utils';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const posts = [
  {
    title: 'string1',
    slug: 'string',
    meta: 'string',
    tags: ['string'],
    thumbnail: '',
    createdAt: Date.now(),
  },
  {
    title: 'string2',
    slug: 'string',
    meta: 'string',
    tags: ['string'],
    thumbnail: '',
    createdAt: Date.now(),
  },
  {
    title: 'string3',
    slug: 'string',
    meta: 'string',
    tags: ['string'],
    thumbnail: '',
    createdAt: Date.now(),
  },
];

let pageNo = 0;
const limit = 0;
/** 2023/06/09 - 게시글 리스트 - by leekoby */
const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);

  return (
    <AdminLayout>
      <div className='max-w-4xl mx-auto p-3'>
        <div className='grid gird-col-3 gap-4'>
          {postsToRender.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}
/** 2023/06/09 - 게시글 Fetching  - by leekoby */
export const getServerSideProps: GetServerSideProps<ServerSideResponse> = async () => {
  try {
    //read
    const posts = await readPostsFromDb(limit, pageNo);
    //formatting
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Posts;
