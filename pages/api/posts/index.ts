import dbConnect from '@/lib/dbConnect';
import { NextApiHandler } from 'next';

/** 2023/06/08 - mongoDB handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      await dbConnect();
      res.json({ ok: true });
    }
  }
};

export default handler;
