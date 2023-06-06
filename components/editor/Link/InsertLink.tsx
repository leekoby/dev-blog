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
  return (
    <div
      onKeyDown={({ key }) => {
        if (key === 'Escape') setVisible(false);
      }}
      className='relative'>
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>
      <div className='absolute top-full mt-4 z-50 right-0'>
        <LinkForm visible={visible} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
