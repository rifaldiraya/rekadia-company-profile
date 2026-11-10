import { ArrowDropDownRounded } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { FormControlProps } from "@mui/material/FormControl";
import { InputLabelProps } from "@mui/material/InputLabel";
import { SelectProps } from "@mui/material/Select";
import { ReactNode } from "react";
import CoreFormControl from "./core-form-control";

function IconComponent({ loading }: { loading: boolean }) {
  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={16} />
    </Box>
  ) : (
    <ArrowDropDownRounded />
  );
}

export type CoreSelectProps = Omit<SelectProps, "error"> & {
  loading?: boolean;
  children: ReactNode;
  _formControl?: Omit<FormControlProps, "fullWidth">;
  _inputLabel?: Omit<InputLabelProps, "required" | "size">;
  fullWidth?: boolean;
  size?: "small" | "normal";
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
};

function Select({
  label,
  size,
  children,
  fullWidth,
  required,
  loading,
  _formControl,
  _inputLabel,
  disabled,
  placeholder,
  ...props
}: CoreSelectProps) {
  return (
    <CoreFormControl fullWidth={fullWidth} {..._formControl}>
      {label && (
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            color: ({ palette }) => palette.text.primary,
            ..._inputLabel?.sx,
          }}
          shrink
          required={required}
          size="small"
          {..._inputLabel}
        >
          {label}
        </InputLabel>
      )}
      <MuiSelect
        disabled={disabled || loading}
        size={size}
        required={required}
        IconComponent={() => <IconComponent loading={!!loading} />}
        fullWidth={fullWidth}
        error={!!props.error as any}
        variant="outlined"
        {...props}
      >
        {children || <MenuItem disabled>No Data</MenuItem>}
      </MuiSelect>
      {props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </CoreFormControl>
  );
}

export const CoreSelect = Object.assign(Select, { Item: MenuItem });
