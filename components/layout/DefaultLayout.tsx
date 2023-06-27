import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import AppHead from '../common/AppHead';
import UserNav from '../common/nav/UserNav';

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

/** 2023/06/09 - 기본 레이아웃 - by leekoby */
const DefaultLayout: React.FC<Props> = ({ children, title, desc }): JSX.Element => {
  const profile = useAuth();
  const isAdmin = profile && profile.role === 'admin';
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className='min-h-screen bg-primary dark:bg-primary-dark transition'>
        <UserNav />
        <div className='max-w-5xl mx-auto'>{children}</div>
        {/* create button */}
        {isAdmin && (
          <Link
            href={'/admin/posts/create'}
            className={`bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition`}>
            <AiOutlineFileAdd size={24} />
          </Link>
        )}
      </div>
    </>
  );
};

export default DefaultLayout;
