import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cmsApi } from "@/features/cms/services/cms-api";
import type { CmsItemInput, CmsListParams, CmsStatus } from "@/features/cms/types/cms";
import { API_MAX_PAGE_SIZE } from "@/services/api-config";

const CMS_KEY = ["cms"] as const;

export const useCmsCollections = () => useQuery({ queryKey: [...CMS_KEY, "collections"], queryFn: cmsApi.collections });

export const useCmsList = (resource: string, params: CmsListParams) =>
  useQuery({
    queryKey: [...CMS_KEY, resource, "list", params],
    queryFn: () => cmsApi.list(resource, params),
    placeholderData: keepPreviousData,
  });

export const useCmsItem = (resource: string, id: string | undefined) =>
  useQuery({
    queryKey: [...CMS_KEY, resource, "item", id],
    queryFn: () => cmsApi.get(resource, id!),
    enabled: !!id,
    retry: false,
  });

/** Items of a resource for reference pickers and lookups (e.g. news categories). */
export const useCmsOptions = (resource: string | undefined) =>
  useQuery({
    queryKey: [...CMS_KEY, resource, "options"],
    queryFn: () => cmsApi.list(resource!, { pageSize: API_MAX_PAGE_SIZE, sort: "order" }),
    enabled: !!resource,
    select: (result) => result.items,
  });

export const useCmsMedia = () => useQuery({ queryKey: [...CMS_KEY, "media"], queryFn: cmsApi.media });

const useInvalidateCms = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: CMS_KEY });
};

export const useSaveCmsItem = (resource: string, id?: string) => {
  const invalidate = useInvalidateCms();
  return useMutation({
    mutationFn: (input: CmsItemInput) => (id ? cmsApi.update(resource, id, input) : cmsApi.create(resource, input)),
    onSuccess: invalidate,
  });
};

export const useSetCmsStatus = (resource: string) => {
  const invalidate = useInvalidateCms();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CmsStatus }) => cmsApi.setStatus(resource, id, status),
    onSuccess: invalidate,
  });
};

export const useDeleteCmsItem = (resource: string) => {
  const invalidate = useInvalidateCms();
  return useMutation({ mutationFn: (id: string) => cmsApi.remove(resource, id), onSuccess: invalidate });
};

export const useUploadCmsMedia = () => {
  const invalidate = useInvalidateCms();
  return useMutation({
    mutationFn: ({ file, alt }: { file: File; alt: string }) => cmsApi.uploadMedia(file, alt),
    onSuccess: invalidate,
  });
};
