import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import PlaceHolder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import ToolBar from './ToolBar';
import { useEffect, useState } from 'react';
import EditLink from './Link/EditLink';

interface Props {}

const Editor: React.FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      PlaceHolder.configure({
        placeholder: 'Type something',
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

  // 링크 범위 선택
  useEffect(() => {
    if (editor && selectionRange) editor.commands.setTextSelection(selectionRange);
  }, [editor, selectionRange]);

  return (
    <div className='p-3 dark:bg-primary-dark bg-primary transition'>
      <ToolBar editor={editor} />
      <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
      {editor && <EditLink editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
