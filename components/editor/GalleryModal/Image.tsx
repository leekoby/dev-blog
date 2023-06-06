import CheckMark from '@/components/common/CheckMark';
import NextImage from 'next/image';
interface Props {
  src: string;
  selected?: boolean;
  onClick?(): void;
}

const Image: React.FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div onClick={onClick} className='rounded overflow-hidden cursor-pointer'>
      <NextImage
        src={src}
        fill
        alt='gallery'
        className='bg-secondary-light hover:scale-110 transition p-1'
      />
      {/* png 업로드 때문에 bg 줌 */}
      <div className='absolute top-2 left-2'>
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
