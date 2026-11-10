import { Theme } from "@mui/material";

interface CoreInputStyleProps {
  fullWidth?: boolean;
}

const coreInputStyle = (theme: Theme, { fullWidth }: CoreInputStyleProps) => ({
  position: "relative",
  fontSize: 16,
  width: fullWidth ? "100%" : "auto",
  padding: "0px",
});

export default coreInputStyle;
