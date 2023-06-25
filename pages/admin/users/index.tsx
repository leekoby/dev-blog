import LatestUserTable from '@/components/admin/LatestUserTable';
import PageNavigator from '@/components/common/PageNavigator';
import AdminLayout from '@/components/layout/AdminLayout';
import { LatestUsersProfile } from '@/utils/types';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {}

const limit = 5;
let currentPageNo = 0;

/** 2023/06/25 - 관리자 유저 페이지 - by leekoby */
const Users: NextPage<Props> = () => {
  const [users, setUsers] = useState<LatestUsersProfile[]>();

  const [reachedToEnd, setReachedToEnd] = useState(false);

  //모든 유저 가져오기
  const fetchAllUsers = (pageNo: number = currentPageNo) => {
    axios(`/api/user?pageNo=${pageNo}&limit=${limit}`)
      .then(({ data }) => {
        if (!data.users.length) {
          currentPageNo -= 1;
          return setReachedToEnd(true);
        }

        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo = currentPageNo + 1;
    fetchAllUsers(currentPageNo);
  };
  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo = currentPageNo - 1;
    fetchAllUsers(currentPageNo);
  };

  useEffect(fetchAllUsers, []);

  return (
    <AdminLayout>
      <h1 className='text-2xl text-primary-dark dark:text-primary font-semibold py-2 transition'>
        Users
      </h1>
      <LatestUserTable users={users} />
      <div className='py-10 flex justify-end'>
        <PageNavigator onNextClick={handleOnNextClick} onPrevClick={handleOnPrevClick} />
      </div>
    </AdminLayout>
  );
};

export default Users;
