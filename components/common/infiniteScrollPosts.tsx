import { PostDetail } from '@/utils/types';
import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';

interface Props {
  posts: PostDetail[];
  showControls: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
}

/** 2023/06/09 - 게시글 무한 스크롤 - by leekoby */
const InfiniteScrollPosts: React.FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
}): JSX.Element => {
  const defaultLoader = (
    <p className='p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse'>
      Loading...
    </p>
  );
  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={next}
      dataLength={dataLength}
      loader={loader || defaultLoader}>
      <div className='max-w-4xl mx-auto p-3'>
        <div className='grid gird-col-3 gap-4'>
          {posts.map((post) => (
            <PostCard post={post} key={post.slug} controls={showControls} />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
