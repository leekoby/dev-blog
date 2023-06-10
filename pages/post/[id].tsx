import { NextPage } from 'next';
import { useRouter } from 'next/router';
interface Props {}

const MyNextPage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router);
  return <div>MyNextPage</div>;
};

export default MyNextPage;
