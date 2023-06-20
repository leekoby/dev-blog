import useAuth from '@/hooks/useAuth';
import { CommentResponse } from '@/utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GitHubAuthButton } from '../button';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

interface Props {
  belongsTo: string; // 소속된 게시글 Id
}

/** 2023/06/19 - 댓글 컴포넌트 분리 - by leekoby */
const Comments: React.FC<Props> = ({ belongsTo }): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();
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

  // 댓글
  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post('/api/comment/', { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };

  // 답글
  const handleReplySubmit = (replyComment: { content: string; repliedTo: string }) => {
    axios
      .post('/api/comment/add-reply', replyComment)
      .then(({ data }) => InsertNewReplyComments(data.comment))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='py-20 space-y-4'>
      {userProfile ? (
        <CommentForm onSubmit={handleNewCommentSubmit} title='댓글 작성...' />
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
              onUpdateSubmit={(content) => console.log('update', content)}
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
                      onUpdateSubmit={(content) => console.log('update', content)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
