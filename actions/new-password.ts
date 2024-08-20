"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string,
) => {
  if (!token) return { error: " token not found" };
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "token expired" };

  const exisitingUser = await getUserByEmail(existingToken.email);
  if (!exisitingUser) return { error: "User not found" };

  try {
    //TODO: updated pwd of user
    return { success: "Password updated" };
  } catch (e) {
    return { error: `${e}` };
  }
};
