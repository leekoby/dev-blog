import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { APP_NAME } from '../AppHead';
import { HiLightBulb } from 'react-icons/hi';
import Logo from '../Logo';
import { GitHubAuthButton } from '@/components/button';
import ProfileHead from '../ProfileHead';
import DropdownOptions, { dropDownOtions } from '../DropDownOption';
import { useRouter } from 'next/router';
import { UserProfile } from '@/utils/types';

interface Props {}

const defaultOptions: dropDownOtions = [
  {
    label: 'Logout',
    async onClick() {
      await signOut();
    },
  },
];

/** 2023/06/09 - User Nav - by leekoby */
const UserNav: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter();

  //session 추가
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === 'admin';

  const hadleLoginWithGithub = async () => {
    const res = await signIn('github');
  };

  const dropDownOtions: dropDownOtions = isAdmin
    ? [
        {
          label: 'Dashboard',
          onClick() {
            router.push('/admin');
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className='flex items-center justify-between bg-primary-dark p-3'>
      {/* Logo */}
      <Link href={'/'} className='flex space-x-2 text-highlight-dark'>
        <Logo className='fill-highlight-dark' />
        <span className='text-xl font-semibold'>{APP_NAME}</span>
      </Link>
      <div className='flex items-center space-x-5'>
        <button className='dark:text-secondary-dark text-secondary-light'>
          <HiLightBulb size={34} className='' />
        </button>

        {isAuth ? (
          <DropdownOptions
            options={dropDownOtions}
            head={<ProfileHead nameInitail='N' lightOnly />}
          />
        ) : (
          <GitHubAuthButton lightOnly onClick={hadleLoginWithGithub} />
        )}
      </div>
    </div>
  );
};

export default UserNav;
