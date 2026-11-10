import { ApiError } from "@/services/api-error";
import { CMS_RESOURCES, getCmsResource } from "@/features/cms/config/cms-resources";
import { createCmsSeed, type CmsMockData } from "@/features/cms/data/cms-seed";
import type {
  CmsCollectionSummary,
  CmsFieldValue,
  CmsItem,
  CmsItemInput,
  CmsListParams,
  CmsListResult,
  CmsMedia,
  CmsStatus,
} from "@/features/cms/types/cms";

const STORAGE_KEY = "rekadia-cms-mock-v1";
const MAX_UPLOAD_BYTES = 1024 * 1024;

let cache: CmsMockData | null = null;

const read = (): CmsMockData => {
  if (cache) return cache;
  if (typeof window === "undefined") return createCmsSeed();
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cache = stored ? (JSON.parse(stored) as CmsMockData) : createCmsSeed();
  } catch {
    cache = createCmsSeed();
  }
  return cache;
};

const write = (data: CmsMockData) => {
  cache = data;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    throw new ApiError("http", "Browser storage is full. Remove some uploaded images and try again.", { status: 413 });
  }
};

const itemsOf = (resource: string) => {
  if (!getCmsResource(resource)) throw new ApiError("http", "Collection not found.", { status: 404 });
  return read().items[resource] ?? [];
};

const findItem = (resource: string, id: string) => {
  const item = itemsOf(resource).find((entry) => entry.id === id);
  if (!item) throw new ApiError("http", "Item not found.", { status: 404 });
  return item;
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;

const matchesFilter = (value: CmsFieldValue | undefined, expected: string) => {
  if (Array.isArray(value)) return value.includes(expected);
  if (typeof value === "boolean") return String(value) === expected;
  return value === expected;
};

const compare = (a: CmsFieldValue | undefined, b: CmsFieldValue | undefined) => {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, { numeric: true, sensitivity: "base" });
};

const assertUniqueSlug = (resource: string, input: CmsItemInput, id?: string) => {
  const slug = input.slug;
  if (typeof slug !== "string" || !slug) return;
  const taken = itemsOf(resource).some((item) => item.slug === slug && item.id !== id);
  if (taken) {
    throw new ApiError("validation", "Slug is already used.", { status: 409, fieldErrors: { slug: ["Slug is already used."] } });
  }
};

const replaceItems = (resource: string, items: CmsItem[]) => {
  const data = read();
  write({ ...data, items: { ...data.items, [resource]: items } });
};

export const cmsMockDb = {
  list(resource: string, params: CmsListParams = {}): CmsListResult {
    const definition = getCmsResource(resource)!;
    const { page = 1, pageSize = 20, search, status, sort = definition?.defaultSort ?? "order", filters = {} } = params;
    const keyword = search?.trim().toLowerCase();

    const filtered = itemsOf(resource).filter((item) => {
      if (status && item.status !== status) return false;
      if (keyword && !String(item[definition.titleField] ?? "").toLowerCase().includes(keyword)) return false;
      return Object.entries(filters).every(([field, value]) => !value || matchesFilter(item[field], value));
    });

    const descending = sort.startsWith("-");
    const sortField = descending ? sort.slice(1) : sort;
    const sorted = [...filtered].sort((a, b) => compare(a[sortField], b[sortField]) * (descending ? -1 : 1));

    const start = (page - 1) * pageSize;
    return {
      items: sorted.slice(start, start + pageSize),
      page,
      pageSize,
      totalItems: sorted.length,
      totalPages: Math.max(1, Math.ceil(sorted.length / pageSize)),
    };
  },

  get: findItem,

  create(resource: string, input: CmsItemInput, username: string): CmsItem {
    assertUniqueSlug(resource, input);
    const items = itemsOf(resource);
    const now = new Date().toISOString();
    const { status, order, ...fields } = input;
    const item: CmsItem = {
      ...fields,
      id: newId(),
      status: (status as CmsStatus) ?? "draft",
      order: typeof order === "number" ? order : items.length + 1,
      createdAt: now,
      updatedAt: now,
      createdBy: username,
      updatedBy: username,
    };
    replaceItems(resource, [...items, item]);
    return item;
  },

  update(resource: string, id: string, input: CmsItemInput, username: string): CmsItem {
    const current = findItem(resource, id);
    assertUniqueSlug(resource, input, id);
    const { status, order, ...fields } = input;
    const item: CmsItem = {
      ...current,
      ...fields,
      status: (status as CmsStatus) ?? current.status,
      order: typeof order === "number" ? order : current.order,
      updatedAt: new Date().toISOString(),
      updatedBy: username,
    };
    replaceItems(resource, itemsOf(resource).map((entry) => (entry.id === id ? item : entry)));
    return item;
  },

  setStatus(resource: string, id: string, status: CmsStatus, username: string): CmsItem {
    return cmsMockDb.update(resource, id, { status }, username);
  },

  reorder(resource: string, orders: { id: string; order: number }[]) {
    const byId = new Map(orders.map((entry) => [entry.id, entry.order]));
    replaceItems(resource, itemsOf(resource).map((item) => (byId.has(item.id) ? { ...item, order: byId.get(item.id)! } : item)));
  },

  remove(resource: string, id: string) {
    findItem(resource, id);
    if (resource === "news-categories" && itemsOf("news").some((article) => article.categoryId === id)) {
      throw new ApiError("http", "This category still has news articles. Move them to another category first.", { status: 409 });
    }
    replaceItems(resource, itemsOf(resource).filter((item) => item.id !== id));
  },

  collections(): CmsCollectionSummary[] {
    return CMS_RESOURCES.map((resource) => {
      const items = read().items[resource.slug] ?? [];
      const updatedAt = items.reduce<string | null>((latest, item) => (!latest || item.updatedAt > latest ? item.updatedAt : latest), null);
      return { slug: resource.slug, name: resource.name, group: resource.group, itemCount: items.length, updatedAt };
    });
  },

  media(): CmsMedia[] {
    return read().media;
  },

  addMedia(media: Omit<CmsMedia, "id">): CmsMedia {
    if (media.size > MAX_UPLOAD_BYTES) {
      throw new ApiError("validation", "Dummy uploads are limited to 1 MB.", { status: 413, fieldErrors: { file: ["Max 1 MB."] } });
    }
    const created = { ...media, id: newId() };
    const data = read();
    write({ ...data, media: [created, ...data.media] });
    return created;
  },

  reset() {
    cache = createCmsSeed();
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  },
};
