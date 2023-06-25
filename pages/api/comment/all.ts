import Comment from '@/models/Comment';
import { formatComment, isAdmin, isAuth } from '@/lib/utils';
import { CommentResponse } from '@/utils/types';
import { NextApiHandler } from 'next';

/** 2023/06/24 - 모든 댓글 API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return readComments(req, res);

    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/24 - 모든 댓글 GET 요청 API - by leekoby */
const readComments: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: '권한이 없는 이용자' });

  const { limit = '5', pageNo = '0' } = req.query as { limit: string; pageNo: string };

  const comments = await Comment.find({})
    .limit(parseInt(limit))
    .skip(parseInt(limit) * parseInt(pageNo))
    .sort({ createdAt: 'desc' })
    .populate('owner')
    .populate({
      path: 'replies',
      populate: {
        path: 'owner',
        select: 'name avatar',
      },
    });

  if (!comments) return res.json({ comment: comments });
  const formattedComment: CommentResponse[] = comments.map((comment) => ({
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  }));
  res.json({ comments: formattedComment });
};

export default handler;
