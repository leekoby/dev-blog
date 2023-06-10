import { NextPage } from 'next';
import { useRouter } from 'next/router';
interface Props {}

const MyNextPage: NextPage<Props> = () => {
  const router = useRouter();
  return <div>MyNextPage</div>;
};

export default MyNextPage;
