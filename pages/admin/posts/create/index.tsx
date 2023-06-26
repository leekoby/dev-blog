import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import { generateFormData } from '@/utils/helper';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface Props {}
/** 2023/06/05 - 게시글 생성 - by leekoby */
const Create: NextPage<Props> = () => {
  const router = useRouter();

  /** 2023/06/08 - 게시글 제출  - by leekoby */
  const handleSubmit = async (post: FinalPost) => {
    try {
      // FormData 생성
      const formData = generateFormData(post);

      // 게시글 제출
      const { data } = await axios.post('/api/posts', formData);
      router.push('/' + data.post.slug);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout title='New Post'>
      <div className='max-w-5xl mx-auto'>
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default Create;
