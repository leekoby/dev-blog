import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Editor, { FinalPost } from '@/components/editor';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import AdminLayout from '@/components/layout/AdminLayout';

interface PostResponse extends FinalPost {
  id: string;
}
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/** 2023/06/08 - 게시글 수정 - by leekoby */
const Update: NextPage<Props> = ({ post }) => {
  return (
    <AdminLayout title='Update'>
      <div className='max-w-4xl mx-auto'>
        <Editor initialValue={post} onSubmit={() => {}} btnTitle='Update' />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

/** 2023/06/08 - 게시글 데이터 패칭 - by leekoby */
export const getServerSideProps: GetServerSideProps<ServerSideResponse> = async (context) => {
  const slug = context.query.slug as string;

  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) return { notFound: true };

  const { _id, meta, title, content, thumbnail, tags } = post;

  return {
    props: {
      post: {
        id: _id.toString(),
        title,
        content,
        tags: tags.join(', '),
        thumbnail: thumbnail?.url || '',
        slug,
        meta,
      },
    },
  };
};

export default Update;
