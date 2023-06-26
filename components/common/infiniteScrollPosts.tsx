import { PostDetail } from '@/utils/types';
import axios from 'axios';
import { ReactNode, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConfirmModal from './ConfirmModal';
import PostCard from './PostCard';

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
}

/** 2023/06/09 - 게시글 무한 스크롤 - by leekoby */
const InfiniteScrollPosts: React.FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostRemoved,
}): JSX.Element => {
  const [removing, setRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);

  //삭제 버튼 클릭
  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  //modal 닫기
  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  // 삭제 확인
  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();
    setShowConfirmModal(false);
    setRemoving(true);
    const { data } = await axios.delete(`/api/posts/${postToRemove.id}`);

    if (data.removed) onPostRemoved(postToRemove);

    setRemoving(false);
  };

  const defaultLoader = (
    <p className='p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse'>
      Loading...
    </p>
  );

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}>
        <div className='max-w-5xl mx-auto p-3'>
          <div className='grid sm:grid-cols-2  gap-4'>
            {posts &&
              posts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  controls={showControls}
                  onDeleteClick={() => handleOnDeleteClick(post)}
                  busy={post.id === postToRemove?.id && removing}
                />
              ))}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
        title='삭제하시겠습니까?'
        subTitle='해당 게시글이 영구적으로 삭제됩니다.'
        // busy
      />
    </>
  );
};

export default InfiniteScrollPosts;
