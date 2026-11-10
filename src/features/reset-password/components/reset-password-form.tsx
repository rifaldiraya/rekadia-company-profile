"use client";

import useResetPasswordForm from "@/features/reset-password/hook/use-reset-password-form";
import { Button, Stack, TextField } from "@mui/material";
import { useParams } from "next/navigation";

export default function ResetPasswordForm() {
  const { email, token }: { [key: string]: string } = useParams();
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useResetPasswordForm({ token, email });

  return (
    <Stack gap={2} component="form" noValidate onSubmit={onSubmit}>
      <TextField
        {...register("password")}
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
        type="password"
      />
      <TextField
        {...register("confirmationPassword")}
        label="Confirm password"
        error={!!errors.confirmationPassword}
        helperText={errors.confirmationPassword?.message}
        type="password"
      />
      <Button type="submit" loading={isSubmitting} variant="contained">
        Reset
      </Button>
    </Stack>
  );
}
