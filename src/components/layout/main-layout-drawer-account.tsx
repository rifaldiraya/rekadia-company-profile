import { LogoutRounded } from "@mui/icons-material";
import { Avatar, Box, IconButton, Link, Tooltip, Typography } from "@mui/material";
import NextLink from "next/link";
import { useSignOutModalStore } from "./store/use-sign-out-modal-store";

interface MainLayoutDrawerAccountProps {
  name: string;
  email: string;
  username: string;
  role?: string;
}

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function MainLayoutDrawerAccount({
  name,
  email,
  username,
  role,
}: MainLayoutDrawerAccountProps) {
  const { openModal } = useSignOutModalStore();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        p: 1.25,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.14)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Avatar
        sx={{
          width: 38,
          height: 38,
          fontSize: 14,
          fontWeight: 700,
          color: "#063646",
          background: "linear-gradient(135deg, #c4f3ff, #25c1da)",
        }}
      >
        {initialsOf(name)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Link
          component={NextLink}
          href={`/profile/${username}`}
          underline="hover"
          display="block"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          fontSize={14}
          fontWeight={600}
          color="white"
        >
          {name}
        </Link>
        <Typography
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          fontSize={12}
          color="rgba(255,255,255,.65)"
          title={email}
        >
          {role ? `${role} · ${email}` : email}
        </Typography>
      </Box>
      <Tooltip title="Sign out">
        <IconButton
          size="small"
          aria-label="Sign out"
          onClick={openModal}
          sx={{ color: "rgba(255,255,255,.8)", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,.12)" } }}
        >
          <LogoutRounded fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
