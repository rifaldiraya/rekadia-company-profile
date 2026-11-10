import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function MainLayoutDrawerBrand() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ position: "relative", px: 3, py: 3.5 }}>
      <Box
        sx={{
          display: "flex",
          p: 0.75,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: "0 8px 20px -8px rgba(0,0,0,.5)",
        }}
      >
        <Image src="/logo.png" alt="" width={32} height={32} />
      </Box>
      <Box>
        <Typography fontWeight={700} fontSize={18} lineHeight="22px" color="white">
          Rekadia
        </Typography>
        <Typography fontSize={12} lineHeight="16px" fontWeight={600} letterSpacing={1.5} color="#25c1da">
          CMS
        </Typography>
      </Box>
    </Stack>
  );
}
