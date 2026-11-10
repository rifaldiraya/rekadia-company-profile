/** Shapes from docs/API_CONTRACT.md. */
export type CmsStatus = "draft" | "published";

export type CmsResourceGroup = "Content" | "Clients" | "Testimonials";

export interface CmsMedia {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  mimeType: string;
  size: number;
}

export type CmsFieldValue = string | number | boolean | string[] | null;

export interface CmsItem {
  id: string;
  status: CmsStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  [field: string]: CmsFieldValue;
}

export type CmsItemInput = Record<string, CmsFieldValue>;

export interface CmsListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: CmsStatus;
  sort?: string;
  filters?: Record<string, string>;
}

export interface CmsListResult {
  items: CmsItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface CmsCollectionSummary {
  slug: string;
  name: string;
  group: CmsResourceGroup;
  itemCount: number;
  updatedAt: string | null;
}

export type CmsFieldType =
  | "text"
  | "slug"
  | "textarea"
  | "html"
  | "url"
  | "email"
  | "date"
  | "boolean"
  | "select"
  | "multiselect"
  | "reference"
  | "media";

export interface CmsFieldOption {
  value: string;
  label: string;
}

export interface CmsFieldCondition {
  field: string;
  equals: string;
}

export interface CmsField {
  /** Request property name, e.g. `coverImageId`. */
  name: string;
  label: string;
  type: CmsFieldType;
  required?: boolean;
  /** Required only while another field has a given value (e.g. `videoUrl` when `format = video`). */
  requiredWhen?: CmsFieldCondition;
  /** Hidden in the form unless the condition matches. */
  visibleWhen?: CmsFieldCondition;
  maxLength?: number;
  options?: CmsFieldOption[];
  /** For `reference` fields: resource slug to pick from. */
  reference?: string;
  /** For `slug` fields: field the slug is generated from. */
  slugFrom?: string;
  helperText?: string;
  defaultValue?: CmsFieldValue;
  /** Shown in the sidebar column of the form instead of the main column. */
  placement?: "main" | "side";
}

export interface CmsColumn {
  field: string;
  label: string;
  kind?: "text" | "media" | "chip" | "chips" | "date" | "boolean" | "reference";
}

export interface CmsResource {
  slug: string;
  name: string;
  singular: string;
  group: CmsResourceGroup;
  description: string;
  /** Field shown as the item title in lists. */
  titleField: string;
  /** Default `sort` query value. */
  defaultSort: string;
  fields: CmsField[];
  columns: CmsColumn[];
  /** Select/reference fields offered as list filters. */
  filters: string[];
  /** Replaces the Webflow collections listed here (docs/API_CONTRACT.md §4.0). */
  replaces: string[];
  /** Each group needs at least one filled field, e.g. `applyUrl` or `applyEmail`. */
  requireOneOf?: string[][];
  pendingConfirmation?: boolean;
}
