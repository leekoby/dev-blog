import dbConnect from '@/lib/dbConnect';
import Comment from '@/lib/models/Comment';
import { isAuth } from '@/lib/utils';
import { isValidObjectId, Types } from 'mongoose';
import { NextApiHandler } from 'next';

/** 2023/06/18 - 좋아요  API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return updateLike(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/19 - 좋아요 API - by leekoby */
const updateLike: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });

  const { commentId } = req.body;

  // 응답할 유효한 객체 Id가 아닌 경우
  if (!isValidObjectId(commentId)) return res.status(422).json({ error: '유효하지 않은 댓글 ID' });

  await dbConnect();

  const comment = await Comment.findById(commentId);

  // 코멘트가 없을 경우
  if (!comment) return res.status(404).json({ error: '댓글을 찾을 수 없습니다' });

  // 좋아요 업데이트
  const oldLikes = comment.likes || [];
  const likedBy = user.id as any; // likedBy의 타입 문제 해결을 위해 사용

  // 좋아요 & 좋아요 취소

  //취소
  if (oldLikes.includes(likedBy)) {
    comment.likes = oldLikes.filter((like) => like.toString() !== likedBy.toString());
  }
  // 좋아요
  else {
    comment.likes = [...oldLikes, likedBy];
  }

  await comment.save();
  res.status(201).json({ comment });
};

export default handler;
