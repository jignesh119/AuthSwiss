import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

//these endpoints are used to authenticate users at custom login/register
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    //NOTE: called after signIn/signOut/... are triggered
    //disallow if email==spam@gmail.com
    async signIn({ user, account, profile, email, credentials }) {
      //DEFAULT CALLBACK
      return true;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log(`sessionToken: `, token);
      if (session.user && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token; //no loggedin

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
