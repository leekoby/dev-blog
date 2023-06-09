import Post from '@/lib/models/Post';
import { readFile } from '@/lib/utils';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import { NextApiHandler } from 'next';

export const config = {
  api: { bodyParser: false },
};

/** 2023/06/09 - 업데이트 API - by leekoby */
export const handler: NextApiHandler = (req, resizeBy) => {
  const { method } = req;
  switch (method) {
    case 'PATCH':
      return updatePost(req, res);
    default:
      res.status(404).send('Not found');
  }
};

/** 2023/06/09 - 업데이트 함수 - by leekoby */
const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string; // slug 에서 postId로 변경
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: '게시글이 없습니다.' });
  const { files, body } = await readFile(req);

  let tags = [];
  //태그가 문자열 형식이므로 배열로 변환
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(404).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  await post.save();
  res.json({ post });
};
