import { NextPage } from 'next';
import { useRouter } from 'next/router';
interface Props {}

const MySlugPage: NextPage<Props> = () => {
  const router = useRouter();
  return <div>MySlugPage</div>;
};

export default MySlugPage;
