import ProfileIcon from './ProfileIcon';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { BsFillReplyAllFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { ReactNode, useState } from 'react';
import CommentForm from './CommentForm';

interface CommentOwnersProfile {
  name: string;
  avatar?: string;
}

interface Props {
  profile: CommentOwnersProfile;
  date: string;
  content: string;
}

/** 2023/06/19 - 댓글 카드 - by leekoby */
const CommentCard: React.FC<Props> = ({ profile, date, content }): JSX.Element => {
  const { name, avatar } = profile;
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState(''); // 댓글 수정 초기값 설정

  // 답글 작성 폼 보이기
  const displayReplyForm = () => {
    setInitialState('');
    setShowForm(true);
  };
  // 답글 작성 폼 숨기기
  const hideReplyForm = () => {
    setShowForm(false);
  };

  // 답글 작성 핸들러
  const handleOnReplyClick = () => {
    displayReplyForm();
  };
  // 답글 수정 핸들러
  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };

  const handleCommentSubmit = () => {};

  return (
    <div className='flex space-x-3'>
      {/* 아이콘 */}
      <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />
      {/* 이름 / 내용 /  */}
      <div className='flex-1 '>
        {/* 이름 */}
        <h1 className='text-lg text-primary-dark dark:text-primary font-semibold'>{name}</h1>

        {/* 게시일 */}
        <span className='text-sm text-secondary-dark'>{dateFormat(date, 'paddedShortDate')}</span>

        {/* 내용 */}
        <div className='text-primary-dark dark:text-primary'>{parse(content)}</div>

        {/* 버튼 영역 */}
        <div className='flex space-x-4'>
          <Button onClick={handleOnReplyClick}>
            <BsFillReplyAllFill />
            <span>답글</span>
          </Button>
          <Button onClick={handleOnEditClick}>
            <BsPencilSquare />
            <span>수정</span>
          </Button>
          <Button>
            <BsFillTrashFill />
            <span>삭제</span>
          </Button>
        </div>
        {showForm && (
          <div className='mt-3'>
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

interface ButtonProps {
  children: ReactNode;
  onClick?(): void;
}
/** 2023/06/19 - 버튼 재활용 타입 - by leekoby */
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center text-primary-dark dark:text-primary space-x-2'>
      {children}
    </button>
  );
};
