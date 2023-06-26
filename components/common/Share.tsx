import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share';

interface Props {
  url: string;
  title?: string;
  quote?: string;
}

/** 2023/06/26 - 게시글 공유하기 - by leekoby */
const Share: React.FC<Props> = ({ url, title, quote }): JSX.Element => {
  return (
    //TODO: 카카오, 디스코드가 기본제공이 아니여서 오픈소스 기여해보자
    <div className='flex items-center space-x-3'>
      <p className='font-semibold text-primary-dark dark:text-primary'>공유하기: </p>
      <FacebookShareButton url={url} quote={quote} title={title}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} source={quote} title={title}>
        <LinkedinIcon round size={32} />
      </LinkedinShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon round size={32} />
      </LineShareButton>
    </div>
  );
};

export default Share;
