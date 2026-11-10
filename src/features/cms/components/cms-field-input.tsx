"use client";

import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { CheckRounded, ImageOutlined, LinkRounded, MailOutlineRounded } from "@mui/icons-material";
import CmsMediaPicker from "@/features/cms/components/cms-media-picker";
import CmsMediaThumb from "@/features/cms/components/cms-media-thumb";
import { CMS_INPUT_SX } from "@/features/cms/components/cms-styles";
import { getCmsResource } from "@/features/cms/config/cms-resources";
import { useCmsMedia, useCmsOptions } from "@/features/cms/hook/use-cms";
import type { CmsField, CmsItemInput } from "@/features/cms/types/cms";

interface CmsFieldInputProps {
  field: CmsField;
  control: Control<CmsItemInput>;
  required: boolean;
  onSlugEdited?: () => void;
}

const labelOf = (field: CmsField, required: boolean) => (required ? `${field.label} *` : field.label);

function HtmlField({ value, onChange, error, label, helperText }: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label: string;
  helperText?: string;
}) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: error ? "error.main" : "#22272f" }}>{label}</Typography>
        <Tabs
          value={tab}
          onChange={(_, next) => setTab(next)}
          sx={{ minHeight: 32, "& .MuiTab-root": { minHeight: 32, py: 0.5, px: 1.5, fontSize: 13, textTransform: "none" } }}
        >
          <Tab value="write" label="Write" />
          <Tab value="preview" label="Preview" />
        </Tabs>
      </Stack>
      {tab === "write" ? (
        <TextField
          fullWidth
          multiline
          minRows={8}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          error={!!error}
          placeholder="<p>Write the content here. HTML tags such as <strong>, <ul>, <h2> are supported.</p>"
          sx={{ ...CMS_INPUT_SX, "& textarea": { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 } }}
        />
      ) : (
        <Box
          component="iframe"
          title={`${label} preview`}
          sandbox=""
          srcDoc={`<style>body{font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#22272f;margin:16px}</style>${value}`}
          sx={{ width: "100%", minHeight: 220, border: "1px solid #e3eaef", borderRadius: 2.5, bgcolor: "white" }}
        />
      )}
      <FormHelperText error={!!error}>{error ?? helperText}</FormHelperText>
    </Box>
  );
}

function MediaField({ value, onChange, error, label, helperText }: {
  value: string | null;
  onChange: (value: string | null) => void;
  error?: string;
  label: string;
  helperText?: string;
}) {
  const [open, setOpen] = useState(false);
  const { data: media = [] } = useCmsMedia();
  const current = media.find((item) => item.id === value);

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: error ? "error.main" : "#22272f", mb: 1 }}>{label}</Typography>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: error ? "error.main" : "#cfdbe2",
          bgcolor: "#f8fafb",
        }}
      >
        {current ? (
          <CmsMediaThumb media={current} width="100%" height={140} />
        ) : (
          <Stack alignItems="center" justifyContent="center" sx={{ height: 100, color: "#8595ab" }}>
            <ImageOutlined />
            <Typography sx={{ fontSize: 12, mt: 0.5 }}>No image selected</Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          <Button size="small" variant="outlined" onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
            {current ? "Change" : "Choose image"}
          </Button>
          {current && (
            <Button size="small" color="inherit" onClick={() => onChange(null)} sx={{ borderRadius: 2, color: "#667991" }}>
              Remove
            </Button>
          )}
        </Stack>
      </Box>
      <FormHelperText error={!!error}>{error ?? helperText}</FormHelperText>
      <CmsMediaPicker
        open={open}
        value={value}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          onChange(id);
          setOpen(false);
        }}
      />
    </Box>
  );
}

