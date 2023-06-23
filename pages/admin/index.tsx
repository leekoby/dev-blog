import ContentWrapper from '@/components/admin/ContentWrapper';
import LatestCommentListCard from '@/components/admin/LatestCommentListCard';
import LatestPostListCard from '@/components/admin/LatestPostListCard';
import AdminNav from '@/components/common/nav/AdminNav';
import AdminLayout from '@/components/layout/AdminLayout';
import { LatestComment, PostDetail } from '@/utils/types';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {}

const Admin: NextPage<Props> = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  // 최근 게시글, 댓글 데이터 패칭
  useEffect(() => {
    // fetching latest Post
    axios(`/api/posts?limit=${5}&skip=${0}`)
      .then(({ data }) => setLatestPosts(data.posts))
      .catch((err) => console.log(err));

    // fetching latest Comments
    axios(`/api/comment/latest`)
      .then(({ data }) => setLatestComments(data.comments))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AdminLayout>
      <div className='flex space-x-10'>
        <ContentWrapper title='최근 게시글' seeAllRoute='/admin/posts'>
          {latestPosts?.map(({ id, title, meta, slug }) => {
            return <LatestPostListCard key={id} title={title} meta={meta} slug={slug} />;
          })}
        </ContentWrapper>

        <ContentWrapper title='최근 댓글' seeAllRoute='/admin'>
          {latestComments?.map((comment) => {
            return <LatestCommentListCard key={comment.id} comment={comment} />;
          })}
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
