import useEditorConfig from '@/hooks/useEditorConfig';
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import ActionButton from './ActionButton';

interface Props {
  title?: string;
  onSubmit(content: string): void;
  busy?: boolean;
  onClose?(): void;
  initialState?: string;
}

/** 2023/06/11 - 댓글폼 - by leekoby */
const CommentForm: React.FC<Props> = ({
  title,
  busy = false,
  onSubmit,
  onClose,
  initialState,
}): JSX.Element => {
  const { editor } = useEditorConfig({ placeholder: '댓글을 입력하세요.' });

  const handleSubmit = () => {
    if (editor && !busy) {
      // editor type narrowing
      const value = editor?.getHTML();
      if (value === '<p></p>') return; // 빈값 입력시
      onSubmit(value);
    }
  };

  useEffect(() => {
    // if (editor && initialState) 이렇게 쓸때는 수정 <=> 작성 변경이 안됨
    if (typeof initialState === 'string') editor?.chain().focus().setContent(initialState).run();
  }, [editor, initialState]);

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
        <div className='flex space-x-4'>
          <ActionButton busy={busy} title='등록' onClick={handleSubmit} />
          {onClose ? (
            <button onClick={onClose} className='text-primary-dark dark:text-primary break-keep'>
              취소
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
