import { Portfolio } from '@/types/portfolio';
import { shortify } from '@/utils/shortify';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  portfolio: Portfolio;
}
/** 2023/06/30 - 포트폴리오  아이템 - by leekoby */
const PortfolioItem: React.FC<Props> = ({ portfolio }): JSX.Element => {
  return (
    <div key={portfolio.slug} className='group relative'>
      <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
        <Image
          layout='fill'
          src={portfolio.coverImage}
          alt={''}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <h3 className='mt-6 text-sm text-gray-500'>
        <Link href={`/portfolios/${portfolio.slug}`}>
          <>
            <span className='absolute inset-0' />
            {shortify(portfolio.title)}
          </>
        </Link>
      </h3>
      <p className='text-base font-semibold text-gray-900'>{shortify(portfolio.description)}</p>
      <Link href={`/portfolios/${portfolio.slug}`} className='text-sm font-bold text-gray-700'>
        Read More
      </Link>
    </div>
  );
};

export default PortfolioItem;
