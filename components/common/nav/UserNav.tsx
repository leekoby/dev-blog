import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { APP_NAME } from '../AppHead';
import { HiLightBulb } from 'react-icons/hi';
import Logo from '../Logo';
import { GitHubAuthButton } from '@/components/button';
import ProfileHead from '../ProfileHead';
import DropdownOptions, { dropDownOtions } from '../DropDownOption';
import { useRouter } from 'next/router';
import { UserProfile } from '@/utils/types';
import useDarkMode from '@/hooks/useDarkMode';
import SearchBar from '../SearchBar';

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

  const { toggleTheme } = useDarkMode();

  const dropDownOptions: dropDownOtions = isAdmin
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

  const handleSearchSubmit = (query: string) => {
    //비어있을때
    if (!query.trim()) return;

    // 검색어를 입력했을때
    router.push('/search?title=' + query);
  };

  return (
    <div className='flex items-center justify-between bg-primary-dark p-3 mb-10'>
      {/* Logo */}
      <Link href={'/'} className='flex items-center space-x-2 text-highlight-dark'>
        <Logo className='fill-highlight-dark md:w-8 md:h-8 w-5 h-5 shrink-0 hidden md:block' />
        <span className='text-md md:text-xl font-semibold'>{APP_NAME}</span>
      </Link>
      <div className='flex items-center justify-between mx-3 sm:mx-20 space-x-5'>
        <SearchBar onSubmit={handleSearchSubmit} position='user' />
        <div className='flex items-center space-x-5'>
          <button onClick={toggleTheme} className='dark:text-secondary-dark text-secondary-light'>
            <HiLightBulb size={32} className='' />
          </button>

          {isAuth ? (
            <DropdownOptions
              options={dropDownOptions}
              head={
                <ProfileHead
                  nameInitial={profile?.name[0].toUpperCase()}
                  avatar={profile?.avatar}
                  lightOnly
                />
              }
            />
          ) : (
            <GitHubAuthButton lightOnly />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNav;
