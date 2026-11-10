import { alpha, Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CoreFormControlProps extends BoxProps {
  fullWidth?: boolean;
}

const CoreFormControl = styled(Box)<CoreFormControlProps>(
  ({ theme: { palette, transitions }, fullWidth }) => ({
    width: fullWidth ? "100%" : "auto",
    ".CoreTextField-inputWrapper": {
      color: palette.primary.main,
      transition: transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
    ":focus-within": {
      ".CoreTextField-label": {
        color: palette.primary.main,
      },
      ".CoreTextField-inputWrapper": {
        boxShadow: `${alpha(palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: palette.primary.main,
      },
    },
  }),
);

export default CoreFormControl;
