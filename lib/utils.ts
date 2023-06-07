import formidable from 'formidable';
import { NextApiRequest } from 'next';

interface FormidablePromise {
  files: formidable.Files;
  body: formidable.Fields;
}

/** 2023/06/07 - 이미지 readFile  - by leekoby */
export const readFile = (req: NextApiRequest): Promise<FormidablePromise> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields });
    });
  });
};
