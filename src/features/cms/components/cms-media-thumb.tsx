import { Box } from "@mui/material";
import { ImageOutlined } from "@mui/icons-material";
import type { CmsMedia } from "@/features/cms/types/cms";

interface CmsMediaThumbProps {
  media?: CmsMedia;
  width?: number | string;
  height?: number;
  fit?: "cover" | "contain";
}

export default function CmsMediaThumb({ media, width = 44, height, fit = "contain" }: CmsMediaThumbProps) {
  const boxHeight = height ?? (typeof width === "number" ? width : 44);
  return (
    <Box
      sx={{
        width,
        height: boxHeight,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 2,
        bgcolor: "#f1f5f7",
        border: "1px solid #e3eaef",
      }}
    >
      {media ? (
        <Box component="img" src={media.url} alt={media.alt} sx={{ width: "100%", height: "100%", objectFit: fit }} />
      ) : (
        <ImageOutlined sx={{ fontSize: boxHeight * 0.45, color: "#b0bac9" }} />
      )}
    </Box>
  );
}
