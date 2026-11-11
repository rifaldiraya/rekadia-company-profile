"use client";

import { useMemo, useState, type ComponentType } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  keyframes,
  type SvgIconProps,
} from "@mui/material";
import {
  ArrowForwardRounded,
  ArticleOutlined,
  CategoryOutlined,
  CloseRounded,
  CloudOffRounded,
  DesignServicesOutlined,
  FactoryOutlined,
  FormatQuoteRounded,
  GridViewRounded,
  LocalOfferOutlined,
  PeopleAltOutlined,
  SearchOffRounded,
  SearchRounded,
  TaskAltOutlined,
  ViewListRounded,
  WorkOutline,
} from "@mui/icons-material";
import { CMS_COLLECTION_GROUPS, type CmsCollectionGroup } from "@/features/dashboard/data/cms-collections";
import { CMS_ROUTES, getCmsResource } from "@/features/cms/config/cms-resources";
import { useCmsCollections } from "@/features/cms/hook/use-cms";
import type { CmsCollectionSummary as CmsCollection } from "@/features/cms/types/cms";

type SortKey = "default" | "name" | "items";
type ViewMode = "grid" | "list";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ICONS: Record<string, ComponentType<SvgIconProps>> = {
  news: ArticleOutlined,
  "news-categories": LocalOfferOutlined,
  "case-studies": TaskAltOutlined,
  portfolios: CategoryOutlined,
  industries: FactoryOutlined,
  services: DesignServicesOutlined,
  careers: WorkOutline,
  clients: PeopleAltOutlined,
  testimonials: FormatQuoteRounded,
};

const GROUP_TINT: Record<CmsCollectionGroup, { color: string; bg: string }> = {
  Content: { color: "#006876", bg: "rgba(0,194,220,.12)" },
  Clients: { color: "#0b7a5c", bg: "rgba(34,197,148,.14)" },
  Testimonials: { color: "#8a5a00", bg: "rgba(255,176,32,.16)" },
};

const SORTERS: Record<SortKey, (a: CmsCollection, b: CmsCollection) => number> = {
  default: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  items: (a, b) => b.itemCount - a.itemCount,
};

const describe = (collection: CmsCollection) => getCmsResource(collection.slug)?.description ?? "";

function CollectionIcon({ collection, size }: { collection: CmsCollection; size: number }) {
  const Icon = ICONS[collection.slug] ?? ArticleOutlined;
  const tint = GROUP_TINT[collection.group];
  return (
    <Box
      className="collection-icon"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: 2.5,
        color: tint.color,
        bgcolor: tint.bg,
        transition: "transform 250ms ease, background-color 250ms ease, color 250ms ease",
      }}
    >
      <Icon sx={{ fontSize: size * 0.5 }} />
    </Box>
  );
}

function SizeBar({ collection, max }: { collection: CmsCollection; max: number }) {
  return (
    <Box sx={{ height: 6, borderRadius: 3, bgcolor: "#ecf3f6", overflow: "hidden" }}>
      <Box
        sx={{
          height: "100%",
          width: `${Math.max((collection.itemCount / max) * 100, 4)}%`,
          borderRadius: 3,
          background: "linear-gradient(90deg, #006876, #00c2dc)",
        }}
      />
    </Box>
  );
}

const cardInteraction = {
  transition: "transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease",
  "&:hover, &.Mui-focusVisible": {
    borderColor: "#25c1da",
    boxShadow: "0 18px 36px -24px rgba(0,104,118,.6)",
    ".collection-icon": { transform: "scale(1.08) rotate(-4deg)", color: "white", bgcolor: "#006876" },
    ".collection-arrow": { opacity: 1, transform: "translateX(0)" },
  },
  "&.Mui-focusVisible": { outline: "2px solid #25c1da", outlineOffset: 2 },
  [REDUCED_MOTION]: {
    "&:hover, &.Mui-focusVisible": { transform: "none", ".collection-icon": { transform: "none" } },
  },
};

