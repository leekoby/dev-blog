import { MarkdownItem } from './markdown';

/** 2023/07/01 - Portfolio 인터페이스 - by leekoby */
export interface Portfolio extends MarkdownItem {
  project: string;
  projectTime: number;
  projectImage: string;
  coverImage: string;
  highlights: string[];
}
