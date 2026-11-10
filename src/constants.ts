export const DRAWER_WIDTH = 280;
export const APP_BAR_HEIGHT = 800;
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000/api";

export const JWT_COOKIE = "jwt";

export const BRAND_NAME = "Rekadia";
export const APP_NAME = "Rekadia";

export const THEME_BORDER_RADIUS = 10;
export const MUI_LICENSE = process.env.NEXT_PUBLIC_MUI_LICENSE ?? "";

export const { NEXTAUTH_URL } = process.env;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "secret";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const SUPER_ADMIN = "Superadmin";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
