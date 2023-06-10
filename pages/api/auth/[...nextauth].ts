import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubAuthProvider from 'next-auth/providers/github';

/** 2023/06/10 - NextAuth Provider - by leekoby */
const authOptions: NextAuthOptions = {
  providers: [
    GitHubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile) {
        // 사용자 확인
        await dbConnect();

        const oldUser = await User.findOne({ email: profile.email });

        const userProfile = {
          email: profile.email,
          name: profile.name || profile.login,
          avatar: profile.avatar_url,
          role: 'user',
        };

        // 기존 유저가 아니라면
        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: 'github',
          });
          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }
        return { id: profile.id, ...userProfile };
      },
    }),
  ],
  //역할에 따른 접근 callback
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
  },
  // 커스텀 로그인 페이지
  pages: {
    signIn: '/auth/signin',
    error: '/404',
  },
};
export default NextAuth(authOptions);
