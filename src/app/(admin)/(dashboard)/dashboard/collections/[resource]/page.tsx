import { Metadata } from "next";
import { notFound } from "next/navigation";
import { APP_NAME } from "@/constants";
import { getCmsResource } from "@/features/cms/config/cms-resources";
import CmsCollectionPage from "@/features/cms/components/cms-collection-page";

interface PageProps {
  params: Promise<{ resource: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resource = getCmsResource((await params).resource);
  return { title: `${resource?.name ?? "Collection"} - ${APP_NAME}` };
}

export default async function Page({ params }: PageProps) {
  const { resource } = await params;
  if (!getCmsResource(resource)) notFound();
  return <CmsCollectionPage resourceSlug={resource} />;
}
