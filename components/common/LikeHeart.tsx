import { BiLoader } from 'react-icons/bi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}
/** 2023/06/22 - 좋아요 버튼 컴포넌트 - by leekoby */
const LikeHeart: React.FC<Props> = ({ liked = false, label, busy, onClick }): JSX.Element => {
  const likeIcon = liked ? <BsHeartFill color='#4790FD' /> : <BsHeart />;
  return (
    <button
      type='button'
      className='text-primary-dark dark:text-primary flex items-center space-x-2 outline-none'
      onClick={onClick}>
      {busy ? <BiLoader className='animate-spin' /> : likeIcon}

      <span className='hover:underline'>{label}</span>
    </button>
  );
};

export default LikeHeart;
