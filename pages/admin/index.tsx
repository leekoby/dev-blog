import AdminNav from '@/components/common/AdminNav';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <div className=''>
      <AdminLayout>admin</AdminLayout>
    </div>
  );
};

export default Admin;
