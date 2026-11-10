"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircleRounded, CloseRounded, CloudUploadOutlined, SearchRounded } from "@mui/icons-material";
import { useCmsMedia, useUploadCmsMedia } from "@/features/cms/hook/use-cms";
import { CMS_GRADIENT_BUTTON_SX, CMS_INPUT_SX } from "@/features/cms/components/cms-styles";
import { getErrorMessage } from "@/services/api-error";

interface CmsMediaPickerProps {
  open: boolean;
  value: string | null;
  onClose: () => void;
  onSelect: (mediaId: string) => void;
}

const ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";

export default function CmsMediaPicker({ open, value, onClose, onSelect }: CmsMediaPickerProps) {
  const { data: media = [], isLoading } = useCmsMedia();
  const upload = useUploadCmsMedia();
  const fileRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(value);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return media;
    return media.filter((item) => `${item.alt} ${item.url.split("/").pop()}`.toLowerCase().includes(keyword));
  }, [media, query]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const created = await upload.mutateAsync({ file, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") });
      setSelected(created.id);
      enqueueSnackbar("Image uploaded.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error, "Upload failed."), { variant: "error" });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{ paper: { sx: { borderRadius: 4 } }, transition: { onEnter: () => setSelected(value) } }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 700 }}>
        Media library
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search images..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={CMS_INPUT_SX}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: "#8595ab" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUploadOutlined />}
            loading={upload.isPending}
            onClick={() => fileRef.current?.click()}
            sx={{ flexShrink: 0, borderRadius: 2.5 }}
          >
            Upload image
          </Button>
          <input ref={fileRef} type="file" accept={ACCEPT} hidden onChange={handleUpload} />
        </Stack>
        <Typography sx={{ fontSize: 12, color: "#8595ab", mb: 1.5 }}>
          PNG, JPG, WEBP or SVG. Dummy uploads are stored in this browser only (max 1 MB).
        </Typography>

        {isLoading ? (
          <Typography color="text.secondary">Loading media...</Typography>
        ) : (
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
            {filtered.map((item) => {
              const isSelected = item.id === selected;
              return (
                <ButtonBase
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  onDoubleClick={() => onSelect(item.id)}
                  aria-pressed={isSelected}
                  aria-label={item.alt || item.url.split("/").pop()}
                  sx={{
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "stretch",
                    p: 0.75,
                    borderRadius: 2.5,
                    border: "2px solid",
                    borderColor: isSelected ? "#25c1da" : "transparent",
                    bgcolor: isSelected ? "rgba(37,193,218,.08)" : "transparent",
                    "&:hover": { bgcolor: "#f1f5f7" },
                  }}
                >
                  <Box
                    component="img"
                    src={item.url}
                    alt=""
                    sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "contain", borderRadius: 1.5, bgcolor: "#f1f5f7" }}
                  />
                  <Typography noWrap sx={{ mt: 0.75, fontSize: 11, color: "#516178", textAlign: "left" }}>
                    {item.alt || item.url.split("/").pop()}
                  </Typography>
                  {isSelected && (
                    <CheckCircleRounded sx={{ position: "absolute", top: 8, right: 8, color: "#25c1da", bgcolor: "white", borderRadius: "50%" }} />
                  )}
                </ButtonBase>
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          sx={CMS_GRADIENT_BUTTON_SX}
        >
          Use image
        </Button>
      </DialogActions>
    </Dialog>
  );
}
