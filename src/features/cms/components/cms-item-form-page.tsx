"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBackRounded, DeleteOutlineRounded, ErrorOutlineRounded, SaveRounded } from "@mui/icons-material";
import { MainLayoutHeader } from "@/components/layout";
import useDialog from "@/hook/use-dialog";
import { getErrorMessage, isApiError } from "@/services/api-error";
import CmsFieldInput from "@/features/cms/components/cms-field-input";
import CmsStatusChip from "@/features/cms/components/cms-status-chip";
import { CMS_CARD_SX, CMS_GRADIENT_BUTTON_SX, CMS_INPUT_SX } from "@/features/cms/components/cms-styles";
import { CMS_ROUTES, getCmsResource } from "@/features/cms/config/cms-resources";
import { slugify } from "@/features/cms/data/cms-seed";
import { useCmsCollections, useCmsItem, useDeleteCmsItem, useSaveCmsItem } from "@/features/cms/hook/use-cms";
import { buildCmsSchema } from "@/features/cms/schema/build-cms-schema";
import type { CmsField, CmsFieldValue, CmsItem, CmsItemInput, CmsResource } from "@/features/cms/types/cms";

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const emptyValue = (field: CmsField): CmsFieldValue => {
  if (field.defaultValue !== undefined) return field.defaultValue;
  if (field.type === "multiselect") return [];
  if (field.type === "boolean") return false;
  if (field.type === "media" || field.type === "reference") return null;
  return "";
};

const buildDefaults = (resource: CmsResource, item: CmsItem | undefined, nextOrder: number): CmsItemInput => ({
  status: item?.status ?? "draft",
  order: item?.order ?? nextOrder,
  ...Object.fromEntries(resource.fields.map((field) => [field.name, item?.[field.name] ?? emptyValue(field)])),
});

