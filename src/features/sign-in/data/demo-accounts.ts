/** Dummy CMS accounts. Sign-in checks against this list only; there is no backend call yet. */
export interface DemoAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: "Superadmin" | "Editor";
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-superadmin",
    username: "admin",
    name: "Rekadia Admin",
    email: "admin@rekadia.co.id",
    password: "RekadiaCMS1",
    role: "Superadmin",
    description: "Full access, including user and role settings",
  },
  {
    id: "demo-editor",
    username: "editor",
    name: "Content Editor",
    email: "editor@rekadia.co.id",
    password: "EditorCMS1",
    role: "Editor",
    description: "Manages collections and their items",
  },
];

export const findDemoAccount = (emailOrUserName: string, password: string) => {
  const login = emailOrUserName.trim().toLowerCase();
  return DEMO_ACCOUNTS.find(
    (account) => (account.email === login || account.username === login) && account.password === password,
  );
};
