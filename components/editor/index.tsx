import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';

interface Props {}

const Editor: React.FC<Props> = (props): JSX.Element => {
  const editor = useEditor({ extensions: [StarterKit] });
  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
