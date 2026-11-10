"use client";

import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function ProfileHeader() {
  const { data } = useSession();

  return (
    <Box pb={4}>
      <Stack direction="row" alignItems="flex-end" gap={2}>
        <Box position="relative">
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={data?.user.image}
            alt={`${data?.user.name} photo's`}
          />
        </Box>
        <Box>
          <Typography component="p" variant="h6">
            {data?.user.name}
          </Typography>
          <Typography mb={1} variant="body2">
            {data?.user.email}
          </Typography>
          <Stack direction="row">
            {data?.user.roles.map((role) => (
              <Chip key={role} label={role} size="small" color="primary" />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
