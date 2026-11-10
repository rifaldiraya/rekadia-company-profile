# Developer AI Guide — Coding with Cursor in RKD Template

How to work effectively with **Cursor Agent** (and Chat) in this boilerplate so generated code matches project conventions and stays maintainable.

For first-time setup (install, env, run dev), see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

---

## 1. What Cursor should know about this project

When you start a task, give the agent enough context. Prefer **@-mentions** of real files over vague descriptions.

| Topic | Tell the AI / @-mention |
|-------|------------------------|
| Architecture | `README.md`, `docs/DEVELOPER_GUIDE.md` |
| Folder layout | `src/features/` (example: `src/features/users/`) |
| Routing | `src/app/(dashboard)/`, `src/config/menu.config.tsx` |
| API layer | `src/utils/http-client.ts`, any existing `hook/use-*.ts` in the feature |
| Forms | `src/components/core/form/`, `src/features/*/schema/` |
| Access control | `src/config/access-control.config.ts`, `src/components/access-controller.tsx` |
| UI shell | `src/components/layout/`, `src/config/theme.config.ts` |
| Auth | `src/middleware.ts`, sign-in feature under `src/features/sign-in/` |

---

## 2. Golden rules for AI-generated code

Ask Cursor to follow these every time:

1. **Feature-first** — Business logic lives in `src/features/<name>/`, not bloated route files under `src/app/`.
2. **Thin App Router pages** — `src/app/**/page.tsx` only wires the route; use `dynamic(..., { ssr: false })` for heavy client pages (match existing pages).
3. **kebab-case** — All new files and folders: `my-new-hook.ts`, `order-list-page.tsx`.
4. **`@/` imports** — Never use long relative paths like `../../../utils`.
5. **Reuse core components** — Forms, datagrid, dialog, layout from `src/components/core/` and `src/components/layout/`.
6. **Minimal diff** — Only change files required for the task; do not refactor unrelated modules.
7. **Match existing patterns** — Copy structure from the closest feature (users, roles, access-control).

---

## 3. Recommended Cursor setup

### 3.1 Project rules (optional but valuable)

Create `.cursor/rules/` or a root `AGENTS.md` with your team rules, for example:

- Always use `httpClient` from `@/utils/http-client` (not a new axios instance)
- Yup + react-hook-form for forms
- TanStack Query for server state; Zustand only for UI/local feature state
- No secrets in commits (`.env.local` is generated, not hand-edited for sharing)

You can use Cursor’s **Create Rule** skill or add rules manually so every agent session inherits them.

### 3.2 Context hygiene

- **Open relevant files** before asking (e.g. the feature you are extending).
- Use **@Folder** on `src/features/<feature>` for scoped changes.
- For new features, @ an existing feature folder as a template: `@src/features/roles`.

### 3.3 Agent vs Chat

| Use | When |
|-----|------|
| **Agent** | Multi-file features, new routes, hooks, menus, access control |
| **Chat** | Explain code, review diff, single-file tweaks |
| **Plan mode** | Large refactors or unclear requirements before coding |

---

## 4. Prompt templates (copy and adapt)

### 4.1 New feature module

```text
Add a new feature "<FeatureName>" following the same structure as @src/features/users.

Requirements:
- API: GET/POST ... (endpoints)
- Page at route /...
- Menu entry under secondMenuConfig with moduleName if access-controlled
- Use httpClient, TanStack Query hooks in hook/, Yup schema for forms
- App route: thin page with dynamic import and ssr: false
- kebab-case file names, @/ imports only

Do not change unrelated features. Reuse CoreDataGrid / core form components where applicable.
```

### 4.2 New API hook only

```text
In @src/features/<feature>/hook/, add use-<action>.ts following @src/features/roles/hook/use-get-roles.ts.

- Export a named API function (getXxxApi) using httpClient from @/utils/http-client
- useMutation or useQuery with a stable queryKey
- Types for request/response in the same file or a small types file if large
```

### 4.3 Form + validation

```text
Add a form in @src/features/<feature>/components/ using react-hook-form and yupResolver.

- Schema in @src/features/<feature>/schema/ (Yup), mirror @src/features/users/schema/
- Fields: CoreTextField / CoreAutocomplete from @src/components/core/form
- Submit via existing mutation hook pattern; show errors with enqueueSnackbar on failure
```

### 4.4 Access-controlled UI

```text
Restrict "<button/page>" to users with module "<ModuleNameEnum.X>" and action ActionEnum.Create.

- Add enum value in @src/config/access-control.config.ts if missing
- Wrap UI with @src/components/access-controller.tsx
- Add moduleName to menu item in @src/config/menu.config.tsx
```

### 4.5 Bug fix

```text
Fix: <describe symptom>

Repro: <steps>
Expected: <behavior>

Search only @src/features/<feature> and related app route. Explain root cause briefly, then minimal fix. Run pnpm lint on touched files.
```

---

## 5. Patterns the AI must follow

### 5.1 REST + TanStack Query

