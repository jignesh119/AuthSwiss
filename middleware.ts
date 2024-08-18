// NOTE: continue code with antonio from 2:40
// import { auth } from "@/auth"; not needed
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { NextRequest } from "next/server";

//access to auth in middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log(`it isApiAuthRoute`);
    // return null;
  } else if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    console.log(`it isAuthRoute`);
    // return null;
  } else if (!isLoggedin && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  console.log("middleware accepted, continuing");
  // return null;
});

//prisma and edge compatibility: db doesnt support edge
//HACK: use prisma in middleware

//invoke middleware(^auth func) on these regex routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
