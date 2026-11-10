import { InputBase } from "@mui/material";
import { styled } from '@mui/material/styles'
import coreInputStyle from "./core-input-style";

const CoreInput = styled(InputBase)(({ theme, fullWidth }) => ({
  "& .MuiInputBase-input": {
    ...coreInputStyle(theme, { fullWidth }),
  },
}));

export default CoreInput;
