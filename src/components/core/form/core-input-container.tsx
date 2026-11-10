import { Box, BoxProps } from "@mui/material";

export default function CoreInputContainer({ children, ...props }: BoxProps) {
  return (
    <Box
      className="CoreTextField-inputWrapper"
      {...props}
      sx={{
        padding: "10px 12px",
        border: "1px solid",
        borderColor: ({ palette }) =>
          palette.mode === "light" ? "#E5E5F0" : "#2D3843",
        borderRadius: ({ shape }) => `${shape.borderRadius}px`,
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
