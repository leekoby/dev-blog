import { UserProfile } from '@/utils/types';
import { useSession } from 'next-auth/react';

/** 2023/06/11 - useSession 커스텀 훅 - by leekoby */
const useAuth = () => {
  const { data } = useSession();
  const user = data?.user;
  if (user) return user as UserProfile;
};
export default useAuth;
