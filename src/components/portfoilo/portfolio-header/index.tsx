import Image from 'next/image';

import { Portfolio } from '@/types/portfolio';

interface Props {
  portfolio: Portfolio;
}
/** 2023/07/01 - 포트폴리오 게시글 상세 페이지 헤더 영역  - by leekoby */
const PortfolioHeader: React.FC<Props> = ({ portfolio }): JSX.Element => {
  return (
    <div className='portfolio-detail-header space-y-10'>
      <h1 className='font-bold text-5xl mb-1'>{portfolio.title}</h1>
      <h2 className='blog-detail-header-subtitle mb-2 text-2xl text-gray-700'>
        {portfolio.description}
      </h2>
      <div className='h-96 bg-transparent mx-auto w-full relative'>
        <Image
          width={500}
          height={500}
          objectFit='cover'
          src={portfolio.coverImage}
          alt={portfolio.description}
        />
      </div>
    </div>
  );
};

export default PortfolioHeader;
