import React from 'react';

interface Props {
  onPrevClick?(): void;
  onNextClick?(): void;
}

/** 2023/06/24 - PageNavigator - by leekoby */
const PageNavigator: React.FC<Props> = ({ onPrevClick, onNextClick }): JSX.Element => {
  return (
    <div className='flex items-center space-x-3'>
      <Button onClick={onPrevClick} title='이전' />
      <Button onClick={onNextClick} title='다음' />
    </div>
  );
};

const Button: React.FC<{ title: string; onClick?: React.MouseEventHandler }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      className='text-primary-dark dark:text-primary hover:underline transition'
      onClick={onClick}>
      {title}
    </button>
  );
};

export default PageNavigator;
