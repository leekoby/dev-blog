import { LatestUsersProfile } from '@/utils/types';
import ProfileIcon from '../common/ProfileIcon';

interface Props {
  users?: LatestUsersProfile[];
}

/** 2023/06/23 - 유저 정보 확인 페이지 - by leekoby */
const LatestUserTable: React.FC<Props> = ({ users }): JSX.Element => {
  return (
    <div>
      <table className='w-full text-left text-primary-dark dark:text-primary'>
        <tbody>
          <tr className='text-left bg-secondary-dark text-primary-dark dark:text-primary'>
            <th className='p-2'>유저정보</th>
            <th className='p-2'>이메일</th>
            <th className='p-2'>제공</th>
          </tr>
          {users?.map((profile) => {
            return (
              <tr key={profile.id} className='border-b'>
                <td className='p-2'>
                  <div className='flex items-center space-x-2'>
                    <ProfileIcon
                      nameInitial={profile.name[0].toUpperCase()}
                      avatar={profile.avatar}
                    />
                    <p>{profile.name}</p>
                  </div>
                </td>

                <td className='p-2'>{profile.email}</td>
                <td className='p-2'>{profile.provider}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestUserTable;
