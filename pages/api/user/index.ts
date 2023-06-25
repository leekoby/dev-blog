import User from '@/models/User';
import { isAdmin } from '@/lib/utils';
import { LatestUsersProfile } from '@/utils/types';
import { NextApiHandler } from 'next';

/** 2023/06/23 - 최근 유저 API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return getlatestUsers(req, res);

    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/23 - 최근 유저 GET 요청 API - by leekoby */
const getlatestUsers: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);

  if (!admin) return res.status(403).json({ error: '유효하지 않은 요청' });

  const { pageNo = '0', limit = '5' } = req.query as { pageNo: string; limit: string };
  const results = await User.find({ role: 'user' })
    .sort({ createdAt: 'desc' })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .select('name email avatar provider');

  const users: LatestUsersProfile[] = results.map(({ _id, name, email, avatar, provider }) => ({
    id: _id.toString(),
    name,
    avatar,
    provider,
    email,
  }));
  res.json({ users });
};

export default handler;
