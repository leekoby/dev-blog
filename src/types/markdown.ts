import { Blog } from './blog';
import { Portfolio } from './portfolio';

/** 2023/06/30 - markdown 아이템 인터페이스 - by leekoby */
export interface MarkdownItem {
  title: string;
  description: string;
  content: string;
  slug: string;
  tags: string[];
  date: string;
}

/** 2023/07/01 - 마크다운 컨텐츠 타입 - by leekoby */
export interface MarkdownContent {
  blogs: Blog[];
  portfolios: Portfolio[];
}

/** 2023/07/01 - 마크다운 컨텐츠의 키 타입 - by leekoby */
export type ContentItemName = keyof MarkdownContent; // Blog | Portfolio

/** 2023/07/01 - markdown 아이템의 타입의 부분 집합을 만족하는 타입을 정의 - by leekoby */
export interface SearchContent extends Partial<MarkdownItem> {
  category: ContentItemName;
}
