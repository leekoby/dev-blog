import { BsBoxArrowUpRight, BsPencilSquare } from 'react-icons/bs';
import { BiUnlink } from 'react-icons/bi';
import { BubbleMenu, Editor } from '@tiptap/react';
import { useCallback, useState } from 'react';
import LinkForm, { LinkOption } from './LinkForm';

interface Props {
  editor: Editor;
}

/** 2023/06/06 - bubble menu - by leekoby */
const EditLink: React.FC<Props> = ({ editor }): React.JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false);
  // 링크 열기
  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes('link');
    if (href) {
      window.open(href, '_blank');
    }
  }, [editor]);

  // 링크 수정
  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  // 링크 삭제
  const handleUnlinkClick = useCallback(() => {
    editor.commands.unsetLink();
  }, [editor]);

  const handleSubmit = ({ url, openInNewTab }: LinkOption) => {
    editor
      .chain()
      .focus()
      .unsetLink() //기존에 있던 링크부터 지우고
      .setLink({ href: url, target: openInNewTab ? '_blank' : '' }) // 새로운 링크 덮어쓰기
      .run();
    setShowEditForm(false);
  };

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes('link');
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive('link')}
      editor={editor}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false);
        },
        appendTo: 'parent', //bubllemenu warining tippyjs
      }}>
      <LinkForm visible={showEditForm} onSubmit={handleSubmit} initialState={getInitialState()} />
      {!showEditForm && (
        <div className='rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50'>
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
