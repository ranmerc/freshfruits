import axios from "axios";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";
import FormHead from "../FormHead";
import { Person } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import LoginSchema from "@/schemas/LoginSchema";
import { LoginFormValues } from "@/types/LoginTypes";
import { useUserContext } from "@/context/UserContext";
import { Button, Stack, TextField } from "@mui/material";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import LoadingBackdrop from "../LoadingBackdrop/LoadingBackdrop";

export default function LoginForm() {
  const { isLoading, isError, error, mutateAsync } = useLogin();
  const { setUserName } = useUserContext();

  const handleLogin = async (values: LoginFormValues) => {
    const user = await mutateAsync(values);
    setUserName(user);
  };

  return (
    <>
      <FormHead SVGIcon={Person} title="Login" />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <Stack
              width={{ xs: "100%", md: "40%" }}
              margin={"0 auto"}
              rowGap={3}
            >
              <Field
                as={TextField}
                label="Email Address"
                type="email"
                id="email"
                name="email"
                variant="outlined"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                required
              />
              <Field
                as={TextField}
                label="Password"
                type="password"
                id="password"
                name="password"
                variant="outlined"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ p: 1 }}
                disabled={!isValid}
              >
                Login
              </Button>
              <Link href="/signup" style={{ alignSelf: "center" }}>
                <Button variant="text">Create Account</Button>
              </Link>
            </Stack>
          </Form>
        )}
      </Formik>
      <LoadingBackdrop open={isLoading} />
      <AlertSnackbar
        isOpen={isError}
        severity="error"
        message={axios.isAxiosError(error) && error.response?.data?.message}
      />
    </>
  );
}
