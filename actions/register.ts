"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPwd = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "User already exists!" };

  await db.user.create({ data: { email, name, password: hashedPwd } });
  //TODO: Send confirmation email
  //restrict users who are not confirmed to login
  await generateVerificationToken(email);
  return { sucess: "confirmation email sent" };
};
