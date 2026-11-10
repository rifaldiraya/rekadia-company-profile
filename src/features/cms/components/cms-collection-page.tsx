"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  CloseRounded,
  DeleteOutlineRounded,
  EditOutlined,
  Inventory2Outlined,
  SearchRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { MainLayoutHeader } from "@/components/layout";
import useDialog from "@/hook/use-dialog";
import { getErrorMessage } from "@/services/api-error";
import CmsMediaThumb from "@/features/cms/components/cms-media-thumb";
import CmsStatusChip from "@/features/cms/components/cms-status-chip";
import { CMS_CARD_SX, CMS_GRADIENT_BUTTON_SX, CMS_INPUT_SX } from "@/features/cms/components/cms-styles";
import { CMS_ROUTES, getCmsField, getCmsResource, optionLabel } from "@/features/cms/config/cms-resources";
import { useCmsList, useCmsMedia, useCmsOptions, useDeleteCmsItem, useSetCmsStatus } from "@/features/cms/hook/use-cms";
import type { CmsColumn, CmsItem, CmsResource, CmsStatus } from "@/features/cms/types/cms";

const SEARCH_DEBOUNCE_MS = 300;

const STATUS_FILTERS: { value: CmsStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const softChipSx = { height: 24, fontSize: 12, fontWeight: 600, color: "#006876", bgcolor: "rgba(0,194,220,.12)" };

function useDebounced<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function CmsCollectionPage({ resourceSlug }: { resourceSlug: string }) {
  const resource = getCmsResource(resourceSlug) as CmsResource;
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CmsStatus | "all">("all");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState(resource.defaultSort);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const debouncedSearch = useDebounced(search, SEARCH_DEBOUNCE_MS);

  useEffect(() => setPage(0), [debouncedSearch, status, filters, sort, pageSize]);

  const list = useCmsList(resource.slug, {
    page: page + 1,
    pageSize,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    sort,
    filters,
  });
  const { data: media = [] } = useCmsMedia();
  const referenceField = resource.fields.find((field) => field.type === "reference");
  const { data: referenceItems = [] } = useCmsOptions(referenceField?.reference);
  const setItemStatus = useSetCmsStatus(resource.slug);
  const deleteItem = useDeleteCmsItem(resource.slug);

  const mediaById = useMemo(() => new Map(media.map((item) => [item.id, item])), [media]);
  const referenceTitleField = referenceField?.reference ? getCmsResource(referenceField.reference)?.titleField ?? "name" : "name";
  const referenceById = useMemo(
    () => new Map(referenceItems.map((item) => [item.id, String(item[referenceTitleField] ?? "")])),
    [referenceItems, referenceTitleField],
  );

  const sortOptions = useMemo(
    () => [
      { value: resource.defaultSort, label: resource.defaultSort === "order" ? "Display order" : "Newest first" },
      { value: "-updatedAt", label: "Recently updated" },
      { value: resource.titleField, label: "Title (A–Z)" },
    ],
    [resource],
  );

  const hasActiveFilters = !!search || status !== "all" || Object.values(filters).some(Boolean);
  const titleOf = (item: CmsItem) => String(item[resource.titleField] ?? "Untitled");

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setFilters({});
  };

  const togglePublish = async (event: MouseEvent, item: CmsItem) => {
    event.stopPropagation();
    const next: CmsStatus = item.status === "published" ? "draft" : "published";
    try {
      await setItemStatus.mutateAsync({ id: item.id, status: next });
      enqueueSnackbar(`"${titleOf(item)}" ${next === "published" ? "published" : "moved to draft"}.`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    }
  };

  const confirmDelete = (event: MouseEvent, item: CmsItem) => {
    event.stopPropagation();
    openDialog({
      title: `Delete ${resource.singular.toLowerCase()}?`,
      supportText: `"${titleOf(item)}" will be removed from the CMS and the website.`,
      severity: "error",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteItem.mutateAsync(item.id);
          enqueueSnackbar(`"${titleOf(item)}" deleted.`, { variant: "success" });
        } catch (error) {
          enqueueSnackbar(getErrorMessage(error), { variant: "error" });
        }
        closeDialog();
      },
    });
  };

  const renderCell = (column: CmsColumn, item: CmsItem) => {
    const value = item[column.field];
    const field = getCmsField(resource, column.field);
    switch (column.kind) {
      case "media":
        return <CmsMediaThumb media={typeof value === "string" ? mediaById.get(value) : undefined} width={56} height={40} />;
      case "chip":
        return value ? <Chip size="small" label={optionLabel(field, String(value))} sx={softChipSx} /> : "–";
      case "chips":
        return (
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5}>
            {(Array.isArray(value) ? value : []).map((entry) => (
              <Chip key={entry} size="small" label={optionLabel(field, entry)} sx={softChipSx} />
            ))}
          </Stack>
        );
      case "date":
        return value ? formatDate(String(value)) : "–";
      case "boolean":
        return (
          <Chip
            size="small"
            label={value ? "Yes" : "No"}
            sx={{ ...softChipSx, ...(value ? {} : { color: "#667991", bgcolor: "#f1f5f7" }) }}
          />
        );
      case "reference":
        return referenceById.get(String(value)) ?? "–";
      default:
        if (column.field === resource.titleField) {
          return (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#22272f" }} noWrap title={titleOf(item)}>
                {titleOf(item)}
              </Typography>
              {typeof item.slug === "string" && column.field !== "slug" && (
                <Typography sx={{ fontSize: 12, color: "#8595ab" }} noWrap>
                  /{item.slug}
                </Typography>
              )}
            </Box>
          );
        }
        return (
          <Typography sx={{ fontSize: 14, color: "#516178", maxWidth: 320 }} noWrap title={String(value ?? "")}>
            {value ? String(value) : "–"}
          </Typography>
        );
    }
  };

  const result = list.data;
  const items = result?.items ?? [];

  return (
    <Box>
      <MainLayoutHeader
        title={resource.name}
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { href: CMS_ROUTES.list(resource.slug), label: resource.name },
        ]}
        description={
          <>
            {resource.description}{" "}
            <Box component="span" sx={{ color: "#8595ab" }}>
              Replaces Webflow: {resource.replaces.join(", ")}.
            </Box>
          </>
        }
        actions={
          <Button
            component={NextLink}
            href={CMS_ROUTES.create(resource.slug)}
            variant="contained"
            startIcon={<AddRounded />}
            sx={CMS_GRADIENT_BUTTON_SX}
          >
            New {resource.singular.toLowerCase()}
          </Button>
        }
      />

      {resource.pendingConfirmation && (
        <Alert severity="info" sx={{ mb: 2.5, borderRadius: 3 }}>
          This collection may be merged into Case Studies once the backend confirms its fields (API contract, open question 1).
        </Alert>
      )}

      <Paper elevation={0} sx={{ ...CMS_CARD_SX, overflow: "hidden" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e3eaef" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${resource.name.toLowerCase()}...`}
              sx={CMS_INPUT_SX}
              slotProps={{
                htmlInput: { "aria-label": `Search ${resource.name}` },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: "#8595ab" }} />
                    </InputAdornment>
                  ),
                  endAdornment: search ? (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="Clear search" onClick={() => setSearch("")}>
                        <CloseRounded fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />
            {resource.filters.map((name) => {
              const field = getCmsField(resource, name);
              if (!field) return null;
              const options =
                field.type === "reference"
                  ? referenceItems.map((item) => ({ value: item.id, label: String(item[referenceTitleField] ?? "") }))
                  : field.type === "boolean"
                    ? [
                        { value: "true", label: "Yes" },
                        { value: "false", label: "No" },
                      ]
                    : field.options ?? [];
              return (
                <TextField
                  key={name}
                  select
                  size="small"
                  label={field.label}
                  value={filters[name] ?? ""}
                  onChange={(event) => setFilters((current) => ({ ...current, [name]: event.target.value }))}
                  sx={{ ...CMS_INPUT_SX, minWidth: { md: 170 } }}
                >
                  <MenuItem value="">All</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            })}
            <TextField
              select
              size="small"
              label="Sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              sx={{ ...CMS_INPUT_SX, minWidth: { md: 180 } }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
            {STATUS_FILTERS.map((option) => {
              const selected = status === option.value;
              return (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => setStatus(option.value)}
                  aria-pressed={selected}
                  sx={{
                    fontWeight: 600,
                    color: selected ? "white" : "#516178",
                    background: selected ? "linear-gradient(90deg, #006876, #00c2dc)" : "#f1f5f7",
                    "&:hover": { background: selected ? "linear-gradient(90deg, #006876, #00c2dc)" : "#e3eef2" },
                  }}
                />
              );
            })}
            <Typography aria-live="polite" sx={{ ml: "auto !important", fontSize: 13, color: "#667991" }}>
              {result ? `${result.totalItems} ${result.totalItems === 1 ? "item" : "items"}` : ""}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ height: 3 }}>{list.isFetching && !list.isLoading && <LinearProgress sx={{ height: 3 }} />}</Box>

        {!list.isLoading && items.length === 0 ? (
          <Stack alignItems="center" sx={{ py: 8, px: 3, textAlign: "center" }}>
            <Inventory2Outlined sx={{ fontSize: 44, color: "#b0bac9" }} />
            <Typography sx={{ mt: 1, fontSize: 16, fontWeight: 700, color: "#22272f" }}>
              {hasActiveFilters ? "No items match your filters" : `No ${resource.name.toLowerCase()} yet`}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#667991", mb: 2 }}>
              {hasActiveFilters ? "Try another keyword or clear the filters." : "Create the first item to show it on the website."}
            </Typography>
            {hasActiveFilters ? (
              <Button onClick={resetFilters}>Reset filters</Button>
            ) : (
              <Button component={NextLink} href={CMS_ROUTES.create(resource.slug)} variant="contained" sx={CMS_GRADIENT_BUTTON_SX}>
                New {resource.singular.toLowerCase()}
              </Button>
            )}
          </Stack>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 760 }} aria-label={resource.name}>
              <TableHead>
                <TableRow sx={{ "& th": { fontSize: 12, fontWeight: 700, color: "#667991", bgcolor: "#f8fafb", textTransform: "uppercase", letterSpacing: 0.4 } }}>
                  {resource.columns.map((column) => (
                    <TableCell key={column.field} sx={column.kind === "media" ? { width: 72 } : undefined}>
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Status</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.isLoading
                  ? Array.from({ length: 5 }, (_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: resource.columns.length + 3 }, (__, cell) => (
                          <TableCell key={cell}>
                            <Skeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : items.map((item) => (
                      <TableRow
                        key={item.id}
                        hover
                        onClick={() => router.push(CMS_ROUTES.edit(resource.slug, item.id))}
                        sx={{ cursor: "pointer", "& td": { py: 1.25 }, "&:last-child td": { borderBottom: 0 } }}
                      >
                        {resource.columns.map((column) => (
                          <TableCell key={column.field} sx={{ maxWidth: column.field === resource.titleField ? 360 : undefined }}>
                            {renderCell(column, item)}
                          </TableCell>
                        ))}
                        <TableCell>
                          <CmsStatusChip status={item.status} />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", fontSize: 13, color: "#667991" }}>
                          {formatDate(item.updatedAt)}
                          <Typography sx={{ fontSize: 12, color: "#8595ab" }}>by {item.updatedBy}</Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                          <Tooltip title="Edit">
                            <IconButton
                              component={NextLink}
                              href={CMS_ROUTES.edit(resource.slug, item.id)}
                              size="small"
                              aria-label={`Edit ${titleOf(item)}`}
                              onClick={(event: MouseEvent) => event.stopPropagation()}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={item.status === "published" ? "Unpublish" : "Publish"}>
                            <IconButton
                              size="small"
                              aria-label={`${item.status === "published" ? "Unpublish" : "Publish"} ${titleOf(item)}`}
                              onClick={(event) => togglePublish(event, item)}
                            >
                              {item.status === "published" ? (
                                <VisibilityOffOutlined fontSize="small" />
                              ) : (
                                <VisibilityOutlined fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              aria-label={`Delete ${titleOf(item)}`}
                              onClick={(event) => confirmDelete(event, item)}
                              sx={{ "&:hover": { color: "error.main" } }}
                            >
                              <DeleteOutlineRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {result && result.totalItems > 0 && (
          <TablePagination
            component="div"
            count={result.totalItems}
            page={Math.min(page, result.totalPages - 1)}
            onPageChange={(_, next) => setPage(next)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
            rowsPerPageOptions={[10, 20, 50]}
            sx={{ borderTop: "1px solid #e3eaef" }}
          />
        )}
      </Paper>
    </Box>
  );
}
