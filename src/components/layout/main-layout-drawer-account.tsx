import { LogoutRounded } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { useSignOutModalStore } from "./store/use-sign-out-modal-store";

interface MainLayoutDrawerAccountProps {
  name: string;
  email: string;
  username: string;
}

export default function MainLayoutDrawerAccount({
  name,
  email,
  username,
}: MainLayoutDrawerAccountProps) {
  const { openModal } = useSignOutModalStore();

  return (
    <Box
      mb={2}
      display="flex"
      sx={{
        px: 1,
        alignItems: "center",
        gap: 1,
      }}
    >
      <Avatar sx={{ width: 34, height: 34 }} />
      <Box sx={{ width: 166 }}>
        <Link
          component={NextLink}
          href={`/profile/${username}`}
          sx={{
            textDecoration: "none",
            color: "black",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          fontWeight={600}
        >
          {name}
        </Link>
        <Typography
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          color="GrayText"
          fontSize="small"
        >
          {email}
        </Typography>
      </Box>
      <IconButton size="small" onClick={openModal}>
        <LogoutRounded />
      </IconButton>
    </Box>
  );
}
