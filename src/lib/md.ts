import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Blog } from '@/types/blog';
import { ContentItemName, MarkdownContent, MarkdownItem, SearchContent } from '@/types/markdown';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

/** 2023/06/30 - 입력으로 받은 상대경로의 절대경로를 반환 - by leekoby */
const getDir = (path: string) => join(process.cwd(), path);

/** 2023/06/30 - 모든 파일들의 이름을 문자열 배열로 반환 - by leekoby */
const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

/** 2023/06/30 - 파일경로에서 파일 내용을 가져와서 문자열 형태로 반환, 'utf-8' 인코딩- by leekoby */
const getItemInPath = (filePath: string): MarkdownItem => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { ...data, content } as MarkdownItem;
};

/** 2023/06/30 -모든 파일 이름에 대해 해당하는 블로그 게시물 내용들을 가져오기  - by leekoby */
const getAllItems = (fileNames: string[], get: (name: string) => MarkdownItem) => {
  const items = fileNames.map((name) => get(name));
  return items;
};

/** 2023/06/30 -markdown문법 html로 변경해주는 함수  - by leekoby */
const markdwonToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

/** 2023/07/01 - 검색에 필요한 데이터 JSON에 저장하는 함수 - by leekoby */
const saveSearchData = (content: MarkdownContent) => {
  const searchFile = getDir('/src/content/search/index.json');
  const searchItemList: SearchContent[] = [];

  Object.keys(content).forEach((dataSource) => {
    const contentName = dataSource as ContentItemName;

    content[contentName].forEach((data) => {
      const searchItem: SearchContent = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        category: contentName,
      };

      searchItemList.push(searchItem);
    });
  });

  fs.writeFileSync(searchFile, JSON.stringify(searchItemList, null, 2)); // (함수, 대체 함수, 들여쓰기)
};

export { getDir, getFileNames, getItemInPath, getAllItems, markdwonToHtml, saveSearchData };
