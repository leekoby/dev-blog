import classNames from 'classnames';
import ModalContainer, { ModalProps } from './ModalContainer';
import { ImSpinner3 } from 'react-icons/im';

interface Props extends ModalProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}
const commonBtnClasses = 'px-3 py-1 text-white rounded';

/** 2023/06/11 - 삭제 확인 모달 - by leekoby */
const ConfirmModal: React.FC<Props> = ({
  visible,
  title,
  subTitle,
  busy = false,
  onClose,
  onCancel,
  onConfirm,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className='bg-primary-dark dark:bg-primary rounded p-3'>
        {/* 제목 */}
        <p className='dark:text-primary-dark text-primary font-semibold text-lg'>{title}</p>
        {/* 부제목 */}
        <p className='dark:text-primary-dark text-primary'>{subTitle}</p>

        {/* 버튼 */}
        {busy && (
          <p className='flex items-center space-x-2 dark:text-primary-dark text-primary pt-2'>
            <ImSpinner3 className='animate-spin' />
            <span>잠시 기다려주세요.</span>
          </p>
        )}
        {!busy && (
          <div className='flex items-center space-x-2 pt-2'>
            <button onClick={onConfirm} className={classNames(commonBtnClasses, 'bg-red-500')}>
              확인
            </button>
            <button onClick={onCancel} className={classNames(commonBtnClasses, 'bg-blue-500')}>
              취소
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
