import { GitHubAuthButton } from '@/components/button';
import { NextPage } from 'next';

interface Props {}

/** 2023/06/10 - 커스텀 로그인 페이지 - by leekoby */
const Signin: NextPage<Props> = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-primary dark:bg-primary-dark'>
      <GitHubAuthButton />
    </div>
  );
};

export default Signin;
