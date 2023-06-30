/** 2023/06/30 - markdown 아이템 인터페이스 - by leekoby */
export interface MarkdownItem {
  title: string;
  description: string;
  content: string;
  slug: string;
  date: string;
}

/** 2023/07/01 - markdown 아이템의 타입의 부분 집합을 만족하는 타입을 정의 - by leekoby */
export interface SearchContent extends Partial<MarkdownItem> {
  category: string;
}
