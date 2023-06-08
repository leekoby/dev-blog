import dbConnect from '@/lib/dbConnect';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import Joi from 'joi';
import { NextApiHandler } from 'next';

/** 2023/06/08 - mongoDB handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      await dbConnect();
      res.json({ ok: true });
    }
    case 'POST':
      return createNewPost(req, res);
  }
};
/** 2023/06/08 - createNewPost handler / Joi 유효성 검사 - by leekoby */
const createNewPost: NextApiHandler = (req, res) => {
  const { body } = req;

  //스키마 유효성 검사 함수
  const error = validateSchema(postValidationSchema, body);
  if (error) return res.status(400).json({ error });
  res.json({ ok: true });
};

export default handler;
