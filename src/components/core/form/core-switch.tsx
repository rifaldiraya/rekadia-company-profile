import { FormHelperText, InputLabel, Stack, Switch, SwitchProps, Typography } from "@mui/material";
import { forwardRef } from "react";
import CoreFormControl from "./core-form-control";

export type CoreSwitchFieldProps = Omit<SwitchProps, 'error'> & {
  error?: string;
  labelOn?: string;
  labelOff?: string;
  label?: string;
};

const CoreSwitchField = forwardRef<unknown, CoreSwitchFieldProps>(
  (
    {
      label,
      disabled,
      required,
      error,
      labelOn,
      labelOff,
      ...props
    },
    ref,
  ) => (
      <CoreFormControl ref={ref} fullWidth>
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
        <Stack mt={-1} direction="row" gap={1} alignItems="center">
          <Typography fontSize="small">{labelOff}</Typography>
          <Switch required={required} {...props} />
          <Typography fontSize="small">{labelOn}</Typography>
        </Stack>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </CoreFormControl>
    ),
);

CoreSwitchField.displayName = "CoreSwitchField";

export default CoreSwitchField;
