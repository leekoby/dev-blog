import { CommentResponse, PostDetail, UserProfile } from '@/utils/types';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from './dbConnect';
import Post, { PostModelSchema } from '../models/Post';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IComment } from '../models/Comment';

// [postId] 타입에러 해결 제네릭 사용
interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

/** 2023/06/07 - 이미지 readFile  - by leekoby */
export const readFile = <T extends object>(req: NextApiRequest): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields as T });
    });
  });
};

/** 2023/06/09 - Db에서 게시글 불러올 범위 함수 // 무한스크롤(예정)  - by leekoby */
export const readPostsFromDb = async (limit: number, pageNo: number, skip?: number) => {
  if (!limit || limit > 10) throw Error('최대 10 페이지까지 가능합니다');
  const finalSkip = skip || limit * pageNo;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: 'desc' })
    .select('-content')
    .skip(finalSkip)
    .limit(limit);

  return posts;
};

/** 2023/06/09 - Db에서 게시글 Format  - by leekoby */
export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || '',
    meta: post.meta,
    tags: post.tags,
  }));
};

/** 2023/06/11 - 관리자 확인 - by leekoby */
export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as UserProfile;
  return user && user.role === 'admin';
};

/** 2023/06/11 - 로그인 확인 - by leekoby */
export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) return user as UserProfile;
};

/** 2023/06/19 - 댓글 형식 - by leekoby */
export const formatComment = (comment: IComment, user?: UserProfile): CommentResponse => {
  const owner = comment.owner as any;
  return {
    id: comment._id.toString(),
    content: comment.content,
    likes: comment.likes.length,
    chiefComment: comment?.chiefComment || false,
    createdAt: comment.createdAt?.toString(),
    owner: { id: owner._id, name: owner.name, avatar: owner.avatar },
    repliedTo: comment?.repliedTo?.toString(),
    likedByOwner: user ? getLikedByOwner(comment.likes, user) : false,
  };
};

/** 2023/06/19 - 좋아요 여부 확인 함수  - by leekoby */
const getLikedByOwner = (likes: any[], user: UserProfile) => likes.includes(user.id);
