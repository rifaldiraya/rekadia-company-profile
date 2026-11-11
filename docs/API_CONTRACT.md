# Rekadia CMS — API Contract

> Status: **Draft v0.1** · 10 November 2026
> Frontend: Next.js (`RKD.COMPRO`) · Backend: ASP.NET Core
> Scope: CMS admin login, CMS content management, public content for the website (rekadia.co.id), contact form, and newsletter.
>
> Frontend status: CMS login and the pages under `/dashboard/collections/*` call the development API
> (`src/config/auth.config.ts`, `src/features/cms/services/cms-api.ts`).
> Swagger: https://dev.rkdweb.apps-dev.rekadia.co.id/swagger/index.html

---

## 1. General Conventions

| Item | Value |
| --- | --- |
| Base URL | `{API_BASE_URL}`, development: `https://dev.rkdweb.apps-dev.rekadia.co.id` (frontend: `NEXT_PUBLIC_API_BASE_URL`) |
| Format | JSON, `Content-Type: application/json` (except media upload: `multipart/form-data`) |
| Property naming | `camelCase` |
| Dates | ISO 8601 UTC, e.g. `2026-11-10T07:00:00Z`; date-only fields use `YYYY-MM-DD` |
| ID | `uuid` (string) |
| Auth | `Authorization: Bearer <accessToken>` for every `/cms/*` endpoint |
| Trailing slash | The backend should accept URLs with **and** without a trailing slash |

### 1.1 Success response (envelope)

```json
{
  "success": true,
  "message": "OK",
  "data": { }
}
```

### 1.2 Paginated list response

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 20,
    "totalItems": 56,
    "totalPages": 3
  }
}
```

Standard query parameters for list endpoints:

| Param | Type | Default | Notes |
| --- | --- | --- | --- |
| `page` | int | 1 | starts at 1 |
| `pageSize` | int | 20 | max 100 |
| `search` | string | – | searches the title/name field |
| `status` | `draft` \| `published` | – | CMS only |
| `sort` | string | `order` | e.g. `order`, `-publishedAt`, `title` (`-` = descending) |

### 1.3 Error response (RFC 7807 ProblemDetails)

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "Validation failed.",
  "traceId": "00-abc...",
  "errors": {
    "title": ["Title is required."],
    "slug": ["Slug is already used."]
  }
}
```

The frontend maps the keys in `errors` directly onto form fields, so **key names must match request property names (camelCase)**.

| Status | When |
| --- | --- |
| 400 / 422 | Validation failed (must include `errors`) |
| 401 | Token missing, invalid, or expired |
| 403 | User lacks the required permission |
| 404 | Data not found |
| 409 | Conflict (e.g. duplicate slug) |
| 413 | File too large |
| 500 | Server error |

### 1.4 Shared fields for every CMS item

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | read-only |
| `status` | `draft` \| `published` | only `published` items appear on public endpoints |
| `order` | int | display order (ascending) |
| `createdAt` | datetime | read-only |
| `updatedAt` | datetime | read-only |
| `createdBy` | string | read-only, username |
| `updatedBy` | string | read-only, username |

### 1.5 Media object

Every image or file field in a response uses this shape:

```json
{
  "id": "6f1c...",
  "url": "https://cdn.rekadia.co.id/media/news/cover.webp",
  "width": 1200,
  "height": 630,
  "alt": "Rekadia team at the Delva launch",
  "mimeType": "image/webp",
  "size": 182344
}
```

In create/update requests, send only the ID: `coverImageId`, `logoId`, and so on.

---

## 2. Authentication

### 2.1 Login
`POST /account/login`

Request:
```json
{
  "emailOrUserName": "admin@rekadia.co.id",
  "password": "RekadiaCMS1"
}
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "token": "<JWT access token>",
    "refreshToken": "<opaque refresh token>",
    "expiresIn": 1800
  }
}
```

Failure: `401` with `detail: "Email/username or password is incorrect."`

**Required JWT claims** (read by the frontend):

| Claim | Type | Example |
| --- | --- | --- |
| `sub` / `id` | string | `"b3e1..."` |
| `username` | string | `"admin"` |
| `name` | string | `"Rekadia Admin"` |
| `email` | string | `"admin@rekadia.co.id"` |
| `role` | string[] | `["Superadmin"]` |
| `permission` | `{ type: string; values: string[] }[]` | `[{ "type": "News", "values": ["View","Create","Update","Delete"] }]` |
| `exp` | number | unix time |

