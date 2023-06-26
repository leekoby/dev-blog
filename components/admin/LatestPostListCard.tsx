import { trimText } from '@/utils/helper';
import Link from 'next/link';

interface Props {
  title: string;
  meta: string;
  slug: string;
  onDeleteClick?(): void;
}
/** 2023/06/22 - 관리자페이지 최근 게시글 카드 - by leekoby */
const LatestPostListCard: React.FC<Props> = ({ title, slug, meta, onDeleteClick }): JSX.Element => {
  return (
    <div>
      <a href={'/' + slug}>
        <h1 className='font-semibold text-lg text-primary-dark dark:text-primary transition'>
          {trimText(title, 50)}
        </h1>
        <p className='text-sm text-secondary-dark'>{trimText(meta, 100)}</p>
      </a>

      <div className='flex items-center justify-end space-x-3'>
        <Link
          href={'/admin/posts/update/' + slug}
          className='text-primary-dark dark:text-primary transition hover:underline'>
          수정
        </Link>

        <button
          onClick={onDeleteClick}
          className='text-primary-dark dark:text-primary transition hover:underline'>
          삭제
        </button>
      </div>

      <hr className='mt-2' />
    </div>
  );
};

export default LatestPostListCard;
