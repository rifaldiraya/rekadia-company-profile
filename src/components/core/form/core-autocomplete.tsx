import { CoreTextField } from "@/components/core/form";
import { Autocomplete, AutocompleteProps, FormHelperText, InputLabel } from "@mui/material";
import CoreFormControl from "./core-form-control";

type Value = {
  label: string;
  value: string | number;
}

export type CoreAutocompleteProps = 
  Omit<AutocompleteProps<Value, boolean, boolean, boolean>, "error" | "onChange" | "renderInput"> & {
    label: string;
    required?: boolean;
    name: string;
    error?: string;
  }

export default function CoreAutocomplete({
  defaultValue,
  fullWidth,
  label,
  required,
  name,
  error,
  ...props
}: CoreAutocompleteProps) {
  
  return (
    <CoreFormControl fullWidth={fullWidth}>
        {label && (
          <InputLabel
            disabled={props.disabled}
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
        <Autocomplete
          // isOptionEqualToValue={(option, newValue) => option.value === newValue.value}
          size="small"
          renderInput={(params) => <CoreTextField {...params} name={name} />}
          {...props}
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </CoreFormControl>
  );
}
