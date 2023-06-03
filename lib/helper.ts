import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostApiResponse } from '@/utils/types';

/** 2023/06/03 - posts 폴더에서 파일 데이터 읽어오기 - by leekoby */
export const readPostsInfo = (): PostApiResponse => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const data = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    //encoding으로 타입 지정 안하면 버퍼로 출력됨. 인코딩 타입 형식 지정
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return matter(fileContent).data;
  });
  return data as PostApiResponse;
};
