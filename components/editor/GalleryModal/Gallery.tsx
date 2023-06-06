import { BsCardImage } from 'react-icons/bs';
import Image from './Image';

interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage?: string;
}

/** 2023/06/06 - 이미지 첨부 갤러리 (임시) - by leekoby */
const Gallery: React.FC<Props> = ({
  images,
  onSelect,
  uploading = false,
  selectedImage = '',
}): JSX.Element => {
  return (
    <div className='flex flex-wrap '>
      {uploading && (
        <div className='basis-1/4 relative w-[200px] aspect-square p-2 flex flex-col items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse'>
          <BsCardImage size={60} />
          <p>Uploading</p>
        </div>
      )}
      {images.map(({ src }, index) => {
        return (
          <div key={index} className='basis-1/4 relative w-[200px] aspect-square p-2'>
            <Image src={src} selected={selectedImage === src} onClick={() => onSelect(src)} />;
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