function CollectionCard({ collection, index, max }: { collection: CmsCollection; index: number; max: number }) {
  return (
    <ButtonBase
      component={NextLink}
      href={CMS_ROUTES.list(collection.slug)}
      aria-label={`${collection.name}, ${collection.itemCount} items`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        textAlign: "left",
        p: 2.5,
        borderRadius: 3.5,
        bgcolor: "white",
        border: "1px solid #e3eaef",
        animation: `${rise} 450ms ease ${Math.min(index, 12) * 40}ms both`,
        ...cardInteraction,
        "&:hover": { ...cardInteraction["&:hover, &.Mui-focusVisible"], transform: "translateY(-4px)" },
        [REDUCED_MOTION]: { animation: "none", ...cardInteraction[REDUCED_MOTION] },
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
        <CollectionIcon collection={collection} size={44} />
        <Chip
          label={collection.group}
          size="small"
          sx={{ height: 22, fontSize: 11, fontWeight: 600, color: GROUP_TINT[collection.group].color, bgcolor: GROUP_TINT[collection.group].bg }}
        />
      </Stack>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#22272f", wordBreak: "break-word" }}>
        {collection.name}
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#667991", mt: 0.25, mb: 2 }}>{describe(collection)}</Typography>
      <Box sx={{ mt: "auto" }}>
        <SizeBar collection={collection} max={max} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#006876" }}>{collection.itemCount} items</Typography>
          <ArrowForwardRounded
            className="collection-arrow"
            sx={{
              fontSize: 18,
              color: "#006876",
              opacity: 0,
              transform: "translateX(-6px)",
              transition: "opacity 250ms ease, transform 250ms ease",
            }}
          />
        </Stack>
      </Box>
    </ButtonBase>
  );
}

function CollectionRow({ collection, index, max }: { collection: CmsCollection; index: number; max: number }) {
  return (
    <ButtonBase
      component={NextLink}
      href={CMS_ROUTES.list(collection.slug)}
      aria-label={`${collection.name}, ${collection.itemCount} items`}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr auto", sm: "auto minmax(0,1fr) 160px auto" },
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        textAlign: "left",
        borderRadius: 3,
        bgcolor: "white",
        border: "1px solid #e3eaef",
        animation: `${rise} 400ms ease ${Math.min(index, 12) * 30}ms both`,
        ...cardInteraction,
        [REDUCED_MOTION]: { animation: "none", ...cardInteraction[REDUCED_MOTION] },
      }}
    >
      <CollectionIcon collection={collection} size={40} />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#22272f" }} noWrap>
          {collection.name}
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#667991" }} noWrap>
          {describe(collection)}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <SizeBar collection={collection} max={max} />
      </Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ display: { xs: "none", sm: "block" }, fontSize: 13, fontWeight: 700, color: "#006876", whiteSpace: "nowrap" }}>
          {collection.itemCount} items
        </Typography>
        <ArrowForwardRounded
          className="collection-arrow"
          sx={{ fontSize: 18, color: "#006876", opacity: 0.4, transition: "opacity 250ms ease, transform 250ms ease" }}
        />
      </Stack>
    </ButtonBase>
  );
}

const NO_COLLECTIONS: CmsCollection[] = [];

