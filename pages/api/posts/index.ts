import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { formatPosts, isAdmin, readFile, readPostsFromDb } from '@/lib/utils';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import { IncomingPost, UserProfile } from '@/utils/types';
import formidable from 'formidable';
import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const config = {
  api: { bodyParser: false },
};

/** 2023/06/08 - mongoDB handler - by leekoby */
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return readPosts(req, res);

    case 'POST':
      return createNewPost(req, res);
  }
};

/** 2023/06/08 - createNewPost handler / Joi 유효성 검사 - by leekoby */
const createNewPost: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: 'unauthorized request!' });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  //태그가 문자열 형식이므로 배열로 변환
  if (body.tags) tags = JSON.parse(body.tags as string);
  //스키마 유효성 검사 함수
  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  //게시글 업로드
  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExists = await Post.findOne({ slug });
  // 이미 존재하는 경우
  if (alreadyExists) return res.status(400).json({ error: '같은 Slug가 이미 존재합니다.' });

  const newPost = new Post({ title, content, slug, meta, tags });

  await newPost.save();

  // 썸네일 업로드
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, {
      folder: 'dev-blogs',
    });
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();

  res.json({ post: newPost });
};

/** 2023/06/09 - Db에서 게시글 불러오기 - by leekoby */
const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip } = req.query as { limit: string; pageNo: string; skip: string };

    const posts = await readPostsFromDb(parseInt(limit), parseInt(pageNo), parseInt(skip));

    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
