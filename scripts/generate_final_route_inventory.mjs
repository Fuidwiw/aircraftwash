import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const canonicalHost = "https://ozarkaircraftwash.com";

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function routeFile(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
}

function text(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&rsquo;/gi, "’")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&middot;/gi, "·")
    .replace(/\s+/g, " ")
    .trim();
}

function attribute(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "—";
}

function pageType(route) {
  if (route === "/") return "Homepage";
  if (route === "/services/") return "Service hub";
  if (route === "/aircraft/") return "Aircraft hub";
  if (route === "/airports/") return "Airport hub";
  if (route === "/resources/") return "Resource hub";
  if (route === "/404.html") return "404 utility";
  if (route === "/full-aircraft-ceramic-coating/") return "Retired fallback";
  if (route.startsWith("/airports/")) return "Airport service area";
  if (route.startsWith("/aircraft/")) return "Aircraft category";
  if (route.startsWith("/resources/")) return "Resource article";
  if (route === "/aircraft-washing-springfield-mo/" || route === "/aircraft-washing-branson-mo/") return "Regional service";
  return "Service";
}

function primaryLinks(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const withoutBreadcrumbs = main.replace(/<nav\s+class=["']breadcrumbs["'][\s\S]*?<\/nav>/gi, " ");
  const links = [];
  const seen = new Set();
  for (const match of withoutBreadcrumbs.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const label = text(match[2]);
    if (!label || seen.has(href)) continue;
    seen.add(href);
    links.push(`${label} → ${href}`);
    if (links.length === 6) break;
  }
  return links.length ? links.join("<br>") : "—";
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

const sitemap = read("sitemap.xml");
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/ozarkaircraftwash\.com(.*?)<\/loc>/gi)].map((match) => match[1]);
const documents = [
  ...sitemapRoutes.map((route) => ({ route, file: routeFile(route), sitemap: "Yes" })),
  { route: "/404.html", file: "404.html", sitemap: "No" },
  { route: "/full-aircraft-ceramic-coating/", file: "full-aircraft-ceramic-coating/index.html", sitemap: "No" }
];

const rows = documents.map(({ route, file, sitemap: inSitemap }) => {
  const html = read(file);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const canonical = attribute(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const robots = attribute(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  return [
    route,
    pageType(route),
    canonical,
    inSitemap,
    robots,
    text(attribute(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)),
    text(attribute(html, /<title>([\s\S]*?)<\/title>/i)),
    attribute(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i),
    text(main).split(/\s+/).filter(Boolean).length,
    primaryLinks(html)
  ].map(escapeCell);
});

const output = `# Final Route Inventory

Generated from the current static HTML and \`sitemap.xml\` on September 5, 2026. The inventory covers all 46 canonical public pages, the branded 404 document, and the retired full-ceramic fallback.

| Route | Page type | Canonical URL | In sitemap | Robots | H1 | Title | Meta description | Main words | Primary internal links |
|---|---|---|---|---|---|---|---|---:|---|
${rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}

## Inventory rules

- Canonical public pages must be indexable and included exactly once in \`sitemap.xml\`.
- \`404.html\` is a noindex utility page and has no canonical URL.
- The retired ceramic fallback is noindex and canonicals to the currently offered spray ceramic protection page.
- “Primary internal links” lists the first six distinct, non-breadcrumb internal links in main content; navigation and footer links are intentionally excluded.
- Regenerate this file with \`node scripts/generate_final_route_inventory.mjs\` after a route, title, description, canonical, indexability, H1, or main-content link changes.
`;

fs.writeFileSync(path.join(root, "FINAL_ROUTE_INVENTORY.md"), output);
console.log(`Generated final route inventory for ${documents.length} documents (${sitemapRoutes.length} canonical public pages).`);
