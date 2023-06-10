import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubAuthProvider from 'next-auth/providers/github';

/** 2023/06/10 - NextAuth Provider - by leekoby */
const authOptions: NextAuthOptions = {
  providers: [
    GitHubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};
export default NextAuth(authOptions);
