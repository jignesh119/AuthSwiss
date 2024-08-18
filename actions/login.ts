"use server";
//TODO: server comps,client comps => way to use nextAuth
import * as z from "zod";
import { LoginSchema } from "../schemas";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //"use server" if this server action is not in a spt file
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "error validating login fields" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: e.message };
    }
    throw e;
  }
};
