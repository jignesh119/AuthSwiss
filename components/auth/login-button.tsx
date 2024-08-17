"use client";
import { useRouter } from "next/navigation";
interface ILoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: ILoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    console.log(`login btn clicked`);
    if (mode === "modal") {
      return <span>TODO: implement modaal</span>;
    }
    router.push("/auth/login");
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
