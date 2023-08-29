import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function Authorized({ children }: { children: ReactNode }) {
  const { username } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.replace("/login");
    }
  }, [router, username]);

  return <>{children}</>;
}
