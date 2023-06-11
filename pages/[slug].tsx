import DefaultLayout from '@/components/layout/DefaultLayout';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import parse from 'html-react-parser';
import Image from 'next/image';
import dateformat from 'dateformat';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/** 2023/06/11 - 게시글 상세페이지 - by leekoby */

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, thumbnail, slug, createdAt } = post;
  return (
    <DefaultLayout title={title} desc={meta}>
      <div className='pb-20'>
        {thumbnail ? (
          <div className='relative aspect-video'>
            <Image src={thumbnail} fill alt={title} />
          </div>
        ) : null}

        <h1 className='text-6xl font-semibold text-primary-dark dark:text-primary py-2'>{title}</h1>

        <div className='flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light'>
          {tags.map((tag, index) => (
            <span key={tag + index}>{tag}</span>
          ))}
          <span>{dateformat(createdAt, 'paddedShortDate')}</span>
        </div>
        <div className='prose prose-lg max-w-full mx-auto dark:prose-invert'>{parse(content)}</div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

/** 2023/06/11 - 게시글 상세페이지 경로 - by leekoby */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select('slug');
    const paths = posts.map(({ slug }) => {
      params: slug;
    });
    return {
      paths: [{ params: { slug: '' } }],
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: '/' } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}
/** 2023/06/11 - 게시글 상세페이지 StaticProps - by leekoby */
export const getStaticProps: GetStaticProps<StaticPropsResponse, { slug: string }> = async ({
  params,
}) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };

    const { _id, title, content, meta, slug, tags, thumbnail, createdAt } = post;
    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || '',
          createdAt: createdAt.toString(),
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
