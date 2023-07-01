/** 2023/07/01 - 글자수 제한 함수  - by leekoby */
export const shortify = (text: string, maxLength = 70) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};
