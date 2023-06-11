import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
  lightOnly?: boolean;
}

const commonClasses =
  'flex items-center justify-center space-x-1 px-3 py-2 rounded transition hover:scale-[0.97] duration-100 ';

/** 2023/06/10 - Github 로그인 버튼 - by leekoby */
export const GitHubAuthButton: React.FC<Props> = ({ lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return 'text-primary-dark bg-primary';
    return 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  const handleClick = async () => {
    await signIn('github');
  };

  return (
    <button onClick={handleClick} className={classNames(commonClasses, getStyle())}>
      <span>Continue With</span>
      <AiFillGithub size={24} />
    </button>
  );
};