### 2.2 Refresh token
`POST /account/refresh-token`
```json
{ "refreshToken": "<refresh token>" }
```
Response: same as login.

### 2.3 Logout
`POST /account/logout`: revokes the refresh token. Response `204`.

### 2.4 Profile and password (already used by the template)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/account/me` | profile of the logged-in user |
| POST | `/account/change-password` | `{ currentPassword, newPassword, confirmPassword }` |
| POST | `/account/forgot-password` | `{ email }` |
| POST | `/account/reset-password` | `{ email, token, newPassword, confirmPassword }` |

### 2.5 Roles and permissions

| Role | Access |
| --- | --- |
| `Superadmin` | Everything, including Settings (users, roles, access control) |
| `Editor` | CRUD on all content collections, no Settings |

Proposed permission `type` values (one per resource): `News`, `NewsCategories`, `CaseStudies`, `Portfolios`, `Industries`, `Services`, `Careers`, `Clients`, `Testimonials`, `Media`, `Settings`.
Actions: `View`, `Create`, `Update`, `Delete`, `Publish`.

---

## 3. CMS: Collection Summary (dashboard)

`GET /cms/collections`

```json
{
  "success": true,
  "data": [
    { "slug": "news", "name": "News", "group": "Content", "itemCount": 54, "updatedAt": "2026-11-09T10:00:00Z" },
    { "slug": "testimonials", "name": "Testimonials", "group": "Testimonials", "itemCount": 18, "updatedAt": "2026-11-08T03:12:00Z" }
  ]
}
```

Return only the collections the user has `View` permission for.

---

## 4. CMS: Content Resources

