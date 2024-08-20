"use server";
//TODO: server comps,client comps => way to use nextAuth
import * as z from "zod";
import { LoginSchema } from "../schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationMail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //"use server" if this server action is not in a spt file
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "error validating login fields" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "User not found" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationMail(
      verificationToken.email,
      verificationToken.token,
    );
    //TODO: verify verification token
    return { success: "Confirmation email sent" };
  }

  try {
    //ONE-WAY TO WORK WITH PROVIDERS
    //await signIn("google")..in a server action
    //OR
    //in comp, import {signIn} from "next-auth/react"
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      console.log(e.message);
      return { error: `Something went wrong` };
    }
    throw e;
  }
};
