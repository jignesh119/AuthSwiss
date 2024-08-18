"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas";
import { revalidatePath } from "next/cache";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //"use server" if this server action is not in a spt file
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "error validating login fields" };
  }
  return { success: "Logged in successfully" };
};
