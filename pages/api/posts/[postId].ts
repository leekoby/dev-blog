import cloudinary from '@/lib/cloudinary';
import Post from '@/lib/models/Post';
import { readFile } from '@/lib/utils';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import { IncomingPost } from '@/utils/types';
import formidable from 'formidable';
import { NextApiHandler } from 'next';

export const config = {
  api: { bodyParser: false },
};

/** 2023/06/09 - 업데이트 API - by leekoby */
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'PATCH':
      return updatePost(req, res);

    case 'DELETE':
      return removePost(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/11 - 삭제 함수 - by leekoby */
const removePost: NextApiHandler = async (req, res) => {
  try {
    const postId = req.query.postId as string;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // 썸네일 삭제
    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      //기존에 있던 썸네일 파일 제거
      await cloudinary.uploader.destroy(publicId);
    }
    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/** 2023/06/09 - 업데이트 함수 - by leekoby */
const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string; // slug 에서 postId로 변경
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: '게시글이 없습니다.' });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  //태그가 문자열 형식이므로 배열로 변환
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });

  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  //thumbnail
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, {
      folder: 'dev-blogs',
    });
    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      //기존에 있던 썸네일 파일 제거
      await cloudinary.uploader.destroy(publicId);
      post.thumbnail = { url, public_id };
    }
  }
  await post.save();
  res.json({ post });
};
export default handler;
