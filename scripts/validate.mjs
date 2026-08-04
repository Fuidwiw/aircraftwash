import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const canonicalHost = "https://ozarkaircraftwash.com";
const publicPages = new Map([
  ["/", "index.html"],
  ["/aircraft-washing-springfield-mo/", "aircraft-washing-springfield-mo/index.html"],
  ["/aircraft-washing-branson-mo/", "aircraft-washing-branson-mo/index.html"],
  ["/waterless-aircraft-wash/", "waterless-aircraft-wash/index.html"],
  ["/aircraft-ceramic-protection/", "aircraft-ceramic-protection/index.html"]
]);
const auxiliaryPages = ["404.html", "full-aircraft-ceramic-coating/index.html"];
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

function oneMatch(html, regex, label, file) {
  const matches = [...html.matchAll(regex)];
  if (matches.length !== 1) {
    fail(`${file}: expected one ${label}, found ${matches.length}`);
    return "";
  }
  return matches[0][1]?.trim() ?? "";
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) {
    result[match[1].toLowerCase()] = match[3];
  }
  return result;
}

function routeTarget(url) {
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "/") return "index.html";
  const relative = clean.replace(/^\//, "");
  const direct = path.join(root, relative);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return relative;
  return path.join(relative, "index.html").replaceAll("\\", "/");
}

const titles = new Map();
const descriptions = new Map();

