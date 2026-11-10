import type { NavDropdown } from "@/types/content";

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export const isActivePath = (pathname: string, href: string) => normalize(pathname) === normalize(href);

export const isDropdownActive = (pathname: string, item: NavDropdown) =>
  item.children.some((child) => isActivePath(pathname, child.href));
