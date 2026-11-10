import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface ItemProps {
  label: string;
  value: unknown;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
}

const Ctx = createContext({
  selected: ''
})

function Item({ labelPlacement = "end", label, value }: ItemProps) {
  const { selected } = useContext(Ctx)
  
  return (
    <FormControlLabel
      value={value}
      control={<Radio checked={selected === value} />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
}

export interface CoreRadioGroupFieldProps
  extends PropsWithChildren,
    Omit<FormControlProps, "onChange"> {
  label: string;
  name: string;
  onChange?: RadioGroupProps["onChange"];
  value?: RadioGroupProps["value"];
}

function Component({
  children,
  label,
  name,
  onChange,
  value,
  ...props
}: CoreRadioGroupFieldProps) {
  const selected = useMemo(() => value ,[value])
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Ctx.Provider value={{ selected }}>
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
        <RadioGroup
          onChange={onChange}
          name={name}
          aria-label="position"
          sx={{ py: "6px" }}
          row
          value={value}
        >
          {children}
        </RadioGroup>
      </FormControl>
    </Ctx.Provider>
  );
}

const CoreRadioGroupField = Object.assign(Component, {
  Item,
});

export default CoreRadioGroupField;
