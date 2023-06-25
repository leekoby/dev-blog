import DefaultLayout from '@/components/layout/DefaultLayout';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import parse from 'html-react-parser';
import Image from 'next/image';
import dateformat from 'dateformat';
import Comments from '@/components/common/Comments';
import LikeHeart from '@/components/common/LikeHeart';

import { useState, useCallback, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { signIn } from 'next-auth/react';
import axios from 'axios';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/** 2023/06/11 - 게시글 상세페이지 - by leekoby */

const SinglePost: NextPage<Props> = ({ post }) => {
  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const user = useAuth();
  const { id, title, content, tags, meta, thumbnail, slug, createdAt } = post;

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;
    if (likedByOwner && count === 1) return '이 게시글에 좋아요를 눌렀습니다';
    if (likedByOwner) return `방문자님과 ${count - 1}명이 좋아요를 눌렀습니다.`;
    if (count === 0) return '좋아요 누르기';
    return count + '명이 좋아요를 눌렀습니다.';
  }, [likes]);

  const handleOnLikeClick = async () => {
    try {
      if (!user) return await signIn('github');
      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios(`/api/posts/like-status?postId=${id}`)
      .then(({ data }) => setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className=''>
        {thumbnail ? (
          <div className='relative aspect-video'>
            <Image src={thumbnail} fill alt={title} />
          </div>
        ) : null}

        <h1 className='text-4xl font-semibold text-primary-dark dark:text-primary py-2'>{title}</h1>

        <div className='flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light'>
          {tags.map((tag, index) => (
            <span key={tag + index}>#{tag}</span>
          ))}
          <span>{dateformat(createdAt, 'paddedShortDate')}</span>
        </div>
        <div className='prose prose-lg max-w-full mx-auto dark:prose-invert'>{parse(content)}</div>

        <div className='py-10'>
          <LikeHeart
            liked={likes.likedByOwner}
            label={getLikeLabel()}
            onClick={handleOnLikeClick}
          />
        </div>

        {/* 댓글폼 */}
        <Comments belongsTo={id} />
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
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
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
      revalidate: 60, // 60초
    };
  } catch (error) {
    return { notFound: true };
  }
};
