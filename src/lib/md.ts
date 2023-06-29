import { join } from 'path';
import fs from 'fs';

/** 2023/06/30 - 경로 가져오는 함수 - by leekoby */
const getDir = (path: string) => join(process.cwd(), path);

const BLOG_DIR = getDir('/src/content/blogs');

/** 2023/06/30 - md 파일 이름 가져오는 함수 - by leekoby */
const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

/** 2023/06/30 - md 파일 가져오는 함수 - by leekoby */
const getItemInPath = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent;
};
export { getDir, getFileNames, getItemInPath, BLOG_DIR };
