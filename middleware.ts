import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedin = !!req.auth;
  console.log(`ROUTE: `, req.nextUrl.pathname);
  console.log(`ISLOGGEDIN: `, isLoggedin);
});

//TODO: prisma and edge compatibility

//invoke middleware(^auth func) on these regex routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
