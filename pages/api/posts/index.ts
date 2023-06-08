import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { readFile } from '@/lib/utils';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import formidable from 'formidable';
import Joi from 'joi';
import { NextApiHandler } from 'next';

export const config = {
  api: { bodyParser: false },
};

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
const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile(req);

  console.log(body);

  let tags = [];

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

export default handler;
