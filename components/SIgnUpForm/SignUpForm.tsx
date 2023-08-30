import axios from "axios";
import Link from "next/link";
import useSignUp from "@/hooks/useSignUp";
import FormHead from "../FormHead";
import { Field, Form, Formik } from "formik";
import { PersonAdd } from "@mui/icons-material";
import SignupSchema from "@/schemas/SignUpSchema";
import { SignUpFormValues } from "@/types/LoginTypes";
import { Button, Stack, TextField } from "@mui/material";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import LoadingBackdrop from "../LoadingBackdrop/LoadingBackdrop";

export default function SignUpForm() {
  const { isSuccess, isLoading, isError, error, mutate } = useSignUp();

  const handleLogin = async (values: SignUpFormValues) => {
    mutate(values);
  };

  return (
    <>
      <FormHead SVGIcon={PersonAdd} title="Sign Up" />
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
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
                label="Name"
                type="text"
                id="username"
                name="username"
                variant="outlined"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                required
              />
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
                Sign Up
              </Button>
              <Link href="/login" style={{ alignSelf: "center" }}>
                <Button variant="text">Login</Button>
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
      <AlertSnackbar
        isOpen={isSuccess}
        severity="success"
        message="Registered Successfully!"
      />
    </>
  );
}
