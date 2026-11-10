import { CMS_RESOURCES } from "@/features/cms/config/cms-resources";
import { createCmsSeed } from "@/features/cms/data/cms-seed";
import type { CmsCollectionSummary, CmsResourceGroup } from "@/features/cms/types/cms";

export type CmsCollectionGroup = CmsResourceGroup;

export const CMS_COLLECTION_GROUPS: CmsCollectionGroup[] = ["Content", "Clients", "Testimonials"];

const SEED = createCmsSeed();

/** Collections from docs/API_CONTRACT.md with their dummy item counts. */
export const CMS_COLLECTIONS: CmsCollectionSummary[] = CMS_RESOURCES.map((resource) => ({
  slug: resource.slug,
  name: resource.name,
  group: resource.group,
  itemCount: SEED.items[resource.slug]?.length ?? 0,
  updatedAt: null,
}));

export const CMS_TOTAL_ITEMS = CMS_COLLECTIONS.reduce((total, collection) => total + collection.itemCount, 0);