function CmsItemForm({ resource, item }: { resource: CmsResource; item?: CmsItem }) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const { data: collections } = useCmsCollections();
  const save = useSaveCmsItem(resource.slug, item?.id);
  const remove = useDeleteCmsItem(resource.slug);
  const isEdit = !!item;

  const nextOrder = (collections.find((entry) => entry.slug === resource.slug)?.itemCount ?? 0) + 1;
  const schema = useMemo(() => buildCmsSchema(resource), [resource]);
  const defaultValues = useMemo(() => buildDefaults(resource, item, nextOrder), [resource, item, nextOrder]);

  const { control, handleSubmit, setValue, setError, register, formState } = useForm<CmsItemInput>({
    defaultValues,
    resolver: yupResolver(schema) as unknown as Resolver<CmsItemInput>,
  });
  const values = useWatch({ control });

  const slugField = resource.fields.find((field) => field.type === "slug");
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const slugSource = slugField?.slugFrom ? values[slugField.slugFrom] : undefined;

  const lastSlugSource = useRef(slugSource);
  useEffect(() => {
    if (!slugField || slugEdited || typeof slugSource !== "string" || lastSlugSource.current === slugSource) return;
    lastSlugSource.current = slugSource;
    setValue(slugField.name, slugify(slugSource), { shouldDirty: true });
  }, [slugSource, slugEdited, slugField, setValue]);

  useEffect(() => {
    if (!formState.isDirty || formState.isSubmitSuccessful) return undefined;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [formState.isDirty, formState.isSubmitSuccessful]);

  const isVisible = (field: CmsField) => !field.visibleWhen || values[field.visibleWhen.field] === field.visibleWhen.equals;
  const isRequired = (field: CmsField) =>
    !!field.required || (!!field.requiredWhen && values[field.requiredWhen.field] === field.requiredWhen.equals);

  const titleValue = String(values[resource.titleField] ?? "");
  const pageTitle = isEdit ? titleValue || `Edit ${resource.singular.toLowerCase()}` : `New ${resource.singular.toLowerCase()}`;
  const errorCount = Object.keys(formState.errors).length;

  const onSubmit = async (input: CmsItemInput) => {
    try {
      const saved = await save.mutateAsync(input);
      enqueueSnackbar(`"${String(saved[resource.titleField] ?? resource.singular)}" saved.`, { variant: "success" });
      router.push(CMS_ROUTES.list(resource.slug));
    } catch (error) {
      if (isApiError(error)) {
        Object.entries(error.fieldErrors).forEach(([name, messages]) => setError(name, { message: messages[0] }));
      }
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    }
  };

  const confirmDelete = () => {
    if (!item) return;
    openDialog({
      title: `Delete ${resource.singular.toLowerCase()}?`,
      supportText: `"${titleValue}" will be removed from the CMS and the website.`,
      severity: "error",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          await remove.mutateAsync(item.id);
          enqueueSnackbar(`"${titleValue}" deleted.`, { variant: "success" });
          router.push(CMS_ROUTES.list(resource.slug));
        } catch (error) {
          enqueueSnackbar(getErrorMessage(error), { variant: "error" });
        }
        closeDialog();
      },
    });
  };

  const renderFields = (placement: "main" | "side") =>
    resource.fields
      .filter((field) => (field.placement ?? "main") === placement && isVisible(field))
      .map((field) => (
        <CmsFieldInput
          key={field.name}
          field={field}
          control={control}
          required={isRequired(field)}
          onSlugEdited={() => setSlugEdited(true)}
        />
      ));

  const sideFields = renderFields("side");

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <MainLayoutHeader
        title={pageTitle}
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { href: CMS_ROUTES.list(resource.slug), label: resource.name },
          {
            href: isEdit ? CMS_ROUTES.edit(resource.slug, item.id) : CMS_ROUTES.create(resource.slug),
            label: isEdit ? "Edit" : "New",
          },
        ]}
        actions={
          <>
            <Button component={NextLink} href={CMS_ROUTES.list(resource.slug)} variant="outlined" startIcon={<ArrowBackRounded />} sx={{ borderRadius: 2.5, bgcolor: "#fff" }}>
              Back
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveRounded />} loading={save.isPending} sx={CMS_GRADIENT_BUTTON_SX}>
              Save
            </Button>
          </>
        }
      />

      {errorCount > 0 && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          role="alert"
          sx={{ mb: 2.5, px: 2, py: 1.25, borderRadius: 3, color: "error.dark", bgcolor: "rgba(211,47,47,.08)" }}
        >
          <ErrorOutlineRounded fontSize="small" />
          <Typography sx={{ fontSize: 14 }}>
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} before saving.
          </Typography>
        </Stack>
      )}

      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(300px, 1fr)" }, alignItems: "start" }}>
        <Paper elevation={0} sx={{ ...CMS_CARD_SX, p: { xs: 2, sm: 3 } }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#22272f", mb: 2.5 }}>Content</Typography>
          <Stack spacing={2.5}>{renderFields("main")}</Stack>
        </Paper>

        <Stack spacing={3} sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
          <Paper elevation={0} sx={{ ...CMS_CARD_SX, p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#22272f" }}>Publishing</Typography>
              <CmsStatusChip status={values.status === "published" ? "published" : "draft"} />
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={values.status === "published"}
                  onChange={(event) => setValue("status", event.target.checked ? "published" : "draft", { shouldDirty: true })}
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>Show on the website</Typography>}
            />
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Display order"
              {...register("order", { valueAsNumber: true })}
              error={!!formState.errors.order}
              helperText={formState.errors.order?.message ?? "Lower numbers appear first."}
              sx={{ ...CMS_INPUT_SX, mt: 2 }}
            />
            {item && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={0.5} sx={{ fontSize: 13, color: "#667991" }}>
                  <span>Created {formatDateTime(item.createdAt)} by {item.createdBy}</span>
                  <span>Updated {formatDateTime(item.updatedAt)} by {item.updatedBy}</span>
                </Stack>
              </>
            )}
          </Paper>

          {sideFields.length > 0 && (
            <Paper elevation={0} sx={{ ...CMS_CARD_SX, p: 2.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#22272f", mb: 2 }}>Details</Typography>
              <Stack spacing={2.5}>{sideFields}</Stack>
            </Paper>
          )}

          {item && (
            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlineRounded />}
              onClick={confirmDelete}
              sx={{ borderRadius: 2.5, alignSelf: "flex-start" }}
            >
              Delete {resource.singular.toLowerCase()}
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default function CmsItemFormPage({ resourceSlug, id }: { resourceSlug: string; id?: string }) {
  const resource = getCmsResource(resourceSlug) as CmsResource;
  const itemQuery = useCmsItem(resource.slug, id);

  if (id && itemQuery.isLoading) {
    return (
      <Box>
        <Skeleton width={240} height={48} />
        <Skeleton variant="rounded" height={420} sx={{ mt: 3, borderRadius: 4 }} />
      </Box>
    );
  }

  if (id && (itemQuery.isError || !itemQuery.data)) {
    return (
      <Paper elevation={0} sx={{ ...CMS_CARD_SX, py: 8, px: 3, textAlign: "center" }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#22272f" }}>Item not found</Typography>
        <Typography sx={{ fontSize: 14, color: "#667991", mt: 0.5, mb: 2 }}>
          It may have been deleted, or the dummy data was reset.
        </Typography>
        <Button component={NextLink} href={CMS_ROUTES.list(resource.slug)} variant="contained" sx={CMS_GRADIENT_BUTTON_SX}>
          Back to {resource.name}
        </Button>
      </Paper>
    );
  }

  return <CmsItemForm key={itemQuery.data?.id ?? "new"} resource={resource} item={itemQuery.data} />;
}
