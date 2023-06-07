import { MouseEventHandler, ReactNode, useCallback, useEffect, useId } from 'react';

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}
interface Props extends ModalProps {
  children: ReactNode;
}
/** 2023/06/06 - 이미지 첨부 모달 컨테이너 - by leekoby */
const ModalContainer: React.FC<Props> = ({
  visible,
  children,
  onClose,
}): React.JSX.Element | null => {
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }: any) => {
    if (target.id === containerId) handleClose();
  };

  // mount unmount
  useEffect(() => {
    const closeModal = ({ key }: any) => key === 'Escape' && handleClose();
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div
      id={containerId}
      onClick={handleClick}
      className='fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center'>
      {children}
    </div>
  );
};

export default ModalContainer;
