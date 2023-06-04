import AdminNav from '../common/AdminNav';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from 'react-icons/ai';
import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'DashBoard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
  { href: '/admin/contact', icon: AiOutlineContacts, label: 'Contact' },
];

const AdminLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className='flex'>
      <AdminNav navItems={navItems} />
      <div className='flex-1 p-4'>{children}</div>
      {/* create button */}
      <Link
        href={'/admin/post/create'}
        className={`bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition`}>
        <AiOutlineFileAdd size={24} />
      </Link>
    </div>
  );
};

export default AdminLayout;
