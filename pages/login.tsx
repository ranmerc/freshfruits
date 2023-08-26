import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Container, Stack } from "@mui/material";
import Head from "next/head";

export default function Login() {
  const { username } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (username) {
      router.replace("/");
    }
  }, [router, username]);

  return (
    <>
      <Head>
        <title>Login - Fresh Fruits</title>
      </Head>
      <Container maxWidth="md" sx={{ p: { xs: 4, md: 10 } }}>
        <LoginForm />
      </Container>
    </>
  );
}
