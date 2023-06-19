import classNames from 'classnames';
import Image from 'next/image';
import { useCallback } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProfileIcon from './ProfileIcon';

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

/** 2023/06/10 - 헤더 프로필 - by leekoby */
const ProfileHead: React.FC<Props> = ({ avatar, lightOnly, nameInitial }): JSX.Element => {
  return (
    <div className='flex items-center'>
      {/* 이미지/ 이름 */}
      <ProfileIcon avatar={avatar} nameInitial={nameInitial} lightOnly />
      {/* 다운 아이콘 */}
      <AiFillCaretDown
        className={lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'}
      />
    </div>
  );
};

export default ProfileHead;
