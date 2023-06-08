import AdminLayout from '@/components/layout/AdminLayout';
import { GetServerSideProps, NextPage } from 'next';

interface Props {}


//
const Posts: NextPage<Props> = () => {
  return <AdminLayout>posts</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

export default Posts;
