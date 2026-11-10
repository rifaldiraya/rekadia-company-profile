export const CMS_CARD_SX = {
  borderRadius: 4,
  border: "1px solid #e3eaef",
  bgcolor: "white",
} as const;

export const CMS_INPUT_SX = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    bgcolor: "#f8fafb",
    "&.Mui-focused": { bgcolor: "white", boxShadow: "0 0 0 4px rgba(37,193,218,.15)" },
  },
} as const;

export const CMS_GRADIENT_BUTTON_SX = {
  borderRadius: 2.5,
  px: 2.5,
  backgroundImage: "linear-gradient(90deg, #006876, #00c2dc)",
  boxShadow: "0 10px 20px -12px rgba(0,104,118,.8)",
  "&:hover": { boxShadow: "0 14px 24px -12px rgba(0,104,118,.9)" },
} as const;
