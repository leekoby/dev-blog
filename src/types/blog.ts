import { MarkDownItem } from './markdown';

/** 2023/06/30 - MarkDownItem을 상속받은 Blog  인터페이스 - by leekoby */
export interface Blog extends MarkDownItem {
  author: string;
  authorImage: string;
  coverImage: string;
}
