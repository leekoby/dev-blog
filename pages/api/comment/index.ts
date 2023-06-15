import { isAuth } from '@/lib/utils';
import { commentValidationSchema, validateSchema } from '@/lib/validator';
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
  // const user = await isAuth(req, res);
  // if (!user) return res.status(403).json({ error: 'unauthrized request' });

  const error = validateSchema(commentValidationSchema, req.body);

  if (error) return res.status(422).json({ error });
  // validate를 통과하지 못할때  https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422
};

export default handler;