for (const [route, file] of publicPages) {
  const html = read(file);
  const title = oneMatch(html, /<title>(.*?)<\/title>/gis, "title", file);
  const description = oneMatch(
    html,
    /<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/gis,
    "meta description",
    file
  );
  const canonical = oneMatch(
    html,
    /<link\s+rel=["']canonical["']\s+href=["'](.*?)["']\s*\/?>/gis,
    "canonical",
    file
  );

  if (!title) fail(`${file}: title is empty`);
  if (!description) fail(`${file}: meta description is empty`);
  if (titles.has(title)) fail(`${file}: duplicate title also used by ${titles.get(title)}`);
  if (descriptions.has(description)) fail(`${file}: duplicate meta description also used by ${descriptions.get(description)}`);
  titles.set(title, file);
  descriptions.set(description, file);

  const expectedCanonical = `${canonicalHost}${route}`;
  if (canonical !== expectedCanonical) fail(`${file}: canonical must be ${expectedCanonical}`);
  if (!canonical.startsWith(canonicalHost)) fail(`${file}: canonical host is inconsistent`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) fail(`${file}: must contain exactly one H1`);
  if (!/<html\s+lang=["']en["']/i.test(html)) fail(`${file}: missing lang="en"`);

  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["'][^"']+["']`, "i").test(html)) {
      fail(`${file}: missing ${property}`);
    }
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    if (!new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["'][^"']+["']`, "i").test(html)) {
      fail(`${file}: missing ${name}`);
    }
  }

  for (const block of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      fail(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1];
    if (href.startsWith("tel:") && href !== "tel:+14179890976") fail(`${file}: non-normalized telephone link ${href}`);
    if (href.startsWith("sms:") && href !== "sms:+14179890976") fail(`${file}: non-normalized SMS link ${href}`);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/full-aircraft-ceramic-coating")) fail(`${file}: links to unavailable full ceramic service`);
    if (href.startsWith("/airports/") || href.startsWith("/aircraft/")) fail(`${file}: links to an unpublished content group (${href})`);
    const target = routeTarget(href);
    if (!fs.existsSync(path.join(root, target))) fail(`${file}: broken internal link ${href}`);
    const fragment = href.includes("#") ? href.split("#")[1] : "";
    if (fragment) {
      const targetHtml = read(target);
      if (!new RegExp(`\\bid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(targetHtml)) {
        fail(`${file}: missing fragment target ${href}`);
      }
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (!attrs.src) fail(`${file}: image is missing src`);
    if (!attrs.width || !attrs.height) fail(`${file}: ${attrs.src ?? "image"} is missing dimensions`);
    if (!("alt" in attrs)) fail(`${file}: ${attrs.src ?? "image"} is missing alt text`);
    if (attrs.alt === "" && !attrs.src?.includes("ozark-aircraft-wash-logo")) fail(`${file}: meaningful image has empty alt text`);
    if (!attrs.srcset || !attrs.sizes) fail(`${file}: ${attrs.src ?? "image"} is missing responsive srcset or sizes`);
    if (attrs.alt && attrs.loading !== "lazy") fail(`${file}: below-the-fold image ${attrs.src ?? "image"} must be lazy-loaded`);
    if (attrs.src?.startsWith("/")) {
      const imagePath = attrs.src.replace(/^\//, "");
      if (!fs.existsSync(path.join(root, imagePath))) fail(`${file}: missing image ${attrs.src}`);
    }
  }

  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) {
      const asset = candidate.trim().split(/\s+/)[0];
      if (asset.startsWith("/") && !fs.existsSync(path.join(root, asset.replace(/^\//, "")))) {
        fail(`${file}: missing srcset image ${asset}`);
      }
    }
  }

  const prohibited = [
    /Lee['’]s Summit/i,
    /\bLXT\b/i,
    /\bwarbirds?\b/i,
    /\bhelicopters?\b/i,
    /\bmidsize jets?\b/i,
    /\blarge[- ]cabin jets?\b/i,
    /guaranteed same[- ]day/i,
    /24[- ]hour (?:availability|service)/i,
    /emergency aircraft washing/i,
    /FAA[- ]approved/i,
    /manufacturer[- ]approved/i,
    /official provider/i,
    /preferred provider/i
  ];
  for (const pattern of prohibited) {
    if (pattern.test(html)) fail(`${file}: prohibited or unsupported claim matched ${pattern}`);
  }
  if (/based at(?:\s+an?|\s+the)?\s+airport/i.test(html) && !/not represented as being based at/i.test(html)) {
    fail(`${file}: possible airport-base claim`);
  }
}

for (const file of [...publicPages.values(), ...auxiliaryPages]) {
  const html = read(file);
  for (const match of html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)=["']([^"']+)["'][^>]*>/gi)) {
    const asset = match[1];
    if (!asset.startsWith("/") || asset.startsWith("//")) continue;
    const target = routeTarget(asset);
    if (!fs.existsSync(path.join(root, target))) fail(`${file}: missing linked asset ${asset}`);
  }
}

const retired = read("full-aircraft-ceramic-coating/index.html");
if (!/<meta\s+name=["']robots["']\s+content=["']noindex, follow["']/i.test(retired)) fail("Retired ceramic page must be noindex, follow");
if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/ozarkaircraftwash\.com\/aircraft-ceramic-protection\/["']/i.test(retired)) fail("Retired ceramic page must canonicalize to spray protection");
if (!/not currently available/i.test(retired)) fail("Retired ceramic page must state that the service is unavailable");

const sitemap = read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gi)].map((match) => match[1].trim());
const expectedUrls = [...publicPages.keys()].map((route) => `${canonicalHost}${route}`);
for (const url of expectedUrls) if (!sitemapUrls.includes(url)) fail(`sitemap.xml: missing ${url}`);
for (const url of sitemapUrls) if (!expectedUrls.includes(url)) fail(`sitemap.xml: unpublished or noncanonical URL ${url}`);
if (sitemapUrls.length !== new Set(sitemapUrls).size) fail("sitemap.xml: duplicate URLs");
if (/full-aircraft-ceramic-coating/i.test(sitemap)) fail("sitemap.xml: contains unavailable ceramic page");

const robots = read("robots.txt");
if (!robots.includes(`Sitemap: ${canonicalHost}/sitemap.xml`)) fail("robots.txt: canonical sitemap URL is missing");
if (/Disallow:\s*\/(?:assets|images)/i.test(robots)) fail("robots.txt: blocks required assets");

const pricing = read("assets/js/pricing.js");
const requiredPriceGroups = {
  single: ["$225", "$275", "$750", "$250", "$350", "$175/month", "$75", "$100", "$150"],
  twin: ["$350", "$425", "$1,200", "$400", "$550", "$300/month", "$125", "$175", "$250"],
  turboprop: ["$525", "$650", "$2,000", "$700", "$850", "$500/month", "$200", "$300", "$400"],
  vlj: ["$700", "$850", "$3,000", "$1,000", "$1,250", "$700/month", "$300", "$450", "$500"],
  lightjet: ["$1,000", "$1,250", "$4,500", "$1,500", "$1,800", "$1,000/month", "$450", "$600", "$600"]
};
for (const [category, values] of Object.entries(requiredPriceGroups)) {
  const block = pricing.match(new RegExp(`${category}: \\{([\\s\\S]*?)\\n  \\}`, "m"))?.[1] ?? "";
  if (!block) fail(`pricing.js: missing ${category} category`);
  for (const price of values) if (!block.includes(`"${price}"`)) fail(`pricing.js: ${category} is missing preserved price ${price}`);
}
if (/full ceramic|\bcoat:/i.test(pricing)) fail("pricing.js: unavailable full ceramic pricing remains");

const imageBudget = {
  modern: ["ozark-aircraft-wash-logo-1200.avif", "yellow-black-aircraft-exterior-500.avif", "yellow-black-aircraft-hangar-side-960.avif", "yellow-black-aircraft-glossy-nose-960.avif"],
  fallback: ["ozark-aircraft-wash-logo.jpg", "yellow-black-aircraft-exterior.jpg", "yellow-black-aircraft-hangar-side.jpg", "yellow-black-aircraft-glossy-nose.jpg"]
};
const modernBytes = imageBudget.modern.reduce((sum, name) => sum + fs.statSync(path.join(root, "images", name)).size, 0);
const fallbackBytes = imageBudget.fallback.reduce((sum, name) => sum + fs.statSync(path.join(root, "images", name)).size, 0);
if (modernBytes > 450 * 1024) fail(`Homepage modern image payload ${modernBytes} exceeds 450 KiB budget`);
if (fallbackBytes > 900 * 1024) fail(`Homepage JPEG fallback payload ${fallbackBytes} exceeds 900 KiB budget`);

const requiredPageImages = new Map([
  ["index.html", ["ozark-aircraft-wash-logo", "yellow-black-aircraft-exterior", "yellow-black-aircraft-hangar-side", "yellow-black-aircraft-glossy-nose"]],
  ["aircraft-washing-springfield-mo/index.html", ["yellow-black-aircraft-exterior"]],
  ["aircraft-washing-branson-mo/index.html", ["yellow-black-aircraft-hangar-side"]],
  ["waterless-aircraft-wash/index.html", ["yellow-black-aircraft-exterior"]],
  ["aircraft-ceramic-protection/index.html", ["yellow-black-aircraft-glossy-nose"]]
]);
for (const [file, stems] of requiredPageImages) {
  const html = read(file);
  for (const stem of stems) {
    if (!html.includes(`/images/${stem}`)) fail(`${file}: missing documented approved-library image ${stem}`);
  }
}

const sourceImages = ["hero-aircraft.jpg", "aircraft-1.jpg", "aircraft-2.jpg", "aircraft-3.jpg"];
for (const filename of sourceImages) {
  if (!fs.existsSync(path.join(root, "images", "source", filename))) fail(`images/source: missing approved original ${filename}`);
}

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Validated ${publicPages.size} public pages plus 404 and retired-service fallback.`);
console.log(`Canonical host: ${canonicalHost}`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Largest responsive modern image set: ${(modernBytes / 1024).toFixed(1)} KiB / 450 KiB budget`);
console.log(`JPEG fallback image set: ${(fallbackBytes / 1024).toFixed(1)} KiB / 900 KiB budget`);
console.log("All validation checks passed.");
