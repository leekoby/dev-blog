import { BsCheckLg } from 'react-icons/bs';

interface Props {
  visible: boolean;
}

const CheckMark: React.FC<Props> = ({ visible }): JSX.Element => {
  if (!visible) return <></>;
  return (
    <div className='bg-action p-2 text-primary rounded-full bg-opacity-70 backdrop-blur-sm'>
      <BsCheckLg />
    </div>
  );
};

export default CheckMark;