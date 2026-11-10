"use client";

import { useState, type KeyboardEvent } from "react";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  EditNoteRounded,
  KeyboardCapslockRounded,
  LockOutlined,
  PersonOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import useSignIn from "@/features/sign-in/hook/use-sign-in";
import { SignInSchema, signInSchema } from "@/features/sign-in/schema/sign-in-schema";
import { DEMO_ACCOUNTS, type DemoAccount } from "@/features/sign-in/data/demo-accounts";
import { ROUTES } from "@/config/route";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    bgcolor: "#f6f7f9",
    transition: "background-color 200ms ease, box-shadow 200ms ease",
    "& fieldset": { borderColor: "#d5dbe2" },
    "&:hover fieldset": { borderColor: "#25c1da" },
    "&.Mui-focused": { bgcolor: "white", boxShadow: "0 0 0 4px rgba(37,193,218,.15)" },
  },
};

const ACCOUNT_ICONS: Record<DemoAccount["role"], typeof AdminPanelSettingsOutlined> = {
  Superadmin: AdminPanelSettingsOutlined,
  Editor: EditNoteRounded,
};

export default function SignInForm() {
  const router = useRouter();
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; attempt: number } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const { control, handleSubmit, setValue, clearErrors } = useForm<SignInSchema>({
    defaultValues: { emailOrUserName: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values: SignInSchema) => {
    setLoading(true);
    setError(null);
    const result = await signIn.credentials(values);
    if (result.ok) {
      router.push(ROUTES.DASHBOARD);
      router.refresh();
      return;
    }
    setLoading(false);
    setError((previous) => ({ message: result.message, attempt: (previous?.attempt ?? 0) + 1 }));
  };

  const fillDemoAccount = (account: DemoAccount) => {
    setValue("emailOrUserName", account.email);
    setValue("password", account.password);
    clearErrors();
    setError(null);
    setSelectedDemo(account.id);
  };

  const trackCapsLock = (event: KeyboardEvent) => setCapsLock(event.getModifierState("CapsLock"));

  return (
    <Box sx={{ width: "100%", maxWidth: 420 }}>
      <Link
        component={NextLink}
        href="/"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: 14,
          fontWeight: 500,
          color: "#667991",
          mb: 5,
          "&:hover": { color: "primary.main" },
          "&:hover svg": { transform: "translateX(-3px)" },
          svg: { transition: "transform 200ms ease" },
        }}
      >
        <ArrowBackRounded fontSize="small" /> Back to website
      </Link>

      <Typography component="h1" sx={{ fontSize: 30, fontWeight: 700, color: "#22272f", lineHeight: 1.2 }}>
        Welcome back
      </Typography>
      <Typography sx={{ mt: 1, mb: 4, fontSize: 15, color: "#667991" }}>
        Sign in to manage the Rekadia website content.
      </Typography>

      {error && (
        <Alert
          key={error.attempt}
          severity="error"
          role="alert"
          sx={{ mb: 2.5, borderRadius: 2.5, animation: `${shake} 400ms ease`, [REDUCED_MOTION]: { animation: "none" } }}
        >
          {error.message}
        </Alert>
      )}

      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2.5}>
        <Controller
          name="emailOrUserName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onChange={(event) => {
                field.onChange(event);
                setSelectedDemo(null);
              }}
              label="Email or username"
              placeholder="admin@rekadia.co.id"
              autoComplete="username"
              autoFocus
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRounded sx={{ color: "#8595ab" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onChange={(event) => {
                field.onChange(event);
                setSelectedDemo(null);
              }}
              onKeyUp={trackCapsLock}
              onKeyDown={trackCapsLock}
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ??
                (capsLock ? (
                  <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, color: "#b26a00" }}>
                    <KeyboardCapslockRounded sx={{ fontSize: 16 }} /> Caps Lock is on
                  </Box>
                ) : undefined)
              }
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#8595ab" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((visible) => !visible)}
                      >
                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "8px !important" }}>
          <Link component={NextLink} href="/forgot-password" underline="hover" sx={{ fontSize: 14, fontWeight: 500 }}>
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          size="large"
          loading={loading}
          endIcon={<ArrowForwardRounded />}
          sx={{
            py: 1.5,
            borderRadius: 2.5,
            fontSize: 16,
            backgroundImage: "linear-gradient(90deg, #006876, #00c2dc)",
            boxShadow: "0 12px 24px -12px rgba(0,104,118,.7)",
            transition: "transform 200ms ease, box-shadow 200ms ease",
            "&:hover": { transform: "translateY(-1px)", boxShadow: "0 16px 28px -12px rgba(0,104,118,.8)" },
            "&:hover .MuiButton-endIcon": { transform: "translateX(3px)" },
            ".MuiButton-endIcon": { transition: "transform 200ms ease" },
            [REDUCED_MOTION]: { "&:hover": { transform: "none" } },
          }}
        >
          Sign in
        </Button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#667991", mb: 1.5 }}>
          Demo accounts (dummy data)
        </Typography>
        <Stack spacing={1.25}>
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = ACCOUNT_ICONS[account.role];
            const selected = selectedDemo === account.id;
            return (
              <ButtonBase
                key={account.id}
                onClick={() => fillDemoAccount(account)}
                aria-pressed={selected}
                sx={{
                  justifyContent: "flex-start",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2.5,
                  textAlign: "left",
                  border: "1px solid",
                  borderColor: selected ? "#25c1da" : "#eceef2",
                  bgcolor: selected ? "rgba(37,193,218,.08)" : "white",
                  transition: "border-color 200ms ease, background-color 200ms ease",
                  "&:hover": { borderColor: "#25c1da" },
                  "&.Mui-focusVisible": { outline: "2px solid #25c1da", outlineOffset: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    borderRadius: 2,
                    color: "primary.main",
                    bgcolor: "rgba(0,194,220,.12)",
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#22272f" }}>
                    {account.role} · {account.email}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#667991" }}>{account.description}</Typography>
                </Box>
                {selected ? (
                  <CheckCircleRounded sx={{ color: "#25c1da" }} />
                ) : (
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "primary.main" }}>Use</Typography>
                )}
              </ButtonBase>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
