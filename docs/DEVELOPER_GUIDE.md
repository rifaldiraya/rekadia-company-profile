# Developer Guide — RKD Next.js Template

Step-by-step guide for developers using this boilerplate for the first time.

**Stack:** Next.js 15 (App Router) · React 19 · Material UI 7 · NextAuth · TanStack Query · Zustand · React Hook Form + Yup

---

## 1. Prerequisites

Install the following before you start:

| Tool | Recommended version | Notes |
|------|---------------------|--------|
| **Node.js** | 20.x or 22.x (LTS) | Required by Next.js 15 |
| **pnpm** | Latest | Used in project scripts (`pnpm dev`, `pnpm build:*`). npm or yarn also work if you keep a lock file for Husky |
| **Git** | Latest | For version control and Husky hooks |

Verify installations:

```bash
node -v
pnpm -v
```

---

## 2. Get the project

### Option A — Clone from repository

```bash
git clone <repository-url>
cd RKD.TEMPLATE.2026.APP
```

### Option B — Copy the template

Copy the folder to your new project directory, then initialize Git if needed:

```bash
cd <your-project-folder>
git init
```

---

## 3. Install dependencies

From the project root:

```bash
pnpm install
```

> **Note:** `.npmrc` sets `legacy-peer-deps=true` to avoid peer dependency conflicts with MUI and React 19.

Husky is configured via the `prepare` script and runs on install. Pre-commit hooks run `lint` with zero warnings allowed.

---

## 4. Configure environment variables

The template ships with three env files:

| File | Purpose |
|------|---------|
| `.env.development` | Local / dev API and auth settings |
| `.env.staging` | Staging build |
| `.env.production` | Production build |

### 4.1 What gets copied automatically

When you run `pnpm dev`, the `predev` script copies `.env.development` → `.env.local`.

When you run `pnpm build:dev`, `prebuild:dev` does the same. Staging and prod builds copy from `.env.staging` and `.env.production` respectively.

You normally **do not** edit `.env.local` by hand; change the source env file for your target environment.

### 4.2 Variables you must review

Open `.env.development` and adjust at least:

```env
# API base URL (server + client)
BASE_URL=https://your-api.example.com/services/api/v1
NEXT_PUBLIC_BASE_URL=https://your-api.example.com/services/api/v1

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-a-strong-secret>
JWT_SECRET=<generate-a-strong-secret>

# MUI X Premium license (Data Grid, Date Pickers Pro)
NEXT_PUBLIC_MUI_LICENSE=<your-mui-license-key>
```

### 4.3 Generate secure secrets (do not use `secret` in production)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run twice: once for `NEXTAUTH_SECRET`, once for `JWT_SECRET`.

### 4.4 Branding (optional)

Update display names in `src/constants.ts`:

- `BRAND_NAME`
- `APP_NAME`

---

## 5. Run the development server

```bash
pnpm dev
```

1. `predev` copies `.env.development` to `.env.local`
2. Next.js starts at **http://localhost:3000**

### First login

- Unauthenticated users are redirected to `/sign-in` (see `src/middleware.ts`)
- Public routes: `sign-in`, `forgot-password`, `reset-password`, and NextAuth API routes
- Use credentials that match your backend API (configured via `BASE_URL`)

---

## 6. Understand the folder structure

```
src/
├── app/                    # Next.js App Router (pages & layouts only)
│   ├── (authentication)/ # Auth-related routes
│   └── (dashboard)/      # Protected app shell
├── components/
│   ├── core/               # Reusable UI (forms, datagrid, dialog, …)
│   └── layout/             # App chrome (drawer, app bar, …)
├── config/                 # Theme, menu, routes, access control, query client
├── features/               # Feature modules (main place for business logic)
│   └── <feature-name>/
│       ├── components/
│       ├── hook/
│       ├── store/          # Zustand (when needed)
│       ├── schema/         # Yup validation
│       └── *-page.tsx      # Page entry component
├── utils/                  # Helpers (e.g. http-client)
├── constants.ts            # Env-backed constants
└── middleware.ts           # Auth route protection
```

### Naming conventions

- **Files and folders:** `kebab-case` (e.g. `user-form-modal.tsx`, `use-get-roles.ts`)
- **Imports:** use the `@/` alias → `src/` (see `tsconfig.json`)

### Style guide

