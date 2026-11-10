import { QueryClient } from "@tanstack/react-query";

const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default queryClientConfig;
