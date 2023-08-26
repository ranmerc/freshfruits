import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

export default function AuthPage({ children }: { children: ReactNode }) {
  const { username } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (username) {
      router.replace("/");
    }
  }, [router, username]);

  return (
    <>
      <Container maxWidth="md" sx={{ p: { xs: 4, md: 10 } }}>
        {children}
      </Container>
    </>
  );
}
