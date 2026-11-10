import { MainLayoutHeader } from "@/components/layout";
import { Box } from "@mui/material";
import CmsCollectionList from "@/features/dashboard/components/cms-collection-list";
import CmsOverviewHero from "@/features/dashboard/components/cms-overview-hero";

export default async function DashboardPage() {
  return (
    <Box>
      <MainLayoutHeader
        title="Collections"
        breadcrumbs={[
          {
            href: '/dashboard',
            label: 'Dashboard'
          }
        ]}
      />
      <CmsOverviewHero />
      <CmsCollectionList />
    </Box>
  );
}
