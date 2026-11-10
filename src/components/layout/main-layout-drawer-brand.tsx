import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function MainLayoutDrawerBrand() {
  return (
    <Box
      sx={{
        height: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack direction="row" alignItems="flex-end" px={2}>
        <Image src="/logo.png" alt="" width={50} height={50} />
        <Typography
          sx={{ ml: 2 }}
          fontWeight={600}
          color="#5CBDD7"
          fontSize="24px"
          lineHeight="24px"
        >
          Rekadia
        </Typography>
      </Stack>
    </Box>
  );
}
