import dayjs from "dayjs";
import { FormHelperText, InputLabel } from "@mui/material";
import { CoreTextFieldProps } from "@/components/core/form/core-textfield";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import CoreFormControl from "./core-form-control";

export interface CoreDatePickerProps
  extends
    Omit<CoreTextFieldProps, "type" | "onChange" | "placeholder" | "value">,
    Pick<DatePickerProps, "onChange"> {
  value: Date;
  format: DatePickerProps["format"];
}

export function CoreDatePicker({
  error,
  label,
  name,
  value,
  disabled,
  size,
  required,
  defaultValue,
  format,
  fullWidth,
  ...props
}: CoreDatePickerProps) {
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
        <DatePicker
          slotProps={{
            textField: { required, fullWidth, size },
          }}
          disabled={disabled}
          format={format}
          name={name}
          value={dayjs(value)}
          defaultValue={defaultValue ? dayjs(defaultValue as Date) : undefined}
          {...(props as any)}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </LocalizationProvider>
    </CoreFormControl>
  );
}
