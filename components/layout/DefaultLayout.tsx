import { ReactNode } from 'react';
import AppHead from '../common/AppHead';
import UserNav from '../common/nav/UserNav';

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

/** 2023/06/09 - 기본 레이아웃 - by leekoby */
const DefaultLayout: React.FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className='min-h-screen bg-primary dark:bg-primary-dark transition'>
        <UserNav />
      </div>
    </>
  );
};

export default DefaultLayout;
