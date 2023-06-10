import InfiniteScrollPosts from '@/components/common/infiniteScrollPosts';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import { PostDetail } from '@/utils/types';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/** 2023/06/10 - 홈 레이아웃 적용 - by leekoby */
const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const isAdmin = false;

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);

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
    <DefaultLayout>
      <div className='pb-20'>
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin}
        />
      </div>
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

let pageNo = 0;
const limit = 9;

/** 2023/06/10 - 게시글 Fetching  - by leekoby */
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
export default Home;
