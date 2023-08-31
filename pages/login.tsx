import AuthPage from "@/components/AuthPage/AuthPage";
import LoginForm from "@/components/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Fresh Fruits</title>
      </Head>

      <AuthPage>
        <LoginForm />
      </AuthPage>
    </>
  );
}
