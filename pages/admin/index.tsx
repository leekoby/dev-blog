import ContentWrapper from '@/components/admin/ContentWrapper';
import LatestCommentListCard from '@/components/admin/LatestCommentListCard';
import LatestPostListCard from '@/components/admin/LatestPostListCard';
import AdminNav from '@/components/common/nav/AdminNav';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div className='flex space-x-10'>
        <ContentWrapper title='최근 게시글' seeAllRoute='/admin'>
          <LatestPostListCard
            title='제목'
            slug='slug'
            meta='메타데이터     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, quo. Quam incidunt
        asperiores ducimus expedita est sequi deserunt, architecto assumenda beatae mollitia aliquid
        aliquam excepturi quas doloremque nam neque temporibus in consectetur quia distinctio
        voluptatibus magnam quasi dignissimos! Quaerat iusto ipsum illum tempora debitis quae
        deleniti, ut consectetur. Rem, vel laudantium et officia distinctio consequatur omnis,
        ratione quasi tenetur qui laboriosam. Debitis eligendi consequatur consequuntur, provident
        tempore, aspernatur accusamus placeat autem consectetur natus sit dolore facere rem?
        Cupiditate nobis corporis aliquam id laboriosam architecto voluptatem maiores et? Dicta
        labore quam fugiat, deserunt doloremque ea temporibus, tempore enim id doloribus officia
        dolorum soluta quia veniam unde iste! Rem amet temporibus modi consectetur, veritatis in
        vero nemo consequatur consequuntur eveniet sunt delectus velit facilis quaerat dolores!
        Voluptate debitis natus enim et fugit, molestiae ullam autem, eius at ea quidem nisi,
        impedit illo temporibus exercitationem tenetur reprehenderit alias molestias est cum optio
        quibusdam id! Dolorum modi autem, eius, facere quos nisi laborum quibusdam quis inventore
        deserunt eligendi quae velit qui? Quae accusamus magnam suscipit non maiores, fuga rerum
        sunt natus! Omnis, nisi! Debitis illum reprehenderit ipsa doloribus, est tempora,
        repudiandae nemo alias aspernatur saepe, culpa omnis eos doloremque veniam dolorum natus
        autem nulla.'
          />
        </ContentWrapper>

        <ContentWrapper title='최근 댓글' seeAllRoute='/admin'>
          {/* <LatestCommentListCard comment={} /> */}
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
