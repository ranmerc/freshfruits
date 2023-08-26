import { useUserContext } from "@/context/UserContext";
import LoginSchema from "@/schemas/LoginSchema";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import useLogin from "@/hooks/useLogin";
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormValues } from "@/types/LoginTypes";
import axios from "axios";

export default function LoginForm() {
  const { isLoading, isError, error, mutateAsync } = useLogin();
  const { setUserName } = useUserContext();
  const [showError, setShowError] = useState(isError);

  useEffect(() => {
    setShowError(isError);
  }, [isError]);

  const handleLogin = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const user = await mutateAsync(values);
    setUserName(user);
  };

  return (
    <>
      <Stack alignItems={"center"} width={"100%"} rowGap={2} mb={4}>
        <AccountCircle sx={{ fontSize: 60 }} color="secondary" />
        <Typography variant="h5">Login</Typography>
      </Stack>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showError}
        autoHideDuration={3000}
        onClose={() => {
          setShowError(false);
        }}
        onClick={() => {
          setShowError(false);
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {axios.isAxiosError(error) && error.response?.data?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
