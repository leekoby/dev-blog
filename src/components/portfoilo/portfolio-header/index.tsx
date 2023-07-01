import Image from 'next/image';

import { Portfolio } from '@/types/portfolio';

interface Props {
  portfolio: Portfolio;
}
/** 2023/07/01 - 포트폴리오 게시글 상세 페이지 헤더 영역  - by leekoby */
const PortfolioHeader: React.FC<Props> = ({ portfolio }): JSX.Element => {
  return (
    <div className='portfolio-detail-header'>
      <div className='flex flex-row justify-between mb-2'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'></div>
          <div className='ml-3'>
            <div className='flex space-x-1 text-sm text-gray-500'></div>
          </div>
        </div>
        <div className='flex self-end'>{/* Social Links Here */}</div>
      </div>
      <h1 className='font-bold text-4xl mb-1'>{portfolio.title}</h1>
      <h2 className='blog-detail-header-subtitle mb-2 text-xl text-gray-600'>
        {portfolio.description}
      </h2>
      <div className='h-96 bg-black mx-auto w-full relative'>
        <Image priority layout='fill' objectFit='cover' src={portfolio.coverImage} alt='' />
      </div>
    </div>
  );
};

export default PortfolioHeader;
