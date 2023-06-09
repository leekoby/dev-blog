import Image from 'next/image';

import { Blog } from '@/types/blog';

interface Props {
  blog: Blog;
}
/** 2023/06/30 - 블로그 게시글 상세 페이지 헤더 영역  - by leekoby */
const BlogHeader: React.FC<Props> = ({ blog }): JSX.Element => {
  return (
    <div className='blog-detail-header space-y-7'>
      <div className='flex flex-row justify-between mb-2'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <a href='#'>
              <span className='sr-only'>{blog.author}</span>
              <div className='relative h-10 w-10 !mb-0'>
                <Image
                  width={500}
                  height={500}
                  objectFit='cover'
                  className='rounded-full'
                  src={blog.authorImage}
                  alt=''
                />
              </div>
            </a>
          </div>
          <div className='ml-3'>
            <p className='text-sm md:text-base font-medium text-gray-900 !mb-0'>
              <a href='#' className='hover:underline'>
                {blog.author}
              </a>
            </p>
            <div className='flex space-x-1 text-sm md:text-base text-gray-500'>
              <time dateTime={blog.date}>{blog.date}</time>
            </div>
          </div>
        </div>
        <div className='flex self-end'>{/* Social Links Here */}</div>
        <div className='flex items-end space-x-4 text-sm md:text-base text-gray-500'>
          {blog.tags.length > 0 && blog.tags.map((tag) => <div key={tag}>#{tag}</div>)}
        </div>
      </div>
      <h1 className='font-bold text-5xl mb-1'>{blog.title}</h1>
      <h2 className='blog-detail-header-subtitle mb-2 text-xl text-gray-600'>{blog.description}</h2>
      <div className='h-96 bg-transparent mx-auto w-full relative'>
        <Image width={500} height={500} objectFit='cover' src={blog.coverImage} alt='' />
      </div>
    </div>
  );
};

export default BlogHeader;
