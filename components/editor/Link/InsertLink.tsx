import { useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import Button from '../ToolBar/Button';
import LinkForm, { LinkOption } from './LinkForm';

interface Props {
  onSubmit(link: LinkOption): void;
}

/** 2023/06/06 - 텍스트에디터 링크 삽입 버튼 - by leekoby */
const InsertLink: React.FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const handleSubmit = (link: LinkOption) => {
    if (!link.url.trim()) return hideForm();
    onSubmit(link);
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === 'Escape') hideForm();
      }}
      className='relative'>
      <Button onClick={visible ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>
      <div className='absolute top-full mt-4 z-50 right-0'>
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
