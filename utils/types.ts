/** 2023/06/03 - 게시글 요청 응답 - by leekoby */
export type PostApiResponse = {
  title: string;
  slug: string;
  meta: string;
}[];

/** 2023/06/09 - 게시글 타입 - by leekoby */
export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  meta: string;
  tags: string[];
  thumbnail?: string;
  createdAt: string;
}

/** 2023/06/09 - 게시글 수신 타입 - by leekoby */
export interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
}
/** 2023/06/10 - 유저정보 타입 - by leekoby */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: 'user' | 'admin';
}
