import type { NextAuthConfig } from "next-auth";
//The Credentials provider allows you to handle signing in with arbitrary credentials
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";

export default {
  providers: [
    Credentials({
      //for users who dont use login page and send data to /api/auth/login -> they need to be validated as well
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error("Invalid fields");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
