import { DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & { role: "ADMIN" | "USER" };

//add any custom field in user session here
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
