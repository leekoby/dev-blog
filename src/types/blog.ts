import { MarkDownItem } from './markdown';

export interface Blog extends MarkDownItem {
  author: string;
  authorImage: string;
  coverImage: string;
}
