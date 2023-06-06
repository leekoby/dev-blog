import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import PlaceHolder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import ToolBar from './ToolBar';

interface Props {}

const Editor: React.FC<Props> = (props): JSX.Element => {
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
      attributes: {
        class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  });
  return (
    <div className='p-3 dark:bg-primary-dark bg-primary transition'>
      <ToolBar editor={editor} />
      <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
