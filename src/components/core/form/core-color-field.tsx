"use client";

import {
  Box,
  ButtonBase,
  FormControl,
  FormHelperText,
  InputLabel,
  Menu,
  Typography,
} from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useState } from "react";
import { ColorChangeHandler, SketchPicker } from "react-color";
import coreInputStyle from "./core-input-style";

export interface CoreColorFieldProps {
  label?: string;
  fullWidth?: boolean;
  error?: string;
  value?: string;
  onChange?: ColorChangeHandler;
}

export default function CoreColorField({
  label,
  fullWidth,
  error,
  value,
  onChange,
}: CoreColorFieldProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth={fullWidth}>
        {label && (
          <InputLabel
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              color: ({ palette }) => palette.text.primary,
            }}
            shrink
          >
            {label}
          </InputLabel>
        )}
        <ButtonBase
          sx={{
            mt: theme.spacing(3),
            justifyContent: "flex-start",
            border: "1px solid",
            borderColor: ({ palette }) =>
              palette.mode === "light" ? "#E5E5F0" : "#2D3843",
            borderRadius: ({ shape }) => `${shape.borderRadius}px`,
            ...coreInputStyle(theme, { fullWidth }),
            padding: "10px 12px",
          }}
          onClick={handleClick}
        >
          <Box
            width="20px"
            height="20px"
            sx={{
              backgroundColor: value,
              mr: "10px",
              border: ({ palette }) => `1px solid ${value || palette.divider}`,
            }}
          />
          <Typography
            sx={{
              color: ({ palette }) =>
                value ? palette.text.primary : palette.text.secondary,
              fontSize: "16px",
            }}
          >
            {value || "Choose color..."}
          </Typography>
        </ButtonBase>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
      <Menu onClose={handleClose} anchorEl={anchorEl} open={open}>
        <SketchPicker
          styles={{
            default: {
              picker: {
                boxShadow: "none",
              },
            },
          }}
          color={value}
          onChange={onChange}
        />
      </Menu>
    </>
  );
}
