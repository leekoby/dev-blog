/** 2023/06/03 - 게시글 요청 응답 - by leekoby */
export type PostApiResponse = {
  title: string;
  slug: string;
  meta: string;
}[];

/** 2023/06/09 - 게시글 타입 - by leekoby */
export interface PostDetail {
  title: string;
  slug: string;
  meta: string;
  tags: string[];
  thumbnail?: string;
  createdAt: Date;
}
