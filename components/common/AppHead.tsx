import Head from 'next/head';

interface Props {
  title?: string;
  desc?: string;
}

export const APP_NAME = 'Koby Dev Blogs';

/** 2023/06/07 - Head - by leekoby */
const AppHead: React.FC<Props> = ({ title, desc }): JSX.Element => {
  return (
    <Head>
      <title>{title ? title + ' | ' + APP_NAME : APP_NAME}</title>
      <meta content={desc} name='description' />
    </Head>
  );
};

export default AppHead;
