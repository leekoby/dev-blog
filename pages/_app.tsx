import DefaultLayout from '@/components/layout/DefaultLayout';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

interface Props {
  session?: Session | null;
}
/** 2023/06/10 - 메인 Session 추가 - by leekoby */
export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
