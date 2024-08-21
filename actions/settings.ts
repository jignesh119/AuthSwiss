import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) return { error: "User not found" };

  await db.user.update({ where: { id: dbUser.id }, data: { ...values } });

  return { success: "Settings updated" };
};
