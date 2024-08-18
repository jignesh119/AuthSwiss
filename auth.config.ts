import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
//The Credentials provider allows you to handle signing in with arbitrary credentials
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      //for users who dont use login page and use /api/auth/signin
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error("Invalid fields");
        } else if (validatedFields) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          //if user used oauth || no user found => dont proceed
          if (!user || !user.password) return null;

          const pwdMatch = await bcrypt.compare(password, user.password);
          if (pwdMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
