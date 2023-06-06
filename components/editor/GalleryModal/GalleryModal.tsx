import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';

interface Props extends ModalProps {}

/** 2023/06/06 - 이미지 첨부 모달 - by leekoby */
const GalleryModal: React.FC<Props> = ({ visible, onClose }): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className='bg-black p-20 '>
        <button className='bg-white p-3'>Click</button>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
