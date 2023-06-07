import ActionButton from '@/components/common/ActionButton';
import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';
import Image from 'next/image';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Gallery from './Gallery';

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  images: { src: string }[];
  uploading?: boolean;
  onFileSelect(image: File): void;
  onSelect(result: ImageSelectionResult): void;
}

/** 2023/06/06 - 이미지 첨부 모달 - by leekoby */
const GalleryModal: React.FC<Props> = ({
  visible,
  images,
  uploading,
  onFileSelect,
  onSelect,
  onClose,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState('');
  const [altText, setAltText] = useState('');

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    if (!file.type.startsWith('image')) return handleClose();
    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText });
    handleClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className='max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded'>
        <div className='flex'>
          {/* 갤러리 */}
          <div className='basis-3/4 max-h-[450px] overflow-y-auto custom-scroll-bar'>
            <Gallery
              images={images}
              selectedImage={selectedImage}
              uploading={uploading}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>
          {/* 이미지 선택 및 업로드 */}
          <div className='basis-1/4 px-2'>
            <div className='space-y-4'>
              <div>
                <input onChange={handleOnImageChange} hidden type='file' id='image-input' />
                <label htmlFor='image-input'>
                  <div className='w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded'>
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className='resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark focus:right-1 text-primary dark:text-primary-dark h-32 p-1'
                    placeholder='alt text'
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  />
                  <ActionButton busy title='Select' onClick={handleSelection} />
                  <div className='relative aspect-video bg-png-pattern'>
                    <Image src={selectedImage} fill style={{ objectFit: 'contain' }} alt={''} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
