import { CMS_RESOURCES } from "@/features/cms/config/cms-resources";
import type { CmsResourceGroup } from "@/features/cms/types/cms";

export type CmsCollectionGroup = CmsResourceGroup;

export const CMS_COLLECTION_GROUPS: CmsCollectionGroup[] = ["Content", "Clients", "Testimonials"];

/** Collections served by the CMS API, for screens shown before sign-in. */
export const CMS_COLLECTIONS = CMS_RESOURCES.map(({ slug, name, group }) => ({ slug, name, group }));
