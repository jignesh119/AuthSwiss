import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

//these endpoints are used to authenticate users at custom login/register
export const { auth, handlers, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      //if user REGISTER with OAUTH- verifyEmail as oauth providers take of it b4hand
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    //NOTE: called after signIn/signOut/... are triggered
    async signIn({ user, account, profile, email, credentials }) {
      // LATER
      // const existingUser = await getUserById(user.id as string);
      // if (!existingUser || !existingUser.emailVerified) return false;
      return true;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log(`sessionToken: `, token);
      if (session.user && token.role) {
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token; //no loggedin

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      //@ts-ignore
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
