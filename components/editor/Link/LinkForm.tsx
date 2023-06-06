import { useState } from 'react';
import { validateUrl } from '../EditorUtils';

interface Props {
  visible: boolean;
  onSubmit(link: LinkOption): void;
}

export type LinkOption = {
  url: string;
  openInNewTab: boolean;
};

const defaultLink = { url: '', openInNewTab: false };

/** 2023/06/06 - 텍스트에디터 링크 컴포넌트 - by leekoby */
const LinkForm: React.FC<Props> = ({ visible, onSubmit }): JSX.Element | null => {
  const [link, setLink] = useState<LinkOption>(defaultLink);
  const handleSubmit = () => {
    if (!link.url.trim()) return;
    onSubmit({ ...link, url: validateUrl(link.url) });
    resetForm();
  };

  const resetForm = () => {
    setLink({ ...defaultLink });
  };

  if (!visible) return null;
  return (
    <div className='rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark'>
      <input
        autoFocus
        type='text'
        className='bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary'
        placeholder='https://example.com'
        value={link.url}
        onChange={({ target }) => setLink({ ...link, url: target.value })}
      />
      <div className='flex items-center space-x-2 mt-2'>
        <input
          type={'checkbox'}
          id='open-in-new-tab'
          checked={link.openInNewTab}
          onChange={({ target }) => setLink({ ...link, openInNewTab: target.checked })}
        />
        <label htmlFor='open-in-new-tab'>새탭에서 열기</label>
        <div className='flex-1 text-right'>
          <button onClick={handleSubmit} className='bg-action px-2 py-1 text-primary'>
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
