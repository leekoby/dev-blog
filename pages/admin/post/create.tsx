import Editor from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Create: NextPage<Props> = () => {
  return (
    <AdminLayout title='New Post'>
      <div className='max-w-4xl mx-auto'>
        <Editor
          onSubmit={(post) => {
            console.log(post);
          }}
          // initialValue={{}}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
