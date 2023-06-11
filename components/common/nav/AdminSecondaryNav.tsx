import { signOut } from 'next-auth/react';
import useDarkMode from '@/pages/hooks/useDarkMode';
import { options } from 'joi';
import { useRouter } from 'next/router';
import DropdownOptions, { dropDownOtions } from '../DropDownOption';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';

interface Props {}

/** 2023/06/11 - 부기능 네브 - by leekoby */
const AdminSecondaryNav: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push('/admin/posts/create');
  const handleLogOut = async () => await signOut();

  const options: dropDownOtions = [
    {
      label: 'Add New Post',
      onClick: navigateToCreateNewPost,
    },
    {
      label: 'Change Theme',
      onClick: toggleTheme,
    },
    {
      label: 'Log Out',
      onClick: handleLogOut,
    },
  ];
  return (
    <div className='flex items-center justify-between'>
      {/* 검색 */}
      <SearchBar />
      {/* 옵션/프로필  */}
      <DropdownOptions head={<ProfileHead nameInitail='L' />} options={options} />
    </div>
  );
};

export default AdminSecondaryNav;
