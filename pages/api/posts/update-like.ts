import { isAuth } from '@/lib/utils';
import Post from '@/models/Post';
import { isValidObjectId } from 'mongoose';
import { NextApiHandler } from 'next';

/** 2023/06/25 - 좋아요 업데이트 handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return updatePostLike(req, res);

    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/25 - 좋아요 업데이트 API - by leekoby */
const updatePostLike: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(401).json({ error: '권한이 없습니다' });

  const { postId } = req.query as { postId: string };
  if (!isValidObjectId(postId)) return res.status(422).json({ error: '유효하지 않은 게시글 ID' });

  const post = await Post.findById(postId).select('likes');
  if (!post) return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });

  const oldLikes = post.likes || [];
  const likedBy = user.id as any;

  // unlike
  if (oldLikes.includes(likedBy)) {
    post.likes = oldLikes.filter((like) => like.toString() !== likedBy.toString());
  }

  //like post
  else {
    post.likes = [...oldLikes, likedBy];
  }

  await post.save();
  res.status(201).json({
    newLikes: post.likes.length,
  });
};

export default handler;
