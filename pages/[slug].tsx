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
import User from '@/models/User';
import AuthorInfo from '@/components/common/AuthorInfo';
import Share from '@/components/common/Share';
import Link from 'next/link';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const host = 'https://kobyblog.vercel.app';

/** 2023/06/11 - 게시글 상세페이지 - by leekoby */

const SinglePost: NextPage<Props> = ({ post }) => {
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const user = useAuth();
  const { id, title, content, tags, meta, thumbnail, slug, createdAt, author, relatedPosts } = post;

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;
    if (likedByOwner && count === 1) return '이 게시글에 좋아요를 눌렀습니다';
    if (likedByOwner) return `방문자님과 ${count - 1}명이 좋아요를 눌렀습니다.`;
    if (count === 0) return '좋아요 누르기';
    return count + '명이 좋아요를 눌렀습니다.';
  }, [likes]);

  const handleOnLikeClick = async () => {
    setLiking(true);
    try {
      if (!user) return await signIn('github');
      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (error) {
      console.log(error);
    }
    setLiking(false);
  };

  useEffect(() => {
    axios(`/api/posts/like-status?postId=${id}`)
      .then(({ data }) => setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className='lg:px-0 px-3 space-y-5'>
        {thumbnail ? (
          <div className='relative aspect-video'>
            <Image src={thumbnail} fill alt={title} />
          </div>
        ) : null}
        <hr className='mt-2' />

        <h1 className='text-6xl font-semibold text-primary-dark dark:text-primary py-2'>{title}</h1>

        <div className='flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light'>
          <div className='space-x-3'>
            {tags.map((tag, index) => (
              <span key={tag + index}>#{tag}</span>
            ))}
          </div>
          <span>{dateformat(createdAt, 'paddedShortDate')}</span>
        </div>
        <hr className='mt-2' />

        {/* 공유하기 */}
        <div className='py-2 transition dark:bg-primary-dark bg-primary sticky top-0 z-50'>
          <Share url={host + '/' + slug} />
        </div>
        <hr className='mt-2' />

        <div className='prose prose-lg max-w-full mx-auto dark:prose-invert'>{parse(content)}</div>
        <hr className='mt-2' />

        <div className='py-5'>
          <LikeHeart
            liked={likes.likedByOwner}
            label={getLikeLabel()}
            onClick={!liking ? handleOnLikeClick : undefined}
            busy={liking}
          />
        </div>

        <div className=''>
          <AuthorInfo profile={JSON.parse(author)} />
        </div>

        {/* 관련글 */}
        <hr className='mt-2' />

        <div className='pt-5'>
          <h3 className='text-xl font-semibold bg-secondary-dark text-primary p-2 mb-4'>
            관련 게시글
          </h3>
          <div className='flex flex-col space-y-4'>
            {relatedPosts.map((post) => {
              return (
                <Link
                  key={post.id}
                  href={post.slug}
                  className='font-semibold text-primary-dark dark:text-primary hover:underline'>
                  {post.title}
                </Link>
              );
            })}
          </div>
        </div>
        <hr className='mt-2' />

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
    author: string;
    relatedPosts: {
      id: string;
      title: string;
      slug: string;
    }[];
  };
}
/** 2023/06/11 - 게시글 상세페이지 StaticProps - by leekoby */
export const getStaticProps: GetStaticProps<StaticPropsResponse, { slug: string }> = async ({
  params,
}) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug }).populate('author');

    if (!post) return { notFound: true };

    // tags를 기반으로 관련글 가져오기 in=includes ne=not exist
    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: 'desc' })
      .limit(5)
      .select('slug title');

    const relatedPosts = posts.map((p) => {
      return {
        id: p._id.toString(),
        title: p.title,
        slug: p.slug,
      };
    });

    const { _id, title, content, meta, slug, tags, thumbnail, createdAt, author } = post;

    const admin = await User.findOne({ role: 'admin' });

    const authorInfo = (author || admin) as any;

    const postAuthor = {
      id: authorInfo._id,
      name: authorInfo.name,
      avatar: authorInfo.avatar,
      message: `작성자 ${authorInfo.name}. 프론트엔드 취업준비생, 어제보다 오늘 더 나은 개발자가 되자.`,
      // 추후 작성자에 대한 추가 설명을 적어도 될거같음.
    };

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
          author: JSON.stringify(postAuthor),
          relatedPosts,
        },
      },
      revalidate: 60, // 60초
    };
  } catch (error) {
    return { notFound: true };
  }
};
