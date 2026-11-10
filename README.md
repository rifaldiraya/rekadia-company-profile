# Rekadia Nextjs Template (Next.js + Material UI)

- next.js: https://nextjs.org/docs
- material ui: https://mui.com/material-ui/getting-started/

## Style Guide

- airbnb: https://airbnb.io/javascript/react/

### File & Folder Naming

- use kebab-case for file and folder name (E.g., `user-profile/` & `user-profile.tsx`)

## Routing Method (Next.JS)

- App route: https://nextjs.org/docs/app

## Authentication

- Next Auth: https://next-auth.js.org/getting-started/example
  - Generate new NEXTAUTH_SECRET (env file): _`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`_
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware

## Folder Structure

- `app`: https://nextjs.org/docs/app/building-your-application/routing/defining-routes
- `components`
  - `core`: global reusable components
  - `layout`: app layout components
- `config`: app config
- `features`: used to separating all logic by feature
  - `[feature_name]`
    - `components`: feature components
    - `hook`: reusable custom hooks (https://react.dev/learn/reusing-logic-with-custom-hooks)
    - `store`: zustand state management (https://zustand-demo.pmnd.rs/)
    - `schema`: model/form validation using yup (https://www.npmjs.com/package/yup)
    - index file (example: `user.page.tsx`)
- `static`: big static variables
- `utils`: utility functions
- `constants.ts`: small variables to call env variables or just static constants
- `middleware.ts`: next.js middleware

## Form Management

- react-hook-form: https://react-hook-form.com/
- Validation resolver: @hookform/resolvers with yup (https://www.npmjs.com/package/yup)

```typescript
const form = useForm<Schema>({
  defaultValues: { ... },
  resolver: yupResolver(schema),
});
```

## State Management

- Zustand: https://zustand-demo.pmnd.rs/

```typescript
const useExampleStore = create<ExampleStore>((set) => ({
  value: null,
  setValue: (value) => set({ value }),
}));
```

## REST API Integration

- Create api function using **httpClient** from `src/utils/api-client.ts`
- Call the api function inside a hook using tanstack query: https://tanstack.com/query/latest
- Call hook inside component

## Access Control

- Add new module name to `ModuleNameEnum` enum in `src/config/access-control.config.ts`
- Remove list item in sidebar when user does not have access:
  - add `{ ...other, moduleName: ModuleNameEnum[<module_name>] }` in array object
- Remove element in UI:
  - use `AccessController` at `src/components/access-controller.tsx` to wrap component
- To add another action, add it in `ActionEnum` enum at `src/config/access-control.config.ts`

## Datagrid

- component: `CoreDataGrid` — `src/components/core/core-datagrid/*.tsx`
- hook: `useCoreDataGrid` — `src/components/core/core-datagrid/use-core-datagrid.ts`
- HOC (complete version): `withCoreDataGrid` — `src/components/core/core-datagrid/with-core-datagrid.tsx`

## Dialog

- component: `src/components/core/core-dialog.tsx`
- hook: `src/components/core/use-core-dialog.ts`

## Snackbar

- `import { enqueueSnackbar } from 'notistack'` — https://notistack.com/

## Error Boundary

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

- component: `src/components/error-boundary.tsx`

## App Loader

- hook: `src/hook/use-app-loader.tsx`

## Key Dependencies

| Package | Version | Docs |
|---|---|---|
| next | 15.x | https://nextjs.org |
| react | 19.x | https://react.dev |
| @mui/material | 7.x | https://mui.com |
| @mui/x-data-grid-premium | 8.x | https://mui.com/x/react-data-grid |
| @tanstack/react-query | 5.x | https://tanstack.com/query |
| react-hook-form | 7.x | https://react-hook-form.com |
| zustand | 5.x | https://zustand-demo.pmnd.rs |
| yup | 1.x | https://github.com/jquense/yup |
| next-auth | 4.x | https://next-auth.js.org |
| axios | 1.x | https://axios-http.com |
| dayjs | 1.x | https://day.js.org |
| notistack | 3.x | https://notistack.com |

## Dev Server

```bash
pnpm dev
```

## Build

```bash
pnpm build:dev
pnpm build:staging
pnpm build:prod
```

## Update Packages

```bash
npm i -g npm-check-updates
ncu -u
npm install
```