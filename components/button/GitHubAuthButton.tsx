import classNames from 'classnames';
import { useCallback } from 'react';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
  lightOnly?: boolean;
  onClick?(): void;
}

const commonClass =
  'flex items-center justify-center space-x-1 px-3 py-2 rounded transition hover:scale-[0.97] duration-100 ';

export const GitHubAuthButton: React.FC<Props> = ({ lightOnly, onClick }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return 'text-primary-dark bg-primary';
    return 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  return (
    <button onClick={onClick} className={classNames(commonClass, getStyle())}>
      <span>Continue With</span>
      <AiFillGithub size={24} />
    </button>
  );
};
