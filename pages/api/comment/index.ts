import { isAuth } from '@/lib/utils';
import { NextApiHandler } from 'next';

/** 2023/06/09 - 댓글  API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return createNewComment(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/09 - 댓글 등록 API - by leekoby */
const createNewComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'unauthrized request' });
};

export default handler;
