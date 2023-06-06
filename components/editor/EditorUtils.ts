import { Editor } from '@tiptap/react';

/** 2023/06/06 - 에디터 포커싱 - by leekoby */
export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};

/** 2023/06/06 - url 유효성 검사 - by leekoby */
export const validateUrl = (url: string) => {
  if (!url.trim()) return '';
  let finalUrl;
  try {
    finalUrl = new URL(url);
  } catch (error) {
    finalUrl = new URL('http://' + url);
  }

  return finalUrl.origin;
};
