import { forwardRef } from "react";
import { FormHelperText, InputLabel, TextField, TextFieldProps } from "@mui/material";
import CoreFormControl from "./core-form-control";

export type CoreTextFieldProps = Omit<TextFieldProps, 'error'> & {
  error?: string;
};

const CoreTextField = forwardRef<unknown, CoreTextFieldProps>(
  (
    {
      fullWidth,
      label,
      disabled,
      required,
      error,
      ...props
    },
    ref,
  ) => (
      <CoreFormControl ref={ref} fullWidth={fullWidth}>
        {label && (
          <InputLabel
            disabled={disabled}
            required={required}
            className="CoreTextField-label"
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
        <TextField 
          size="small"
          fullWidth={fullWidth}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </CoreFormControl>
    ),
);

CoreTextField.displayName = "CoreTextField";

export default CoreTextField;
