import { NextApiHandler } from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

/** 2023/06/03 - posts 폴더에서 파일 데이터 읽어오기 - by leekoby */
const readPostsInfo = () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const data = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    //encoding으로 타입 지정 안하면 버퍼로 출력됨. 인코딩 타입 형식 지정
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return matter(fileContent).data;
  });
  return data;
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const data = readPostsInfo();
      return res.json({ postInfo: data });
    }
    default:
      return res.status(400).send('Not Found');
  }
};

export default handler;
