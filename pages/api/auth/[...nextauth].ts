import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubAuthProvider from 'next-auth/providers/github';

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID_LOCAL,
  GITHUB_CLIENT_SECRET_LOCAL,
  MODE,
} = process.env;

const GIT_CLIENT_ID = MODE === 'development' ? GITHUB_CLIENT_ID_LOCAL : GITHUB_CLIENT_ID;
const GIT_CLIENT_SECRET =
  MODE === 'development' ? GITHUB_CLIENT_SECRET_LOCAL : GITHUB_CLIENT_SECRET;

/** 2023/06/10 - NextAuth Provider - by leekoby */
const authOptions: NextAuthOptions = {
  providers: [
    GitHubAuthProvider({
      clientId: GIT_CLIENT_ID as string,
      clientSecret: GIT_CLIENT_SECRET as string,
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

    async session({ session }) {
      await dbConnect();
      //이메일로 DB에서 유저 찾기
      const user = await User.findOne({ email: session.user?.email });
      if (user)
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        } as any; //타입 캐스팅 id, avatar
      return session;
    },
  },

  // 커스텀 로그인 페이지
  pages: {
    signIn: '/auth/signin',
    error: '/404',
  },
};
export default NextAuth(authOptions);
