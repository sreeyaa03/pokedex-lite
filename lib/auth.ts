import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // `user` may not have id typed in NextAuth default types — use a safe cast
        (token as any).id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // session.user type doesn't include `id` by default; cast to any to attach it
        (session.user as any).id = (token as any).id as string;
      }
      return session;
    },
  },
};
