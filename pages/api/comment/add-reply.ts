import dbConnect from '@/lib/dbConnect';
import Comment from '@/lib/models/Comment';
import { isAuth } from '@/lib/utils';
import { commentValidationSchema, validateSchema } from '@/lib/validator';
import { isValidObjectId } from 'mongoose';
import { NextApiHandler } from 'next';

/** 2023/06/18 - 답글  API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return addReplyToComment(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/19 - 답글 등록 API - by leekoby */
const addReplyToComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });

  const error = validateSchema(commentValidationSchema, req.body);

  // validate를 통과하지 못할때  https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422
  if (error) return res.status(422).json({ error });

  const { repliedTo } = req.body;

  // 응답할 유효한 객체 Id가 아닌 경우
  if (!isValidObjectId(repliedTo)) return res.status(422).json({ error: '유효하지 않은 댓글 ID' });

  await dbConnect();

  const chiefComment = await Comment.findOne({
    _id: repliedTo,
    chiefComment: true,
  });

  // 메인 코멘트가 없을 경우
  if (!chiefComment) return res.status(404).json({ error: '댓글을 찾을 수 없습니다' });

  const replyComment = new Comment({
    owner: user.id,
    repliedTo,
    content: req.body.content,
  });

  // 메인 댓글에 답글이 있다면
  if (chiefComment.replies) chiefComment.replies = [...chiefComment.replies, replyComment._id];

  await chiefComment.save();
  await replyComment.save();

  res.status(201).json({ comment: replyComment });
};

export default handler;
