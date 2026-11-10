import { MainLayoutHeader } from "@/components/layout";
import { Box } from "@mui/material";

export default async function DashboardPage() {
  return (
    <Box>
      <MainLayoutHeader
        title="Dashboard"
        breadcrumbs={[
          {
            href: '/dashboard',
            label: 'Dashboard'
          }
        ]}
      />
    </Box>
  );
}