```ts
// hook/use-get-example.ts
import httpClient from "@/utils/http-client";
import { useQuery } from "@tanstack/react-query";

export const getExampleApi = () => httpClient.get<Example[]>("/example");

export default function useGetExample() {
  return useQuery({
    queryFn: getExampleApi,
    queryKey: ["example"],
  });
}
```

- **Do not** create a second axios client.
- **Do** invalidate or update `queryKey` on mutations (follow nearby features).

### 5.2 Forms

```ts
const form = useForm<Schema>({
  defaultValues: { ... },
  resolver: yupResolver(schema),
});
```

- Schemas in `schema/` with Yup.
- UI from `src/components/core/form/`.

### 5.3 Zustand

Use only for **UI state** (modals open, selected row, etc.) under `store/`, not for server data already in React Query.

### 5.4 Data grid

Prefer existing abstractions:

- `CoreDataGrid` — `src/components/core/core-datagrid/`
- `useCoreDataGrid` / `withCoreDataGrid` for list pages

Point Cursor at `src/features/roles/components/roles-grid.tsx` as a reference.

### 5.5 Notifications & dialogs

```ts
import { enqueueSnackbar } from "notistack";
// Core dialog: src/components/core/core-dialog.tsx + use-core-dialog.ts
```

---

## 6. File placement cheat sheet

| You are building | Put it here |
|------------------|-------------|
| Page UI + composition | `src/features/<x>/<x>-page.tsx` |
| Feature-only components | `src/features/<x>/components/` |
| API / query / mutation hooks | `src/features/<x>/hook/` |
| Yup schemas | `src/features/<x>/schema/` |
| Zustand store | `src/features/<x>/store/` |
| Next.js route | `src/app/(dashboard)/.../page.tsx` (thin) |
| Shared button/input/grid | `src/components/core/` (only if truly global) |
| Menu / theme / ACL config | `src/config/` |

---

## 7. What to avoid when using AI

| Avoid | Why |
|-------|-----|
| Large logic in `src/app/**/page.tsx` | Breaks feature-first architecture |
| `camelCase` or `PascalCase` file names | Conflicts with kebab-case convention |
| New HTTP libraries or fetch wrappers | `http-client` already handles auth + errors |
| Storing API data only in Zustand | Use TanStack Query |
| Editing `.env.local` in docs/commits | Generated by `predev` / `prebuild` scripts |
| Committing real `NEXTAUTH_SECRET` / licenses | Security risk |
| Rewriting core components for one screen | Extend or compose existing core UI |
| Ignoring `AccessController` / `ModuleNameEnum` | Security gaps on restricted modules |

---

## 8. Review checklist before you merge AI output

- [ ] Files are **kebab-case** and under the correct `features/` or `app/` path
- [ ] Imports use **`@/`**
- [ ] API uses **`httpClient`** and matches backend paths
- [ ] Server state uses **TanStack Query** with sensible `queryKey`
- [ ] Forms use **Yup + react-hook-form** and core form fields
- [ ] New routes have **menu entries** if they should appear in the sidebar
- [ ] Restricted actions use **`AccessController`** + `ModuleNameEnum`
- [ ] **`pnpm lint`** passes (Husky enforces zero warnings)
- [ ] No unrelated files changed
- [ ] Env/secrets not added to git

---

## 9. Example session workflow

1. **Read** [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) §8 and skim the closest feature in `src/features/`.
2. **Prompt** with @-mentions (template §4) and explicit “follow users/roles pattern”.
3. **Run** `pnpm dev` and test the route and API against your backend.
4. **Lint** — `pnpm lint` (or let agent run it).
5. **Commit** with a clear message; do not ask the agent to commit unless you want it to.

---

## 10. Troubleshooting with Cursor

| Problem | What to ask / check |
|---------|---------------------|
| 401 on API calls | Session/token; `http-client` redirect; `BASE_URL` in `.env.development` |
| Env not applied | Run `pnpm dev` so `predev` copies `.env.development` → `.env.local` |
| MUI X license warning | `NEXT_PUBLIC_MUI_LICENSE` in env file |
| Route 404 | File under `src/app/` + correct route group `(dashboard)` |
| Redirect to sign-in | `src/middleware.ts` matcher; route not in public list |
| AI used wrong path for API client | Correct file is `src/utils/http-client.ts` (not `api-client.ts`) |
| Lint fails on commit | Fix ESLint/Prettier issues; pre-commit allows 0 warnings |

---

## 11. Links

- Human setup guide: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- Deployment guide: [DEVELOPER_DEPLOYMENT_GUIDE.md](./DEVELOPER_DEPLOYMENT_GUIDE.md)
- Project README: [README.md](../README.md)
- [Cursor Docs](https://docs.cursor.com/)

---

**Tip:** The best prompts are specific, reference real files with `@`, and name the feature to mirror. Vague requests (“add a products page”) produce code that drifts from this template; anchored requests stay consistent with Rekadia’s boilerplate.
