import { MarkdownItem } from './markdown';

/** 2023/06/30 - MarkdownItem을 상속받은 Blog  인터페이스 - by leekoby */
export interface Blog extends MarkdownItem {
  author: string;
  authorImage: string;
  coverImage: string;
}
