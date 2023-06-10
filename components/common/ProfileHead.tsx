import classNames from 'classnames';
import Image from 'next/image';
import { useCallback } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitail?: string;
}

const commonClasses =
  'relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none';

/** 2023/06/10 - 헤더 프로필 - by leekoby */
const ProfileHead: React.FC<Props> = ({ avatar, lightOnly, nameInitail }): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  return (
    <div className='flex items-center'>
      {/* 이미지/ 이름 */}
      <div className={classNames(commonClasses, getStyle())}>
        {avatar ? <Image src={avatar} fill alt={'profile'} /> : nameInitail}
      </div>
      {/* 다운 아이콘 */}
      <AiFillCaretDown
        className={lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'}
      />
    </div>
  );
};

export default ProfileHead;