Every resource follows the same CRUD pattern:

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/cms/{resource}` | paginated list + filters (section 1.2) |
| GET | `/cms/{resource}/{id}` | detail |
| POST | `/cms/{resource}` | create → `201` + item |
| PUT | `/cms/{resource}/{id}` | full update → `200` + item |
| PATCH | `/cms/{resource}/{id}/status` | `{ "status": "published" }` |
| PUT | `/cms/{resource}/reorder` | `{ "items": [{ "id": "...", "order": 1 }] }` |
| DELETE | `/cms/{resource}/{id}` | `204` (soft delete recommended) |

### 4.0 Mapping from the old Webflow collections

| Webflow collection (old) | Item count | New resource | Distinguished by |
| --- | --- | --- | --- |
| News | 56 | `news` | `categoryId` |
| Categories News | 4 | `news-categories` | – |
| Case Studies | 4 | `case-studies` | – |
| Portofolios | 4 | `portfolios` | *to be confirmed: merge into case-studies?* |
| Industries | 5 | `industries` | – |
| Services | 6 | `services` | – |
| Careers | 7 | `careers` | – |
| Clients | 69 | `clients` | `showOn: ["home"]` |
| E-Office Clients | 37 | `clients` | `showOn: ["e-office"]` |
| IT Friendlies | 3 | `clients` | `showOn: ["it-friendly"]` *(to be confirmed)* |
| Testimoni Videos | 5 | `testimonials` | `format: "video"` |
| E-Office-Testimonis | 5 | `testimonials` | `category: "e-office"` |
| E-Office-Email-Testimonis | 3 | `testimonials` | `category: "e-office-email"` |
| Delva-Testimonis | 5 | `testimonials` | `category: "delva"` |

---

### 4.1 News: `/cms/news`

Extra filters: `categoryId`, `publishedFrom`, `publishedTo`.

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | unique, kebab-case; auto-generated from title if empty |
| `categoryId` | uuid | ✔ | references `news-categories` |
| `summary` | string(500) | ✔ | used on the blog card |
| `body` | string (HTML) | ✔ | backend must sanitise the HTML |
| `coverImageId` | uuid | – | response: `coverImage` (Media) |
| `publishedAt` | date | ✔ | `YYYY-MM-DD` |
| `seoTitle` | string(70) | – | |
| `seoDescription` | string(160) | – | |

Response also includes `category: { id, name, slug }`.

### 4.2 News Categories: `/cms/news-categories`

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `name` | string(100) | ✔ | |
| `slug` | string(100) | ✔ | unique |

Deleting a category that still has news returns `409`.

### 4.3 Case Studies: `/cms/case-studies`

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | unique |
| `category` | string(100) | ✔ | e.g. `finance`, `energy` (filter on the listing page) |
| `clientName` | string(256) | – | |
| `summary` | string(500) | ✔ | |
| `body` | string (HTML) | – | detail page |
| `logoId` | uuid | ✔ | client logo |
| `coverImageId` | uuid | ✔ | |

### 4.4 Portfolios: `/cms/portfolios` *(to be confirmed)*

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | |
| `summary` | string(500) | – | |
| `imageId` | uuid | ✔ | |
| `link` | url | – | |

> If the fields turn out to match Case Studies, drop this resource and add `type: "case-study" | "portfolio"` to `case-studies` instead.

### 4.5 Industries: `/cms/industries`

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | |
| `description` | string(1000) | ✔ | |
| `imageId` | uuid | ✔ | |

### 4.6 Services: `/cms/services`

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | |
| `description` | string(1000) | ✔ | |
| `iconId` | uuid | – | icon / illustration |
| `link` | string | – | internal page, e.g. `/solutions` |

### 4.7 Careers: `/cms/careers`

Extra filters: `employmentType`, `isOpen`.

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | string(256) | ✔ | |
| `slug` | string(256) | ✔ | |
| `department` | string(100) | – | |
| `location` | string(100) | ✔ | e.g. `Jakarta`, `Remote` |
| `employmentType` | `full-time` \| `contract` \| `internship` | ✔ | |
| `description` | string (HTML) | ✔ | |
| `requirements` | string (HTML) | – | |
| `applyUrl` | url | – | either `applyUrl` or `applyEmail` is required |
| `applyEmail` | email | – | |
| `closingDate` | date | – | |
| `isOpen` | boolean | ✔ | default `true` |

### 4.8 Clients: `/cms/clients`

Merges **Clients**, **E-Office Clients**, and **IT Friendlies**.
Extra filter: `showOn` (can be repeated: `?showOn=home&showOn=e-office`).

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `name` | string(256) | ✔ | |
| `logoId` | uuid | ✔ | |
| `website` | url | – | |
| `showOn` | (`home` \| `e-office` \| `it-friendly`)[] | ✔ | min 1; **multi-select**, so one logo can appear on several pages |

Example item:
```json
{
  "id": "1a2b...",
  "name": "PT Contoh Energi",
  "logo": { "id": "...", "url": "...", "width": 240, "height": 80, "alt": "PT Contoh Energi logo" },
  "website": "https://contoh.co.id",
  "showOn": ["home", "e-office"],
  "status": "published",
  "order": 3,
  "createdAt": "2026-11-10T07:00:00Z",
  "updatedAt": "2026-11-10T07:00:00Z"
}
```

`order` applies globally. If a different order per page is needed, use `orderBy: { "home": 3, "e-office": 1 }` instead (to be decided).

### 4.9 Testimonials: `/cms/testimonials`

Merges **Testimoni Videos**, **E-Office-Testimonis**, **E-Office-Email-Testimonis**, and **Delva-Testimonis**.
Extra filters: `category`, `format`.

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `category` | `home` \| `e-office` \| `e-office-email` \| `delva` | ✔ | page where the testimonial appears |
| `format` | `text` \| `video` | ✔ | |
| `name` | string(256) | ✔ | |
| `role` | string(256) | ✔ | job title |
| `company` | string(256) | – | |
| `quote` | string(2000) | ✔ if `format = text` | |
| `avatarId` | uuid | – | |
| `videoUrl` | url | ✔ if `format = video` | YouTube/Vimeo embed URL |
| `thumbnailId` | uuid | – | video thumbnail |

Conditional validation must run on the backend, with errors keyed by field name (e.g. `errors.videoUrl`).

Example item:
```json
{
  "id": "9c8d...",
  "category": "delva",
  "format": "text",
  "name": "Budi Santoso",
  "role": "Head of Operations",
  "company": "PT Contoh",
  "quote": "Delva helps our team ...",
  "avatar": { "id": "...", "url": "...", "width": 160, "height": 160, "alt": "Budi Santoso" },
  "videoUrl": null,
  "thumbnail": null,
  "status": "published",
  "order": 1,
  "createdAt": "2026-11-10T07:00:00Z",
  "updatedAt": "2026-11-10T07:00:00Z"
}
```

---

## 5. CMS: Media

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/cms/media` | `multipart/form-data`: `file` (required), `alt` (string), `folder` (e.g. `news`, `clients`) |
| GET | `/cms/media` | paginated list, filter `folder`, `search` |
| PATCH | `/cms/media/{id}` | `{ "alt": "..." }` |
| DELETE | `/cms/media/{id}` | `409` if still used by an item |

