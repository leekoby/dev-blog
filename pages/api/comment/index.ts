import dbConnect from '@/lib/dbConnect';
import Comment from '@/lib/models/Comment';
import Post from '@/lib/models/Post';
import { formatComment, isAuth } from '@/lib/utils';
import { commentValidationSchema, validateSchema } from '@/lib/validator';
import { isValidObjectId } from 'mongoose';
import { NextApiHandler } from 'next';

/** 2023/06/09 - 댓글  API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return createNewComment(req, res);
    case 'DELETE':
      return removeComment(req, res);
    case 'PATCH':
      return updateComment(req, res);
    case 'GET':
      return readComments(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/19 - 댓글 읽기 API - by leekoby */
const readComments: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);

  const { belongsTo } = req.query;

  if (!belongsTo || !isValidObjectId(belongsTo))
    return res.status(422).json({ error: '유효하지 않은 요청' });

  const comment = await Comment.findOne({ belongsTo })
    .populate({
      path: 'owner',
      select: 'name avatar',
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'owner',
        select: 'name avatar',
      },
    })
    .select('createdAt likes content repliedTo');

  if (!comment) return res.json({ comment });

  const formattedComment = {
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  };

  res.json({ comment: formattedComment });
};

/** 2023/06/09 - 댓글 등록 API - by leekoby */
const createNewComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });

  const error = validateSchema(commentValidationSchema, req.body);

  if (error) return res.status(422).json({ error });
  // validate를 통과하지 못할때  https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422

  // 댓글 생성
  await dbConnect();

  const { belongsTo, content } = req.body;

  const post = await Post.findById(belongsTo);

  if (!post) return res.status(401).json({ error: '유효하지 않은 POST' });

  const comment = new Comment({
    content,
    belongsTo,
    owner: user.id,
    chiefComment: true,
  });

  await comment.save();
  const commentWithOwner = await comment.populate('owner');
  res.status(201).json({ comment: formatComment(commentWithOwner, user) });
};

/** 2023/06/19 - 댓글 삭제 API - by leekoby */
const removeComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });

  // /api/comment?commentId=commentid

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: '유효하지 않은 요청' });

  const comment = await Comment.findOne({ _id: commentId, owner: user.id });

  if (!comment) return res.status(404).json({ error: '댓글이 존재하지 않습니다' });

  // 메인 코멘트를 삭제하는 경우 관련 답글도 제거
  if (comment.chiefComment) await Comment.deleteMany({ repliedTo: commentId });
  else {
    // 답글인 경우 메인 댓글에서 제거
    const chiefComment = await Comment.findById(comment.repliedTo);
    if (chiefComment?.replies?.includes(commentId as any)) {
      chiefComment.replies = chiefComment.replies.filter((cId) => cId.toString() === commentId);

      await chiefComment.save();
    }
  }

  // 댓글 제거
  await Comment.findByIdAndDelete(commentId);
  res.json({ removed: true });
};

/** 2023/06/19 - 댓글 수정 API - by leekoby */
const updateComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: '유효하지 않은 요청' });

  const comment = await Comment.findOne({ _id: commentId, owner: user.id });

  if (!comment) return res.status(404).json({ error: '댓글이 존재하지 않습니다' });

  comment.content = req.body.content;
  await comment.save();
  res.json(comment);
};
export default handler;
