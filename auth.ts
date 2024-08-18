import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";

//if u render/use custom login/register pages
//these endpoints are used to authenticate users
export const { auth, handlers, signIn, signOut } = NextAuth({
  //NOTE: we cant use prisma db strategy with edgeNetworks
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
