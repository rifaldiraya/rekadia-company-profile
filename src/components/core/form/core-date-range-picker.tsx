import dayjs from "dayjs";
import CoreTextField, {
  CoreTextFieldProps,
} from "@/components/core/form/core-textfield";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DateRangePicker, DateRangePickerProps } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import CoreInput from "@/components/core/form/core-input";

export interface CoreDateRangePickerProps
  extends
    Omit<CoreTextFieldProps, "type" | "onChange" | "placeholder" | "value">,
    Pick<DateRangePickerProps, "onChange"> {
  value: [Date, Date];
}

export function CoreDateRangePicker({
  InputProps,
  error,
  fullWidth,
  label,
  name,
  multiline,
  rows,
  onChange,
  value,
  ...props
}: CoreDateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        slots={{
          textField: ([textFieldProps]) => (
            <CoreTextField
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
                ...InputProps,
              }}
              enableAccessibleFieldDOMStructure
              multiline={multiline}
              rows={rows}
              error={error}
              fullWidth={fullWidth}
            />
          ),
          field: CoreInput,
        }}
        format="DD MMMM YYYY"
        name={name}
        label={label}
        onChange={onChange}
        value={[dayjs(value[0]), dayjs(value[1])]}
        {...(props as any)}
      />
    </LocalizationProvider>
  );
}
