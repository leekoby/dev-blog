import { FinalPost } from '@/components/editor';
import { PostDetail } from './types';

/** 2023/06/09 - FormData 생성 함수 - by leekoby */
export const generateFormData = (post: FinalPost) => {
  const formData = new FormData();
  for (let key in post) {
    const value = (post as any)[key];
    if (key === 'tags' && value.trim()) {
      const tags = value.split(',').map((tag: string) => tag.trim());
      formData.append('tags', JSON.stringify(tags));
    } else formData.append(key, value);
  }

  return formData;
};

/** 2023/06/11 - 변경된 게시글 필터링 함수 - by leekoby */
export const filterPosts = (posts: PostDetail[], postToFilter: PostDetail) => {
  return posts.filter((post) => {
    return post.id !== postToFilter.id;
  });
};
