import { join } from 'path';
import fs from 'fs';

/** 2023/06/30 - 입력으로 받은 상대경로의 절대경로를 반환 - by leekoby */
const getDir = (path: string) => join(process.cwd(), path);

const BLOG_DIR = getDir('/src/content/blogs');

/** 2023/06/30 - 모든 파일들의 이름을 문자열 배열로 반환 - by leekoby */
const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

/** 2023/06/30 - BLOG_DIR 디렉토리에 위치한 모든 블로그 게시물의 파일 이름을 가져오기 / getFileNames 함수를 호출 - by leekoby */
const getBlogFileNames = () => {
  return getFileNames(BLOG_DIR);
};

/** 2023/06/30 - 파일경로에서 파일 내용을 가져와서 문자열 형태로 반환, 'utf-8' 인코딩- by leekoby */
const getItemInPath = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent;
};

/** 2023/06/30 - 인자로 주어진 파일명에 해당하는 블로그 게시물의 내용을 가져오는 함수 - by leekoby */
const getBlog = (filename: string) => {
  const blog = getItemInPath(join(BLOG_DIR, filename));
  return blog;
};
export { getBlogFileNames, getBlog };
