import BlogItem from './BlogItem';

interface Props {}

const blogs = [
  {
    slug: 'test1',
    title: 'test1',
    description: 'test1',
    date: '2023-06-30',
    coverImage: 'https://thrangra.sirv.com/Ethereum_blue_light-small.jpg',
  },
];
/** 2023/06/30 - 블로그 게시글 리스트 - by leekoby */
const BlogList: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {blogs.map((blog) => (
        <BlogItem blog={blog} key={blog.slug} />
      ))}
    </div>
  );
};

export default BlogList;
