import Head from "next/head";
import SignUpForm from "@/components/SIgnUpForm/SignUpForm";
import AuthPage from "@/components/AuthPage/AuthPage";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign up - Fresh Fruits</title>
      </Head>

      <AuthPage>
        <SignUpForm />
      </AuthPage>
    </>
  );
}
