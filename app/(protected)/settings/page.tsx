import { auth, signOut } from "@/auth";

export default async function Settings(props: {}) {
  //method to access user session
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          //only in server components
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
