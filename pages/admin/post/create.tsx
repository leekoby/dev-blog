import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import axios from 'axios';
import { NextPage } from 'next';

interface Props {}
/** 2023/06/05 - 게시글 생성 - by leekoby */
const Create: NextPage<Props> = () => {
  /** 2023/06/08 - 게시글 제출  - by leekoby */
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = new FormData();
      for (let key in post) {
        const value = (post as any)[key];
        if (key === 'tags' && value.trim()) {
          const tags = value.split(',').map((tag: string) => tag.trim());
          formData.append('tags', JSON.stringify(tags));
        } else formData.append(key, value);
      }
      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout title='New Post'>
      <div className='max-w-4xl mx-auto'>
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default Create;
