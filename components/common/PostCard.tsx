import { PostDetail } from '@/utils/types';
import Image from 'next/image';
import dateformat from 'dateformat';
import Link from 'next/link';
import { trimText } from '@/utils/helper';

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

/** 2023/06/09 - 게시글 카드 - by leekoby */
const PostCard: React.FC<Props> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { title, slug, meta, tags, thumbnail, createdAt } = post;
  return (
    <div className='rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark flex flex-col h-full transition'>
      {/* 썸네일 */}
      <Link href={'/' + slug}>
        <div className='aspect-video relative'>
          {!thumbnail ? (
            <div className='w-full h-full flex items-center justify-center to-secondary-dark opacity-50 font-semibold'>
              No Image
            </div>
          ) : (
            <Image src={thumbnail} fill alt='thumbnail' />
          )}
        </div>
      </Link>
      {/* 게시글 정보 */}
      <div className='p-2 flex-1 flex flex-col'>
        <Link href={'/' + slug}>
          <div className='flex items-center justify-between text-sm text-primary-dark dark:text-primary'>
            <div className='flex items-center space-x-1'>
              {tags.map((tag, index) => (
                <span key={tag + index}>#{tag}</span>
              ))}
            </div>
            <span>{dateformat(createdAt, 'paddedShortDate')}</span>
          </div>
          {/* 제목 */}
          <h1 className='font-semibold text-primary-dark dark:text-primary'>
            {trimText(title, 50)}
          </h1>
          {/* meta */}
          <p className='text-secondary-dark'>{trimText(meta, 70)}</p>
        </Link>
        {controls && (
          <div className='flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary'>
            {busy ? (
              <span className='animate-pulse'>Removing...</span>
            ) : (
              <>
                <Link href={'/admin/posts/update/' + slug} className='hover:underline'>
                  Edit
                </Link>
                <button onClick={onDeleteClick} className='hover:underline'>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