Follow the [Airbnb React style guide](https://airbnb.io/javascript/react/) unless the codebase already differs.

---

## 7. How routing works

- Routes live under `src/app/` using [App Router](https://nextjs.org/docs/app)
- **Thin pages:** route files should mostly import a feature page with `dynamic()` when client-only:

```tsx
'use client'

import dynamic from 'next/dynamic';

const UsersPage = dynamic(
  () => import('@/features/users/users-page'),
  { ssr: false }
);

export default function Page() {
  return <UsersPage />;
}
```

- Add menu entries in `src/config/menu.config.tsx`
- Shared route constants: `src/config/route.ts`

---

## 8. Add a new feature (checklist)

Use this when building a new module (e.g. “Products”).

### Step 1 — Create the feature folder

```
src/features/products/
├── components/
├── hook/
├── schema/          # if forms exist
└── products-page.tsx
```

### Step 2 — API + data fetching

1. Add API functions using `httpClient` from `src/utils/http-client.ts`
2. Wrap calls in TanStack Query hooks under `hook/`

Example pattern (from roles):

```ts
import httpClient from "@/utils/http-client";
import { useQuery } from "@tanstack/react-query";

export const getProductsApi = () => httpClient.get("/products");

export default function useGetProducts() {
  return useQuery({
    queryFn: getProductsApi,
    queryKey: ["products"],
  });
}
```

### Step 3 — Forms (if needed)

- Schema: `schema/` with **Yup**
- Form: **react-hook-form** + `yupResolver`
- Reuse fields from `src/components/core/form/`

### Step 4 — Add the route

Create `src/app/(dashboard)/products/page.tsx` that imports your feature page (see §7).

### Step 5 — Sidebar menu

Add an item in `src/config/menu.config.tsx` (`mainMenuConfig` or `secondMenuConfig`).

### Step 6 — Access control (if restricted)

1. Add module to `ModuleNameEnum` in `src/config/access-control.config.ts`
2. Set `moduleName` on the menu item
3. Wrap sensitive UI with `AccessController` from `src/components/access-controller.tsx`

---

## 9. Authentication overview

- **NextAuth** handles sessions; see auth API routes under `src/app/api/auth/`
- **Middleware** (`src/middleware.ts`) protects dashboard routes
- API calls attach `Bearer` token via `http-client` interceptors
- 401 responses redirect to `/sign-in`

Regenerate `NEXTAUTH_SECRET` for every new deployment environment.

---

## 10. Build for deployment

| Command | Env source copied to `.env.local` |
|---------|-----------------------------------|
| `pnpm build:dev` | `.env.development` |
| `pnpm build:staging` | `.env.staging` |
| `pnpm build:prod` | `.env.production` |

Then start the production server:

```bash
pnpm start
```

CI pipelines are defined in `azure-pipeline-dev.yml`, `azure-pipeline-staging.yml`, and `azure-pipeline-prod.yml`.

---

## 11. Code quality

```bash
pnpm lint          # ESLint (Next + TypeScript + Prettier)
```

Pre-commit (Husky) runs lint with `--max-warnings 0`. Fix all warnings before committing.

---

## 12. Common building blocks

| Need | Location |
|------|----------|
| Data grid | `src/components/core/core-datagrid/` |
| Dialog | `CoreDialog` + `use-core-dialog` |
| Snackbar | `enqueueSnackbar` from `notistack` |
| Global loader | `use-app-loader` in `src/hook/` |
| Theme | `src/config/theme.config.ts` |
| React Query setup | `src/config/query-client.config.ts` |
| Providers | `src/app/provider.tsx` |

---

## 13. Update dependencies (optional)

```bash
npm i -g npm-check-updates
ncu -u
pnpm install
```

Test thoroughly after major upgrades (Next, MUI, React).

---

## 14. Further reading

- Project overview and patterns: [README.md](../README.md)
- Coding with Cursor AI in this repo: [DEVELOPER_AI_GUIDE.md](./DEVELOPER_AI_GUIDE.md)
- Deployment (Linux offline/online, IIS): [DEVELOPER_DEPLOYMENT_GUIDE.md](./DEVELOPER_DEPLOYMENT_GUIDE.md)

### Official docs

- [Next.js](https://nextjs.org/docs)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [NextAuth](https://next-auth.js.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)

---

## Quick reference

```bash
pnpm install          # Install deps + Husky
pnpm dev              # Dev server (port 3000)
pnpm lint             # Lint
pnpm build:dev        # Dev build
pnpm build:staging    # Staging build
pnpm build:prod       # Production build
pnpm start            # Run production build
```

**Support:** PT. Rekadia Solusi Teknologi — [rekadia.co.id](https://www.rekadia.co.id/)
