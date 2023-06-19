import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { GitHubAuthButton } from '../button';
import CommentForm from './CommentForm';

interface Props {
  belongsTo: string; // 소속된 게시글 Id
}

/** 2023/06/19 - 댓글 컴포넌트 분리 - by leekoby */
const Comments: React.FC<Props> = ({ belongsTo }): JSX.Element => {
  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    const comment = await axios
      .post('/api/comment/', { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    console.log(comment);
  };

  return (
    <div className='py-20'>
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
    </div>
  );
};

export default Comments;
