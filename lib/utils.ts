import { PostDetail } from '@/utils/types';
import formidable from 'formidable';
import { NextApiRequest } from 'next';
import dbConnect from './dbConnect';
import Post, { PostModelSchema } from './models/Post';

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
export const readPostsFromDb = async (limit: number, pageNo: number) => {
  if (!limit || limit > 10) throw Error('최대 10 페이지까지 가능합니다');
  const skip = limit * pageNo;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: 'desc' })
    .select('-content slug')
    .skip(skip)
    .limit(limit);

  return posts;
};

/** 2023/06/09 - Db에서 게시글 Format  - by leekoby */
export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || '',
    meta: post.meta,
    tags: post.tags,
  }));
};