function ReferenceField({ field, value, onChange, onBlur, error, required }: {
  field: CmsField;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  required: boolean;
}) {
  const target = field.reference ? getCmsResource(field.reference) : undefined;
  const { data: options = [], isLoading } = useCmsOptions(field.reference);
  return (
    <TextField
      select
      fullWidth
      label={labelOf(field, required)}
      value={isLoading ? "" : value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      error={!!error}
      helperText={error ?? field.helperText}
      sx={CMS_INPUT_SX}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {String(option[target?.titleField ?? "name"] ?? option.id)}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default function CmsFieldInput({ field, control, required, onSlugEdited }: CmsFieldInputProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: input, fieldState }) => {
        const error = fieldState.error?.message;
        const label = labelOf(field, required);

        switch (field.type) {
          case "html":
            return (
              <HtmlField
                label={label}
                value={String(input.value ?? "")}
                onChange={input.onChange}
                error={error}
                helperText={field.helperText}
              />
            );
          case "media":
            return (
              <MediaField
                label={label}
                value={(input.value as string | null) ?? null}
                onChange={input.onChange}
                error={error}
                helperText={field.helperText}
              />
            );
          case "reference":
            return (
              <ReferenceField
                field={field}
                value={String(input.value ?? "")}
                onChange={input.onChange}
                onBlur={input.onBlur}
                error={error}
                required={required}
              />
            );
          case "boolean":
            return (
              <FormControlLabel
                control={<Switch checked={!!input.value} onChange={(event) => input.onChange(event.target.checked)} />}
                label={<Typography sx={{ fontSize: 14, fontWeight: 600 }}>{field.label}</Typography>}
              />
            );
          case "multiselect": {
            const selected = Array.isArray(input.value) ? input.value : [];
            const toggle = (value: string) =>
              input.onChange(selected.includes(value) ? selected.filter((entry) => entry !== value) : [...selected, value]);
            return (
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: error ? "error.main" : "#22272f", mb: 1 }}>
                  {label}
                </Typography>
                <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                  {field.options?.map((option) => {
                    const active = selected.includes(option.value);
                    return (
                      <Chip
                        key={option.value}
                        label={option.label}
                        onClick={() => toggle(option.value)}
                        aria-pressed={active}
                        icon={active ? <CheckRounded /> : undefined}
                        sx={{
                          fontWeight: 600,
                          color: active ? "white" : "#516178",
                          background: active ? "linear-gradient(90deg, #006876, #00c2dc)" : "#f1f5f7",
                          "& .MuiChip-icon": { color: "white" },
                          "&:hover": { background: active ? "linear-gradient(90deg, #006876, #00c2dc)" : "#e3eef2" },
                        }}
                      />
                    );
                  })}
                </Stack>
                <FormHelperText error={!!error}>{error ?? field.helperText}</FormHelperText>
              </Box>
            );
          }
          case "select":
            return (
              <TextField
                select
                fullWidth
                label={label}
                value={input.value ?? ""}
                onChange={input.onChange}
                onBlur={input.onBlur}
                error={!!error}
                helperText={error ?? field.helperText}
                sx={CMS_INPUT_SX}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          default: {
            const value = String(input.value ?? "");
            const counter = field.maxLength && field.type !== "slug" ? `${value.length}/${field.maxLength}` : undefined;
            return (
              <TextField
                fullWidth
                name={input.name}
                inputRef={input.ref}
                label={label}
                value={value}
                onChange={(event) => {
                  input.onChange(event.target.value);
                  if (field.type === "slug") onSlugEdited?.();
                }}
                onBlur={input.onBlur}
                type={field.type === "date" ? "date" : field.type === "email" ? "email" : "text"}
                multiline={field.type === "textarea"}
                minRows={field.type === "textarea" ? 3 : undefined}
                error={!!error}
                helperText={
                  <Box component="span" sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <span>{error ?? field.helperText}</span>
                    {counter && <span>{counter}</span>}
                  </Box>
                }
                sx={CMS_INPUT_SX}
                slotProps={{
                  inputLabel: field.type === "date" ? { shrink: true } : undefined,
                  input: {
                    startAdornment:
                      field.type === "url" ? (
                        <InputAdornment position="start">
                          <LinkRounded sx={{ color: "#8595ab" }} />
                        </InputAdornment>
                      ) : field.type === "email" ? (
                        <InputAdornment position="start">
                          <MailOutlineRounded sx={{ color: "#8595ab" }} />
                        </InputAdornment>
                      ) : field.type === "slug" ? (
                        <InputAdornment position="start">
                          <Typography sx={{ fontSize: 13, color: "#8595ab" }}>/</Typography>
                        </InputAdornment>
                      ) : undefined,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
}
