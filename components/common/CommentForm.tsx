import useEditorConfig from '@/hooks/useEditorConfig';
import { EditorContent } from '@tiptap/react';
import ActionButton from './ActionButton';

interface Props {
  title?: string;
  onSubmit(content: string): void;
  busy?: boolean;
}

/** 2023/06/11 - 댓글폼 - by leekoby */
const CommentForm: React.FC<Props> = ({ title, busy = false, onSubmit }): JSX.Element => {
  const { editor } = useEditorConfig({ placeholder: '댓글을 입력하세요.' });

  const handleSubmit = () => {
    if (editor && !busy) {
      // editor type narrowing
      const value = editor?.getHTML();
      if (value === '<p></p>') return; // 빈값 입력시
      onSubmit(value);
    }
  };

  return (
    <div>
      {title ? (
        <h1 className='text-xl text-primary-dark dark:text-primary font-semibold py-3'>{title}</h1>
      ) : null}
      <EditorContent
        className='min-h-[200px] border-2 border-secondary-dark rounded p-2'
        editor={editor}
      />
      <div className='flex justify-end py-3'>
        <div className='inline-block'>
          <ActionButton busy={busy} title='Submit' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
