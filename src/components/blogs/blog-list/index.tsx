import { Blog } from '@/types/blog';
import BlogItem from './BlogItem';

interface Props {
  blogs: Blog[];
}

/** 2023/06/30 - 블로그 게시글 리스트 - by leekoby */
const BlogList: React.FC<Props> = ({ blogs }): JSX.Element => {
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {blogs.map((blog) => (
        <BlogItem blog={blog} key={blog.slug} />
      ))}
    </div>
  );
};

export default BlogList;
