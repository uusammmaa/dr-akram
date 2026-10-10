/** Maps structure IDs from sanity/structure.ts to sidebar labels (fallback lookup). */
const STRUCTURE_LABELS: Record<string, string> = {
  "tour-site-settings": "Site Settings",
  "tour-about-page": "About Page",
  "tour-books": "Books",
  "tour-qa": "Q&A",
  "tour-honors": "Honors & Awards",
  "tour-lectures": "Lectures",
  "tour-help": "Help",
};

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function normalizePath(href: string): string {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href.split("?")[0]?.split("#")[0] ?? href;
  }
}

function getStudioBasePath(): string {
  const { pathname } = window.location;
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return "/studio";
  }
  return "";
}

function getStructureRootPath(): string {
  const base = getStudioBasePath();
  return base ? `${base}/structure` : "/structure";
}

function hrefMatchesStructureId(href: string, id: string): boolean {
  const normalized = normalizePath(href);
  return (
    normalized.includes(`/structure/${id}`) ||
    normalized.endsWith(`/${id}`) ||
    normalized.includes(`/${id};`)
  );
}

function toHighlightElement(anchor: HTMLElement): HTMLElement {
  return (
    anchor.closest('[data-as="PaneItem"]') ??
    anchor.closest("li") ??
    anchor.closest('[role="listitem"]') ??
    anchor
  );
}

function getStructureAnchors(): HTMLAnchorElement[] {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).filter(
    (a) => normalizePath(a.getAttribute("href") ?? a.href).includes("structure")
  );
}

/** Find a structure sidebar link by its `.id()` from structure.ts. */
export function findStructureLink(id: string): HTMLElement | null {
  for (const anchor of getStructureAnchors()) {
    const href = anchor.getAttribute("href") ?? anchor.href;
    if (hrefMatchesStructureId(href, id)) {
      return toHighlightElement(anchor);
    }
  }

  const label = STRUCTURE_LABELS[id];
  if (label) {
    return findPaneItemByLabel(label);
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(`[guided-tour] Could not find structure link: ${id}`);
  }
  return null;
}

/** Fallback: find a visible pane row by exact label text. */
export function findPaneItemByLabel(
  label: string,
  paneIndex = 0
): HTMLElement | null {
  const panes = getStructurePanes();
  const pane = panes[paneIndex] ?? panes[0];
  if (!pane) return null;

  const candidates = pane.querySelectorAll<HTMLElement>(
    'a[href], [role="listitem"], [data-as="PaneItem"], li'
  );

  for (const el of candidates) {
    const text = el.textContent?.trim();
    if (text === label || text?.startsWith(label)) {
      const anchor = el.closest("a") ?? (el.tagName === "A" ? el : null);
      return toHighlightElement((anchor as HTMLElement) ?? el);
    }
  }

  return null;
}

function getStructurePanes(): HTMLElement[] {
  const anchors = getStructureAnchors();
  const paneRoots = new Set<HTMLElement>();

  for (const anchor of anchors) {
    const pane =
      anchor.closest('[data-testid="structure-tool-list-pane"]') ??
      anchor.closest('[data-ui="Pane"]') ??
      anchor.closest("aside");
    if (pane) paneRoots.add(pane as HTMLElement);
  }

  if (paneRoots.size > 0) {
    return Array.from(paneRoots);
  }

  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '[data-testid="structure-tool-list-pane"], [data-ui="Pane"]'
    )
  );
}

/** Poll until a structure link appears (e.g. nested About Page pane). */
export async function waitForStructureLink(
  id: string,
  timeoutMs = 2000
): Promise<HTMLElement | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const el = findStructureLink(id);
    if (el) return el;
    await delay(80);
  }
  return findStructureLink(id);
}

/** Click a structure item to open its nested pane. */
export async function openStructureItem(id: string): Promise<void> {
  const el = findStructureLink(id);
  if (!el) return;

  const clickable = el.closest("a") ?? el.querySelector("a") ?? el;
  (clickable as HTMLElement).click();
  await delay(200);
}

function isOnStructureTool(pathname: string): boolean {
  const base = getStudioBasePath();
  const structureRoot = getStructureRootPath();

  if (pathname === structureRoot || pathname.startsWith(`${structureRoot}/`)) {
    return true;
  }

  if (base && (pathname === base || pathname === `${base}/`)) {
    return true;
  }

  if (!base && pathname.startsWith("/structure")) {
    return true;
  }

  return false;
}

function findStructureRootLink(): HTMLAnchorElement | null {
  const base = getStudioBasePath();
  const structureRoot = getStructureRootPath();
  const exactPaths = new Set([
    structureRoot,
    `${structureRoot}/`,
    ...(base ? [base, `${base}/`] : []),
  ]);

  for (const anchor of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    const path = normalizePath(anchor.getAttribute("href") ?? anchor.href);
    if (exactPaths.has(path)) {
      return anchor;
    }
  }

  return null;
}

function clickStructureToolNav(): boolean {
  const rootLink = findStructureRootLink();
  if (rootLink) {
    rootLink.click();
    return true;
  }

  const structureTab = Array.from(
    document.querySelectorAll<HTMLElement>("a, button, [role='tab']")
  ).find((el) => el.textContent?.trim() === "Structure");

  if (structureTab) {
    structureTab.click();
    return true;
  }

  return false;
}

/** Ensure the structure tool sidebar is visible (not navbar Help-only view). */
export async function navigateToStructureRoot(): Promise<void> {
  const { pathname } = window.location;

  if (isOnStructureTool(pathname)) {
    return;
  }

  const onNavbarHelp = /\/help\/?$/.test(pathname);
  if (onNavbarHelp) {
    clickStructureToolNav();
    await delay(350);
    return;
  }

  const rootLink = findStructureRootLink();
  if (rootLink) {
    rootLink.click();
    await delay(250);
  }
}
