import formidable from 'formidable';
import { NextApiRequest } from 'next';

// [postId] 타입에러 해결 제네릭 사용
interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

/** 2023/06/07 - 이미지 readFile  - by leekoby */
export const readFile = <T extends object>(req: NextApiRequest): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields as T });
    });
  });
};
