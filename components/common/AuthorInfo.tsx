import Image from 'next/image';

export interface AuthorProfile {
  id: string;
  name: string;
  avatar: string;
  message: string;
}

interface Props {
  profile: AuthorProfile;
}
/** 2023/06/25 - 상세페이지 작성자 정보 - by leekoby */
const AuthorInfo: React.FC<Props> = ({ profile }): JSX.Element => {
  const { name, message, avatar } = profile;

  return (
    <div className='p-2 border-2 border-secondary-dark rounded flex'>
      {/* 프로필 아이콘 */}
      <div className='w-12'>
        <div className='aspect-square relative'>
          <Image src={avatar} fill alt={name} className='rounded' />
        </div>
      </div>
      <div className='ml-2 flex-1'>
        {/* 프로필 이름 */}
        <h4 className='font-semibold text-primary-dark dark:text-primary'>{name}</h4>
        {/* 메세지  */}
        <p className='text-primary-dark dark:text-primary opacity-90'>{message}</p>
      </div>
    </div>
  );
};

export default AuthorInfo;
