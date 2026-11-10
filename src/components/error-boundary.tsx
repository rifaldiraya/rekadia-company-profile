import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Box
          sx={{
            width: "100%",
            py: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src="/ilustration/warning.svg"
            alt="warning"
            width={100}
            height={100}
          />
          <Typography
            sx={{ maxWidth: 450, width: "100%" }}
            textAlign="center"
            fontWeight={600}
            mt={2}
          >
            Oops! Something went wrong, looks like things aren&apos;t working
            quite right.
          </Typography>
        </Box>
      );
    }

    const { children } = this.props;

    return children;
  }
}
