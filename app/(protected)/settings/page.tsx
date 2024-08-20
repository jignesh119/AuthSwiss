"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession, signOut } from "next-auth/react";

//async only in server comps
export default function Settings(props: {}) {
  //method to access user session
  //TODO: continue from here
  const user = useCurrentUser();
  const onClick = () => {
    //if in servr comp -> signOut from "@/auth"
    signOut();
  };
  return (
    <div>
      {JSON.stringify(user)}
      <form>
        <button type="submit" onClick={onClick}>
          Sign out
        </button>
      </form>
    </div>
  );
}
