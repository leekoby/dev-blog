import { trimText } from '@/utils/helper';
import { LatestComment } from '@/utils/types';
import parse from 'html-react-parser';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import ProfileIcon from '../common/ProfileIcon';

interface Props {
  comment: LatestComment;
}
/** 2023/06/22 - 관리자페이지 최근 댓글 카드 - by leekoby */
const LatestCommentListCard: React.FC<Props> = ({ comment }): JSX.Element => {
  const { owner, belongsTo, content } = comment;
  return (
    <div className='flex space-x-2'>
      <ProfileIcon nameInitial={owner.name[0]} avatar={owner.avatar} />

      <div className='flex-1'>
        <p className='font-semibold text-primary-dark dark:text-primary transition'>
          {owner.name} <span className='text-sm text-secondary-dark'>commented on</span>
        </p>

        <a
          href={'/' + belongsTo.slug}
          target='_blank'
          rel='noreferrer noopener'
          // TODO:  rel 에 'noreferrer noopener' 를 사용해야하는 이유
          // https://joshua-dev-story.blogspot.com/2020/12/html-rel-noopener-noreferrer.html
          className='text-secondary-dark hover:underline'>
          <div className='flex items-center space-x-2'>
            <BsBoxArrowUpRight size={12} />
            {trimText(belongsTo.title, 30)}
          </div>
        </a>

        <div className='text-primary-dark dark:text-primary transition'>{parse(content)}</div>
      </div>
    </div>
  );
};

export default LatestCommentListCard;
