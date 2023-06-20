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

  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post('/api/comment/', { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
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

      {comments?.map(({ id, owner, createdAt, content }) => {
        return (
          <div key={id}>
            <CommentCard
              profile={owner}
              date={createdAt}
              content={content}
              onReplySubmit={(content) => console.log('reply', content)}
              onUpdateSubmit={(content) => console.log('update', content)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
