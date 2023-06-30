import { join } from 'path';
import { Blog } from '@/types/blog';
import { getAllItems, getDir, getFileNames, getItemInPath, markdwonToHtml } from './md';

const BLOG_DIR = getDir('/src/content/blogs');

/** 2023/06/30 - BLOG_DIR 디렉토리에 위치한 모든 블로그 게시물의 파일 이름을 가져오기 / getFileNames 함수를 호출 - by leekoby */
const getBlogFileNames = () => {
  return getFileNames(BLOG_DIR);
};

/** 2023/06/30 - getBlogFileNames을 호출해서 모든 게시물의 이름을 가져온 후 slug만 배열 가공해서 리턴하는 함수 - by leekoby */
const getBlogsSlugs = () => {
  return getBlogFileNames().map((fileName) => fileName.replace(/.md$/, ''));
};

/** 2023/06/30 - slug를 통해 블로그 글을 가져오도록 하는 함수 - by leekoby */
const getBlogBySlug = (slug: string) => {
  const fileName = slug + '.md';
  return getBlog(fileName);
};

/** 2023/06/30 - 인자로 주어진 파일명에 해당하는 블로그 게시물의 내용을 가져오는 함수 - by leekoby */
const getBlog = (filename: string): Blog => {
  const blog = getItemInPath(join(BLOG_DIR, filename)) as Blog;
  blog.slug = filename.replace(/.md$/, '');
  return blog;
};
/** 2023/06/30 - html을 markdown으로 변환해주는 함수 - by leekoby */
const getBlogBySlugWithMarkdown = async (slug: string): Promise<Blog> => {
  const blog = getBlogBySlug(slug);
  blog.content = await markdwonToHtml(blog.content);
  return blog;
};

/** 2023/06/30 - 모든 블로그 게시물들을 Blog[] 형식의 배열로 반환 - by leekoby */
const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  return getAllItems(names, getBlog) as Blog[];
};

export {
  getBlogFileNames,
  getBlog,
  getBlogs,
  getBlogsSlugs,
  getBlogBySlug,
  getBlogBySlugWithMarkdown,
};
