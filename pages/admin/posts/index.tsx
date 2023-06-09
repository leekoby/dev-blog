import PostCard from '@/components/common/PostCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface Props {}

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

/** 2023/06/09 - 게시글 리스트 - by leekoby */
const Posts: NextPage<Props> = () => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

export default Posts;
