import { isAuth } from '@/lib/utils';
import Post from '@/models/Post';
import { isValidObjectId } from 'mongoose';
import { NextApiHandler } from 'next';

/** 2023/06/25 - 좋아요 상태 업데이트 handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return getPostLikeStatus(req, res);

    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/25 - 좋아요 상태 업데이트 API - by leekoby */
const getPostLikeStatus: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);

  const { postId } = req.query as { postId: string };
  if (!isValidObjectId(postId)) return res.status(422).json({ error: '유효하지 않은 게시글 ID' });

  const post = await Post.findById(postId).select('likes');
  if (!post) return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });

  const postLikes = post.likes || [];

  if (!user) {
    return res.json({
      likesCount: postLikes.length,
      likedByOwner: false,
    });
  }

  res.json({
    likesCount: postLikes.length,
    likedByOwner: postLikes.includes(user?.id as any),
  });
};

export default handler;
