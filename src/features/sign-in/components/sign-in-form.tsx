"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSignIn from "@/features/sign-in/hook/use-sign-in";
import {
  SignInSchema,
  signInSchema,
} from "@/features/sign-in/schema/sign-in-schema";
import {  Button, Stack, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROUTES } from "@/config/route";

export default function SignInForm() {
  const router = useRouter();
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    defaultValues: {
      emailOrUserName: "superadmin@test.com",
      password: "Pa$$w0rd",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values: SignInSchema) => {
    setLoading(true);

    return signIn
      .credentials(values)
      .then(() => {
        router.push(ROUTES.DASHBOARD);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
      <TextField
        {...register("emailOrUserName")}
        helperText={errors.emailOrUserName?.message}
        error={!!errors.emailOrUserName}
        label="Username or email"
        placeholder="superadmin"
      />
      <TextField
        {...register("password")}
        helperText={errors.password?.message}
        error={!!errors.password}
        label="Password"
        placeholder="••••••••"
        type="password"
      />
      <Stack justifyContent="flex-end">
        <Typography
          sx={{ textDecoration: "none" }}
          ml="auto"
          width="fit-content"
          component="a"
          href="/forgot-password"
          fontSize="small"
          color="primary"
        >
          Forgot password?
        </Typography>
      </Stack>
      <Button
        loading={loading}
        type="submit"
        size="large"
        color="primary"
        variant="contained"
      >
        Sign in
      </Button>
    </Stack>
  );
}
