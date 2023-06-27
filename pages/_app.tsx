import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Jua, Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

interface Props {
  session?: Session | null;
}

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const jua = Jua({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['400'], //
  variable: '--jua',
});

/** 2023/06/11 - nProgress 추가 - by leekoby */
nProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

/** 2023/06/10 - 메인 Session 추가 - by leekoby */
export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <main className={classNames(notoSansKr.className, jua.variable)}>
      <CacheProvider>
        <ChakraProvider>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </main>
  );
}
