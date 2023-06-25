import Comments from '@/components/common/Comments';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}
/** 2023/06/24 -  댓글 관리자 페이지 - by leekoby */
const AdminComments: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl text-primary-dark dark:text-primary font-semibold py-2 transition'>
          Comments
        </h1>
        <Comments fetchAll />
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
