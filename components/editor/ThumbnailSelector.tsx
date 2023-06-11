import classnames from 'classnames';
import { ChangeEventHandler, useEffect, useState } from 'react';

interface Props {
  initialValue?: string;
  onChange(file: File): void;
}

const commonClass =
  'border border-dashed border-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video text-secondary-dark dark:text-secondary-light';

const ThumbnailSelector: React.FC<Props> = ({ initialValue, onChange }): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    setSelectedThumbnail(window.URL.createObjectURL(file)); //window 뺴면 에러남
    onChange(file);
  };

  useEffect(() => {
    // string일 때만 / file일때는 아무것도 하지 않음
    if (typeof initialValue === 'string') setSelectedThumbnail(initialValue);
  }, [initialValue]);

  return (
    <div className='w-32'>
      <input
        type='file'
        hidden
        accept='image/jpg, image/png,image/jpeg'
        id='thumbnail'
        onChange={handleChange}
      />
      <label htmlFor='thumbnail'>
        {selectedThumbnail ? (
          <img src={selectedThumbnail} alt='' className={classnames(commonClass, 'object-cover')} />
        ) : (
          <PosterUI label='Thumbnail' />
        )}
      </label>
    </div>
  );
};

const PosterUI: React.FC<{ label: string; className?: string }> = ({ label, className }) => {
  return (
    <div className={classnames(commonClass, className)}>
      <span>{label}</span>
    </div>
  );
};

export default ThumbnailSelector;
