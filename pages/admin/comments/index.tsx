import Comments from '@/components/common/Comments';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}
/** 2023/06/24 -  댓글 관리자 페이지 - by leekoby */
const AdminComments: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <Comments fetchAll />
    </AdminLayout>
  );
};

export default AdminComments;
