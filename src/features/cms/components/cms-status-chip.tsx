import { Chip } from "@mui/material";
import type { CmsStatus } from "@/features/cms/types/cms";

const STYLES: Record<CmsStatus, { label: string; color: string; bg: string; dot: string }> = {
  published: { label: "Published", color: "#0b7a5c", bg: "rgba(34,197,148,.14)", dot: "#22c594" },
  draft: { label: "Draft", color: "#6b5200", bg: "rgba(255,176,32,.18)", dot: "#ffb020" },
};

export default function CmsStatusChip({ status }: { status: CmsStatus }) {
  const style = STYLES[status];
  return (
    <Chip
      size="small"
      label={style.label}
      sx={{
        height: 24,
        fontSize: 12,
        fontWeight: 600,
        color: style.color,
        bgcolor: style.bg,
        "&::before": { content: '""', width: 6, height: 6, ml: 1, borderRadius: "50%", bgcolor: style.dot },
      }}
    />
  );
}
