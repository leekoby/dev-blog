import Link from 'next/link';
import { Children, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  seeAllRoute: string;
}
/** 2023/06/22 - 관리자 페이지 ContentWrapper - by leekoby */
const ContentWrapper: React.FC<Props> = ({ title, children, seeAllRoute }): JSX.Element => {
  return (
    <div className='flex flex-col min-w-[300px]'>
      {/* 제목 */}
      <h3 className='text-2xl text-primary-dark dark:text-primary font-semibold py-2 transition'>
        {title}
      </h3>

      <div className='border-2 border-secondary-dark rounded p-3 flex-1'>
        <div className='space-y-5'>{children}</div>
        <div className='mt-2 text-right self-end'>
          <Link
            href={seeAllRoute}
            className='text-primary-dark dark:text-primary hover:underline transition'>
            더보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
