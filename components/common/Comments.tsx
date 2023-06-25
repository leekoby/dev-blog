import useAuth from '@/hooks/useAuth';
import { CommentResponse } from '@/utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GitHubAuthButton } from '../button';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import ConfirmModal from './ConfirmModal';
import PageNavigator from './PageNavigator';

interface Props {
  belongsTo?: string; // 소속된 게시글 Id
  fetchAll?: boolean;
}

const limit = 5;
let currentPageNo = 0;

/** 2023/06/19 - 댓글 컴포넌트 분리 - by leekoby */
const Comments: React.FC<Props> = ({ belongsTo, fetchAll }): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [reachedToEnd, setReachedToEnd] = useState(false);

  const [commentToDelete, setCommentToDelete] = useState<CommentResponse | null>(null);

  const userProfile = useAuth();

  //답글 추가 함수
  const InsertNewReplyComments = (reply: CommentResponse) => {
    if (!comments) return;
    let updatedComments = [...comments];

    const chiefCommentIndex = updatedComments.findIndex(({ id }) => id === reply.repliedTo);

    const { replies } = updatedComments[chiefCommentIndex];
    if (replies) {
      updatedComments[chiefCommentIndex].replies = [...replies, reply];
    } else {
      updatedComments[chiefCommentIndex].replies = [reply];
    }
    setComments([...updatedComments]);
  };

  //댓글 수정 렌더링 함수
  const updateEditedComment = (newComment: CommentResponse) => {
    if (!comments) return;

    let updatedComments = [...comments];
    // 편집된 댓글이 메인 댓글인 경우에만 내용을 변경
    if (newComment.chiefComment) {
      const index = updatedComments.findIndex(({ id }) => id === newComment.id);
      updatedComments[index].content = newComment.content;
    } else {
      // 그렇지 않으면 답글 업데이트
      const chiefCommentIndex = updatedComments.findIndex(({ id }) => id === newComment.repliedTo);

      let newReplies = updatedComments[chiefCommentIndex].replies;
      newReplies = newReplies?.map((comment) => {
        if (comment.id === newComment.id) comment.content = newComment.content;
        return comment;
      });

      updatedComments[chiefCommentIndex].replies = newReplies;
      setComments([...updatedComments]);
    }
  };

  //좋아요 업데이트 함수
  const updateLikedComments = (likedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    //
    if (likedComment.chiefComment) {
      newComments = newComments.map((comment) => {
        if (comment.id === likedComment.id) return likedComment;
        return comment;
      });
    }
    //
    else {
      const index = newComments.findIndex(({ id }) => id === likedComment.repliedTo);
      const newReplies = newComments[index].replies?.map((reply) => {
        if (reply.id === likedComment.id) return likedComment;
        return reply;
      });

      newComments[index].replies = newReplies;
    }

    setComments([...newComments]);
  };
  //댓글 삭제 렌더링 함수
  const updateDeletedComments = (deleteComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    // 메인 댓글 삭제
    if (deleteComment.chiefComment) {
      newComments = newComments.filter(({ id }) => id !== deleteComment.id);
    }
    // 답글 삭제
    else {
      const index = newComments.findIndex(({ id }) => id === deleteComment.repliedTo);
      const newReplies = newComments[index].replies?.filter(({ id }) => id !== deleteComment.id);

      newComments[index].replies = newReplies;
    }

    setComments([...newComments]);
  };

  // 댓글
  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post('/api/comment/', { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };

  // 댓글
  const handleUpdateSubmit = (content: string, id: string) => {
    axios
      .patch(`/api/comment/?commentId=${id}`, { content })
      .then(({ data }) => updateEditedComment(data.comment))
      .catch((err) => console.log(err));
  };

  // 답글
  const handleReplySubmit = (replyComment: { content: string; repliedTo: string }) => {
    axios
      .post('/api/comment/add-reply', replyComment)
      .then(({ data }) => InsertNewReplyComments(data.comment))
      .catch((err) => console.log(err));
  };

  //삭제 버튼 클릭
  const handOnDeleteClick = (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  };
  //삭제 모달 취소
  const handOnDeleteCancel = () => {
    setCommentToDelete(null);
    setShowConfirmModal(false);
  };
  //삭제 확인
  const handleOnDeleteConfirm = () => {
    if (!commentToDelete) return;

    axios
      .delete(`/api/comment?commentId=${commentToDelete.id}`)
      .then(({ data }) => {
        if (data.removed) updateDeletedComments(commentToDelete);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
      });
  };
  // 좋아요 버튼 핸들러
  const handleOnLikeClick = (comment: CommentResponse) => {
    axios
      .post(`/api/comment/update-like`, { commentId: comment.id })
      .then(({ data }) => updateLikedComments(data.comment))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!belongsTo) return;
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, [belongsTo]);

  //모든 댓글 가져오기
  const fetchAllComments = async (pageNo: number = currentPageNo) => {
    try {
      const { data } = await axios(`/api/comment/all?pageNo=${pageNo}&limit=${limit}`);

      if (!data.comments.length) {
        currentPageNo = currentPageNo - 1;

        return setReachedToEnd(true);
      }
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo = currentPageNo + 1;
    fetchAllComments(currentPageNo);
  };
  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo = currentPageNo - 1;
    fetchAllComments(currentPageNo);
  };

  useEffect(() => {
    if (!belongsTo && fetchAll) {
      fetchAllComments();
    }
  }, [belongsTo, fetchAll]);

  return (
    <div className='py-20 space-y-4'>
      {userProfile ? (
        <CommentForm visible={!fetchAll} onSubmit={handleNewCommentSubmit} title='댓글 작성...' />
      ) : (
        <div className='flex flex-col items-end space-y-2'>
          <h3 className='text-secondary-dark text-xl font-semibold'>
            댓글을 남기시려면 로그인하세요.
          </h3>
          <GitHubAuthButton />
        </div>
      )}

      {comments?.map((comment) => {
        const { replies } = comment;
        return (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              showControls={userProfile?.id === comment.owner.id}
              onReplySubmit={(content) => handleReplySubmit({ content, repliedTo: comment.id })}
              onUpdateSubmit={(content) => handleUpdateSubmit(content, comment.id)}
              onDeleteClick={() => {
                handOnDeleteClick(comment);
              }}
              onLikeClick={() => handleOnLikeClick(comment)}
            />

            {replies?.length ? (
              <div className='w-[93%] ml-auto'>
                <h1 className='text-secondary-dark my-3'>답글 목록</h1>
                {replies.map((reply) => {
                  return (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      showControls={userProfile?.id === reply.owner.id}
                      onReplySubmit={(content) =>
                        handleReplySubmit({ content, repliedTo: comment.id })
                      }
                      onUpdateSubmit={(content) => handleUpdateSubmit(content, reply.id)}
                      onDeleteClick={() => {
                        handOnDeleteClick(reply);
                      }}
                      onLikeClick={() => handleOnLikeClick(reply)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}

      {fetchAll ? (
        <div className='py-10 flex justify-end'>
          <PageNavigator onNextClick={handleOnNextClick} onPrevClick={handleOnPrevClick} />
        </div>
      ) : null}
      <ConfirmModal
        visible={showConfirmModal}
        title='삭제하시겠습니까?'
        subTitle='이 작업은 댓글을 삭제합니다. 메인 댓글일 경우 답글도 함께 삭제됩니다'
        onCancel={handOnDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
      />
    </div>
  );
};

export default Comments;
