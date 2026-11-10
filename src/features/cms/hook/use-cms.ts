import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { cmsApi } from "@/features/cms/services/cms-api";
import { createCmsSeed } from "@/features/cms/data/cms-seed";
import { CMS_RESOURCES } from "@/features/cms/config/cms-resources";
import type { CmsCollectionSummary, CmsItemInput, CmsListParams, CmsStatus } from "@/features/cms/types/cms";

const CMS_KEY = ["cms"] as const;

const SEED = createCmsSeed();

const SEED_SUMMARY: CmsCollectionSummary[] = CMS_RESOURCES.map((resource) => ({
  slug: resource.slug,
  name: resource.name,
  group: resource.group,
  itemCount: SEED.items[resource.slug]?.length ?? 0,
  updatedAt: null,
}));

export const useCmsCollections = () =>
  useQuery({ queryKey: [...CMS_KEY, "collections"], queryFn: cmsApi.collections, initialData: SEED_SUMMARY, initialDataUpdatedAt: 0 });

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

/** Every item of a resource, for reference pickers and lookups (e.g. news categories). */
export const useCmsOptions = (resource: string | undefined) =>
  useQuery({
    queryKey: [...CMS_KEY, resource, "options"],
    queryFn: () => cmsApi.list(resource!, { pageSize: 1000, sort: "order" }),
    enabled: !!resource,
    select: (result) => result.items,
  });

export const useCmsMedia = () => useQuery({ queryKey: [...CMS_KEY, "media"], queryFn: cmsApi.media });

const useUsername = () => {
  const { data } = useSession();
  return data?.user?.username ?? "admin";
};

const useInvalidateCms = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: CMS_KEY });
};

export const useSaveCmsItem = (resource: string, id?: string) => {
  const username = useUsername();
  const invalidate = useInvalidateCms();
  return useMutation({
    mutationFn: (input: CmsItemInput) =>
      id ? cmsApi.update(resource, id, input, username) : cmsApi.create(resource, input, username),
    onSuccess: invalidate,
  });
};

export const useSetCmsStatus = (resource: string) => {
  const username = useUsername();
  const invalidate = useInvalidateCms();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CmsStatus }) => cmsApi.setStatus(resource, id, status, username),
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

export const useResetCmsData = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: cmsApi.reset, onSuccess: () => queryClient.resetQueries({ queryKey: CMS_KEY }) });
};
