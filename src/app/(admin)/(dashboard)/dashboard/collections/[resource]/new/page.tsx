import { Metadata } from "next";
import { notFound } from "next/navigation";
import { APP_NAME } from "@/constants";
import { getCmsResource } from "@/features/cms/config/cms-resources";
import CmsItemFormPage from "@/features/cms/components/cms-item-form-page";

interface PageProps {
  params: Promise<{ resource: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resource = getCmsResource((await params).resource);
  return { title: `New ${resource?.singular.toLowerCase() ?? "item"} - ${APP_NAME}` };
}

export default async function Page({ params }: PageProps) {
  const { resource } = await params;
  if (!getCmsResource(resource)) notFound();
  return <CmsItemFormPage resourceSlug={resource} />;
}
