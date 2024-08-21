<<<<<<< HEAD
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
export const currentRole = async () => {
  const user = await currentUser();
  return user?.role;
};
||||||| 8601a17
=======
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
>>>>>>> 29fc22287a1c43a5a7e11d37db58c94c7976c5ef
