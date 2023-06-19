import classNames from 'classnames';
import Image from 'next/image';
import { useCallback } from 'react';

interface Props {
  avatar?: string;
  nameInitial?: string;
  lightOnly?: boolean;
}
const commonClasses =
  'relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none';

/** 2023/06/19 - 아이콘 컴포넌트 분리 - by leekoby */
const ProfileIcon: React.FC<Props> = ({ avatar, nameInitial, lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  return (
    <div className={classNames(commonClasses, getStyle())}>
      {avatar ? <Image src={avatar} layout='fill' alt='profile' /> : nameInitial}
    </div>
  );
};

export default ProfileIcon;
