"use client";

import useChangePasswordForm from "@/features/change-password/hook/use-change-password-form";
import { Button, Divider, Stack, TextField } from "@mui/material";

export default function ChangePasswordForm() {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useChangePasswordForm();

  return (
    <Stack gap={2} component="form" noValidate onSubmit={onSubmit}>
      <TextField
        {...register("currentPassword")}
        type="password"
        label="Current password"
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message}
        fullWidth
      />
      <Divider sx={{ my: 1 }} />
      <TextField
        {...register("newPassword")}
        type="password"
        label="New password"
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        fullWidth
      />
      <TextField
        {...register("confirmationPassword")}
        type="password"
        label="Confirm password"
        error={!!errors.confirmationPassword}
        helperText={errors.confirmationPassword?.message}
        fullWidth
      />
      <Button
        size="large"
        type="submit"
        loading={isSubmitting}
        variant="contained"
      >
        Submit
      </Button>
    </Stack>
  );
}
