//req => <= middleware => <= res
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server'; //TODO: 에러노트

/** 2023/06/10 - next middleware 생성 - by leekoby */
export default withAuth(
  function middleware(req) {
    NextResponse.rewrite(new URL(req.url));
  },
  {
    // 접근 역할에 따라서 navigate
    callbacks: {
      authorized({ token }) {
        //return boolean type
        return token?.role === 'admin';
      },
    },
  }
);

export const config = { matcher: ['/admin/:path*'] };
