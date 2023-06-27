import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Jua } from 'next/font/google';

interface Props {
  session?: Session | null;
}

const jua = Jua({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['400'], //
});

console.log(jua);
/** 2023/06/11 - nProgress 추가 - by leekoby */
nProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

/** 2023/06/10 - 메인 Session 추가 - by leekoby */
export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <main className={jua.className}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
