"use client";

import useForgotPasswordForm from "@/features/forgot-password/hook/use-forgot-password-form";
import { Button, Stack, TextField } from "@mui/material";

export default function ForgotPasswordForm() {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useForgotPasswordForm();

  return (
    <Stack component="form" onSubmit={onSubmit} spacing={2}>
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button
        loading={isSubmitting}
        type="submit"
        size="large"
        variant="contained"
      >
        Submit
      </Button>
    </Stack>
  );
}
