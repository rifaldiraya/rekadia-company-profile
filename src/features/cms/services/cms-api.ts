import { getSession, signOut } from "next-auth/react";
import { ROUTES } from "@/config/route";
import { getCmsResource } from "@/features/cms/config/cms-resources";
import type {
  CmsCollectionSummary,
  CmsFieldType,
  CmsItem,
  CmsItemInput,
  CmsListParams,
  CmsListResult,
  CmsMedia,
  CmsPage,
  CmsStatus,
} from "@/features/cms/types/cms";
import { apiRequest } from "@/services/api-client";
import { API_ENDPOINTS, API_MAX_PAGE_SIZE } from "@/services/api-config";
import { isApiError } from "@/services/api-error";

type RequestOptions = NonNullable<Parameters<typeof apiRequest>[1]>;

/** Calls the CMS API with the signed-in user's token; an expired session goes back to sign-in. */
const cmsRequest = async <T>(path: string, options: RequestOptions = {}) => {
  const session = await getSession();
  try {
    return await apiRequest<T>(path, {
      ...options,
      headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : undefined,
    });
  } catch (error) {
    if (isApiError(error) && error.status === 401) {
      await signOut({ callbackUrl: ROUTES.SIGN_IN });
    }
    throw error;
  }
};

const toQuery = ({ filters, ...params }: CmsListParams) => {
  const query = new URLSearchParams();
  Object.entries({ ...params, ...filters }).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const text = query.toString();
  return text ? `?${text}` : "";
};

/** Optional ids, dates and links must be sent as `null` instead of an empty string. */
const NULL_WHEN_EMPTY: CmsFieldType[] = ["media", "reference", "date", "url", "email"];

const toPayload = (resource: string, input: CmsItemInput) => {
  const fields = getCmsResource(resource)?.fields ?? [];
  return Object.fromEntries(
    Object.entries(input).map(([name, value]) => {
      const field = fields.find((item) => item.name === name);
      return [name, field && NULL_WHEN_EMPTY.includes(field.type) && value === "" ? null : value];
    }),
  );
};

const itemPath = (resource: string, id: string) => `${API_ENDPOINTS.cmsResource(resource)}/${id}`;

export const cmsApi = {
  collections: () => cmsRequest<CmsCollectionSummary[]>(API_ENDPOINTS.cmsCollections),
  list: (resource: string, params: CmsListParams) =>
    cmsRequest<CmsListResult>(`${API_ENDPOINTS.cmsResource(resource)}${toQuery(params)}`),
  get: (resource: string, id: string) => cmsRequest<CmsItem>(itemPath(resource, id)),
  create: (resource: string, input: CmsItemInput) =>
    cmsRequest<CmsItem>(API_ENDPOINTS.cmsResource(resource), { method: "POST", body: toPayload(resource, input) }),
  update: (resource: string, id: string, input: CmsItemInput) =>
    cmsRequest<CmsItem>(itemPath(resource, id), { method: "PUT", body: toPayload(resource, input) }),
  setStatus: (resource: string, id: string, status: CmsStatus) =>
    cmsRequest<void>(`${itemPath(resource, id)}/status`, { method: "PATCH", body: { status } }),
  remove: (resource: string, id: string) => cmsRequest<void>(itemPath(resource, id), { method: "DELETE" }),
  media: async () =>
    (await cmsRequest<CmsPage<CmsMedia>>(`${API_ENDPOINTS.cmsMedia}?pageSize=${API_MAX_PAGE_SIZE}`)).items,
  uploadMedia: (file: File, alt: string) => {
    const form = new FormData();
    form.append("file", file);
    form.append("alt", alt);
    return cmsRequest<CmsMedia>(API_ENDPOINTS.cmsMedia, { method: "POST", body: form });
  },
};