export default function CmsCollectionList() {
  const { data: allCollections = NO_COLLECTIONS, isPending, isError, refetch } = useCmsCollections();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<CmsCollectionGroup | "All">("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [view, setView] = useState<ViewMode>("grid");

  const collections = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return allCollections
      .filter((item) => (group === "All" || item.group === group) && (!keyword || item.name.toLowerCase().includes(keyword)))
      .sort(SORTERS[sort]);
  }, [allCollections, query, group, sort]);

  const maxItems = Math.max(1, ...allCollections.map((collection) => collection.itemCount));

  const groupCounts = useMemo(
    () =>
      Object.fromEntries(
        CMS_COLLECTION_GROUPS.map((name) => [name, allCollections.filter((item) => item.group === name).length]),
      ) as Record<CmsCollectionGroup, number>,
    [allCollections],
  );

  const resetFilters = () => {
    setQuery("");
    setGroup("All");
  };

  const listKey = `${group}-${sort}-${view}`;

  return (
    <Box id="collections" sx={{ scrollMarginTop: 24 }}>
      <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: 4, border: "1px solid #e3eaef" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ md: "center" }}>
          <TextField
            fullWidth
            size="small"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Collections..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f6f9fa",
                "&.Mui-focused": { bgcolor: "white", boxShadow: "0 0 0 4px rgba(37,193,218,.15)" },
              },
            }}
            slotProps={{
              htmlInput: { "aria-label": "Search collections" },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: "#8595ab" }} />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton size="small" aria-label="Clear search" onClick={() => setQuery("")}>
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
            <TextField
              select
              size="small"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              sx={{ minWidth: 170, "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
              slotProps={{ htmlInput: { "aria-label": "Sort collections" } }}
            >
              <MenuItem value="default">Default order</MenuItem>
              <MenuItem value="name">Name (A–Z)</MenuItem>
              <MenuItem value="items">Most items</MenuItem>
            </TextField>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={view}
              onChange={(_, next: ViewMode | null) => next && setView(next)}
              aria-label="Layout"
              sx={{
                "& .MuiToggleButton-root": { px: 1.25, borderRadius: 2.5 },
                "& .Mui-selected": { color: "white !important", bgcolor: "#006876 !important" },
              }}
            >
              <ToggleButton value="grid" aria-label="Grid view">
                <GridViewRounded fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list" aria-label="List view">
                <ViewListRounded fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 2 }}>
          {(["All", ...CMS_COLLECTION_GROUPS] as const).map((name) => {
            const selected = group === name;
            const count = name === "All" ? allCollections.length : groupCounts[name];
            return (
              <Chip
                key={name}
                label={`${name} · ${count}`}
                onClick={() => setGroup(name)}
                aria-pressed={selected}
                sx={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: selected ? "white" : "#516178",
                  background: selected ? "linear-gradient(90deg, #006876, #00c2dc)" : "#f1f5f7",
                  "&:hover": { background: selected ? "linear-gradient(90deg, #006876, #00c2dc)" : "#e3eef2" },
                }}
              />
            );
          })}
        </Stack>
      </Paper>

      <Typography aria-live="polite" sx={{ fontSize: 13, color: "#667991", mb: 1.5 }}>
        Showing {collections.length} of {allCollections.length} collections
      </Typography>

      {isPending ? (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0,1fr))", lg: "repeat(3, minmax(0,1fr))" } }}>
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} variant="rounded" height={150} sx={{ borderRadius: 4 }} />
          ))}
        </Box>
      ) : isError ? (
        <Paper elevation={0} sx={{ py: 7, px: 3, textAlign: "center", borderRadius: 4, border: "1px dashed #cfdbe2" }}>
          <CloudOffRounded sx={{ fontSize: 40, color: "#b0bac9" }} />
          <Typography sx={{ mt: 1, fontSize: 16, fontWeight: 700, color: "#22272f" }}>Collections could not be loaded</Typography>
          <Typography sx={{ fontSize: 14, color: "#667991", mb: 2 }}>Check your connection to the CMS API and try again.</Typography>
          <Chip label="Try again" onClick={() => refetch()} color="primary" sx={{ fontWeight: 600 }} />
        </Paper>
      ) : collections.length === 0 ? (
        <Paper elevation={0} sx={{ py: 7, px: 3, textAlign: "center", borderRadius: 4, border: "1px dashed #cfdbe2" }}>
          <SearchOffRounded sx={{ fontSize: 40, color: "#b0bac9" }} />
          <Typography sx={{ mt: 1, fontSize: 16, fontWeight: 700, color: "#22272f" }}>No collections found</Typography>
          <Typography sx={{ fontSize: 14, color: "#667991", mb: 2 }}>Try another keyword or group.</Typography>
          <Chip label="Reset filters" onClick={resetFilters} color="primary" sx={{ fontWeight: 600 }} />
        </Paper>
      ) : view === "grid" ? (
        <Box
          key={listKey}
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0,1fr))", lg: "repeat(3, minmax(0,1fr))", xl: "repeat(4, minmax(0,1fr))" },
          }}
        >
          {collections.map((collection, index) => (
            <CollectionCard key={collection.slug} collection={collection} index={index} max={maxItems} />
          ))}
        </Box>
      ) : (
        <Stack key={listKey} spacing={1.25}>
          {collections.map((collection, index) => (
            <CollectionRow key={collection.slug} collection={collection} index={index} max={maxItems} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
