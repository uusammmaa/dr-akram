/** Locale-neutral public paths (no trailing slash) */
export const PUBLIC_ROUTES = [
  "",
  "/about",
  "/books",
  "/lectures",
  "/honors",
  "/services",
  "/afkar",
  "/contact",
  "/questions",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
