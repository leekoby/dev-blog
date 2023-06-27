import dbConnect from '@/lib/dbConnect';
import { formatPosts, isAdmin } from '@/lib/utils';
import Post from '@/models/Post';
import { NextApiHandler } from 'next';

/** 2023/06/26 - 검색  handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(404).send('Not Found');
  // const admin = await isAdmin(req, res);
  // if (!admin) return res.status(403).json({ error: '유효하지 않은 접근' });

  const title = req.query.title as string;

  if (!title.trim()) return res.status(400).json({ error: '유효하지 않은 검색어' });

  await dbConnect();
  // regex를 사용한 이유: 영문 제목일 경우 대소문자 구분
  const posts = await Post.find({ title: { $regex: title, $options: 'i' } });

  res.json({ results: formatPosts(posts) });
};

export default handler;
