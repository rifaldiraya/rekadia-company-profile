import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { PropsWithChildren } from "react";

interface ItemProps {
  label: string;
  value: unknown;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
}

function Item({ labelPlacement = "end", label, value }: ItemProps) {
  return (
    <FormControlLabel
      value={value}
      control={<Checkbox />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
}

interface ComponentProps extends PropsWithChildren, FormControlProps {
  label: string;
}

function Component({ children, label, ...props }: ComponentProps) {
  return (
    <FormControl component="fieldset" {...props}>
      <FormLabel
        component="legend"
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          color: ({ palette }) => palette.text.primary,
        }}
      >
        {label}
      </FormLabel>
      <FormGroup sx={{ py: "6px" }} aria-label="position" row>
        {children}
      </FormGroup>
    </FormControl>
  );
}

const CoreCheckboxGroupField = Object.assign(Component, {
  Item,
});

export default CoreCheckboxGroupField;
