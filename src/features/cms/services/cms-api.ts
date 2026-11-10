import { cmsMockDb } from "@/features/cms/services/cms-mock-db";
import type { CmsItemInput, CmsListParams, CmsMedia, CmsStatus } from "@/features/cms/types/cms";

/**
 * CMS service following docs/API_CONTRACT.md. Every call is served by the in-browser
 * dummy database until the ASP.NET Core endpoints are available.
 */
const MOCK_LATENCY_MS = 250;

const respond = <T>(produce: () => T) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(produce());
      } catch (error) {
        reject(error);
      }
    }, MOCK_LATENCY_MS);
  });

const readImageSize = (url: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth || 1, height: image.naturalHeight || 1 });
    image.onerror = () => resolve({ width: 1, height: 1 });
    image.src = url;
  });

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const cmsApi = {
  collections: () => respond(() => cmsMockDb.collections()),
  list: (resource: string, params: CmsListParams) => respond(() => cmsMockDb.list(resource, params)),
  get: (resource: string, id: string) => respond(() => cmsMockDb.get(resource, id)),
  create: (resource: string, input: CmsItemInput, username: string) =>
    respond(() => cmsMockDb.create(resource, input, username)),
  update: (resource: string, id: string, input: CmsItemInput, username: string) =>
    respond(() => cmsMockDb.update(resource, id, input, username)),
  setStatus: (resource: string, id: string, status: CmsStatus, username: string) =>
    respond(() => cmsMockDb.setStatus(resource, id, status, username)),
  remove: (resource: string, id: string) => respond(() => cmsMockDb.remove(resource, id)),
  media: () => respond(() => cmsMockDb.media()),
  async uploadMedia(file: File, alt: string): Promise<CmsMedia> {
    const url = await readAsDataUrl(file);
    const { width, height } = await readImageSize(url);
    return respond(() => cmsMockDb.addMedia({ url, width, height, alt, mimeType: file.type, size: file.size }));
  },
  reset: () => respond(() => cmsMockDb.reset()),
};
