import { auth } from "@/auth";

export default async function Settings(props: {}) {
  const session = await auth();
  return <div> {JSON.stringify(session)}</div>;
}
