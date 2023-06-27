import { getMarkRange, Range, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import PlaceHolder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import { useState } from 'react';
import { Markdown } from 'tiptap-markdown';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

interface Options {
  placeholder?: string;
}

/** 2023/06/11 - 재사용 EditorConfig 커스텀 훅 - by leekoby */
const useEditorConfig = (options?: Options) => {
  const [selectionRange, setSelectionRange] = useState<Range>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Underline,
      Highlight,
      Typography,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      PlaceHolder.configure({
        placeholder: '내용 입력',
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: { class: 'w-full aspect-video' },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: 'mx-auto',
        },
      }),
      Markdown.configure({
        html: true, // HTML 입력/출력 허용
        tightLists: true, // 마크다운 출력에서 <li> 내부에 <p>가 없음
        tightListClass: 'tight', // <p> 마진을 제거할 수 있게 <ul>에 클래스 추가
        bulletListMarker: '-', // 마크다운 출력에서 <li> 접두어
        linkify: true, // "https://..." 텍스트에서 링크 생성
        breaks: true, // 마크다운 입력에서 새 줄 (\n)이 <br>로 변환됨
        transformPastedText: true, // 에디터에 마크다운 텍스트를 붙여넣을 수 있음
        transformCopiedText: true, // 복사된 텍스트가 마크다운으로 변환됨
      }),
      TableRow,
      TableCell,
      TableHeader,
      Table.configure({
        resizable: false,
        allowTableNodeSelection: true,
        HTMLAttributes: {
          table: {
            className: 'tiptap-table',
          },
          td: {
            className: 'tiptap-table-cell',
          },
          th: {
            className: 'tiptap-table-header',
          },
        },
      }),
    ],

    editorProps: {
      handleClick(view, position, event) {
        const { state } = view;
        const selectionRange = getMarkRange(state.doc.resolve(position), state.schema.marks.link);
        if (selectionRange) setSelectionRange(selectionRange);
      },

      attributes: {
        class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  });

  return { editor, selectionRange };
};

export default useEditorConfig;
