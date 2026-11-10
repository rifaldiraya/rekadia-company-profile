import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { TimePickerProps, TimePicker } from "@mui/x-date-pickers-pro";
import { FormHelperText, InputLabel } from "@mui/material";
import CoreFormControl from "./core-form-control";
import { CoreTextFieldProps } from "./core-textfield";

export interface CoreTimePickerProps
  extends
    Omit<CoreTextFieldProps, "type" | "onChange" | "placeholder" | "value">,
    Pick<TimePickerProps, "onChange"> {
  value: Date;
}

export function CoreTimePicker({
  name,
  value,
  label,
  fullWidth,
  required,
  disabled,
  error,
  ...props
}: CoreTimePickerProps) {
  return (
    <CoreFormControl fullWidth={fullWidth}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <TimePicker
          slotProps={{
            textField: { required, fullWidth },
          }}
          format="hh:mm a"
          ampm
          name={name}
          value={dayjs(value)}
          {...(props as any)}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </LocalizationProvider>
    </CoreFormControl>
  );
}
