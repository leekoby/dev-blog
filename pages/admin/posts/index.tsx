import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import PostCard from '@/components/common/PostCard';
import { PostDetail } from '@/utils/types';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import InfiniteScrollPosts from '@/components/common/infiniteScrollPosts';
import axios from 'axios';
import ConfirmModal from '@/components/common/ConfirmModal';
import { filterPosts } from '@/utils/helper';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;
/** 2023/06/09 - 게시글 리스트 - by leekoby */
const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(`/api/posts?limit=${limit}&skip=${postsToRender.length}`);

      if (data.post.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return (
    <>
      <AdminLayout>
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls
          onPostRemoved={(post) => setPostsToRender(filterPosts(postsToRender, post))}
        />
      </AdminLayout>
    </>
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
    console.log(error);
    return { notFound: true };
  }
};

export default Posts;