Constraints:
- Images: `jpg`, `png`, `webp`, `svg`, max 5 MB.
- The response must include `width` and `height`; the frontend uses them to prevent layout shift.
- `url` must be a public URL (CDN or static).

Response `201`: a Media object (section 1.5).

---

## 6. Public API (website)

No auth. Returns **only `status = published`** items, sorted by `order` (News by `-publishedAt`).
Cache: `Cache-Control: public, max-age=60` is recommended.

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/public/news` | `page`, `pageSize`, `search`, `category` (slug) |
| GET | `/public/news/{slug}` | detail |
| GET | `/public/news-categories` | |
| GET | `/public/case-studies` | `search`, `category` |
| GET | `/public/case-studies/{slug}` | |
| GET | `/public/portfolios` | *(to be confirmed)* |
| GET | `/public/industries` | |
| GET | `/public/services` | |
| GET | `/public/careers` | only `isOpen = true` |
| GET | `/public/careers/{slug}` | |
| GET | `/public/clients?showOn=home` | `showOn` required |
| GET | `/public/testimonials?category=delva` | `category` required, `format` optional |

The response shape matches the CMS endpoints, without `createdBy`/`updatedBy`.

---

## 7. Website Forms (already used by the frontend)

### 7.1 Contact
`POST /contact`

```json
{
  "fullName": "Rifaldi Raya",
  "companyName": "PT Contoh",
  "workEmail": "rifaldi@contoh.co.id",
  "whatsappNumber": "+6281234567890",
  "source": "website-contact-page"
}
```

| Field | Rule |
| --- | --- |
| `fullName` | 2–256 characters |
| `companyName` | 2–256 characters |
| `workEmail` | valid email, max 256 |
| `whatsappNumber` | Indonesian mobile number `^(?:\+?62\|0)8\d{7,12}$` (the frontend strips spaces/dashes first) |
| `source` | `website-contact-page` \| `website-product-e-office` \| `website-product-e-office-email` \| `website-product-delva` |

Response `201`:
```json
{ "success": true, "data": { "id": "c0ffee...", "receivedAt": "2026-11-10T07:00:00Z" } }
```

### 7.2 Newsletter
`POST /newsletter`

```json
{ "email": "rifaldi@contoh.co.id", "language": "en" }
```

Response `200`:
```json
{ "success": true, "data": { "subscribed": true } }
```

An email that is already subscribed still returns `200` with `subscribed: true` (idempotent).

### 7.3 (Optional) CMS endpoints for leads

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/cms/contact-submissions` | paginated, filter `source`, `from`, `to` |
| GET | `/cms/newsletter-subscribers` | paginated, export `?format=csv` |

---

## 8. Non-functional Requirements

- **CORS**: allow the frontend origins (`http://localhost:3000`, staging, production).
- **Rate limit**: `/account/login`, `/contact`, and `/newsletter`, e.g. 10 requests/minute/IP.
- **Sanitisation**: HTML fields (`body`, `description`, `requirements`) must be sanitised on the backend.
- **Slugs**: unique per resource; on conflict return `409` with `errors.slug`.
- **Soft delete**: recommended for every content item, so accidental deletes can be restored.
- **Audit**: `createdBy`/`updatedBy` taken from the JWT `username`.

---

## 9. Open Questions for the Backend

1. Do **Portofolios** and **Case Studies** have the same fields? If yes, merge them using `type`.
2. Do **IT Friendlies** only contain name + logo? If not, they become a separate resource.
3. Is `order` for Clients global or per page (`orderBy`)?
4. Media storage: local, S3/MinIO, or Azure Blob? What is the final CDN URL?
5. Access token lifetime (the frontend currently assumes a 30-minute session) and the refresh token lifetime.
6. Do the public endpoints need an API key, or can they stay fully open?
