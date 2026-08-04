import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const canonicalHost = "https://ozarkaircraftwash.com";
const airportRecords = JSON.parse(fs.readFileSync(path.join(root, "data", "airports.json"), "utf8"));
const airportPages = new Map(
  airportRecords.map((airport) => [`/airports/${airport.slug}/`, `airports/${airport.slug}/index.html`])
);
const publicPages = new Map([
  ["/", "index.html"],
  ["/services/", "services/index.html"],
  ["/services/aircraft-washing/", "services/aircraft-washing/index.html"],
  ["/aircraft-washing-springfield-mo/", "aircraft-washing-springfield-mo/index.html"],
  ["/aircraft-washing-branson-mo/", "aircraft-washing-branson-mo/index.html"],
  ["/waterless-aircraft-wash/", "waterless-aircraft-wash/index.html"],
  ["/services/wet-aircraft-washing/", "services/wet-aircraft-washing/index.html"],
  ["/services/aircraft-belly-cleaning/", "services/aircraft-belly-cleaning/index.html"],
  ["/services/aircraft-bug-removal/", "services/aircraft-bug-removal/index.html"],
  ["/services/aircraft-interior-cleaning/", "services/aircraft-interior-cleaning/index.html"],
  ["/aircraft-ceramic-protection/", "aircraft-ceramic-protection/index.html"],
  ["/services/monthly-aircraft-maintenance/", "services/monthly-aircraft-maintenance/index.html"],
  ["/resources/", "resources/index.html"],
  ["/resources/how-often-should-an-aircraft-be-washed/", "resources/how-often-should-an-aircraft-be-washed/index.html"],
  ["/resources/waterless-vs-wet-aircraft-washing/", "resources/waterless-vs-wet-aircraft-washing/index.html"],
  ["/resources/why-deionized-water-is-used-for-aircraft-washing/", "resources/why-deionized-water-is-used-for-aircraft-washing/index.html"],
  ["/resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/", "resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/index.html"],
  ["/resources/aircraft-belly-cleaning-guide/", "resources/aircraft-belly-cleaning-guide/index.html"],
  ["/resources/what-spray-ceramic-protection-does-for-aircraft/", "resources/what-spray-ceramic-protection-does-for-aircraft/index.html"],
  ["/resources/how-to-prepare-an-aircraft-for-mobile-washing/", "resources/how-to-prepare-an-aircraft-for-mobile-washing/index.html"],
  ["/aircraft/", "aircraft/index.html"],
  ["/aircraft/single-engine-aircraft-washing/", "aircraft/single-engine-aircraft-washing/index.html"],
  ["/aircraft/twin-piston-aircraft-washing/", "aircraft/twin-piston-aircraft-washing/index.html"],
  ["/aircraft/turboprop-aircraft-washing/", "aircraft/turboprop-aircraft-washing/index.html"],
  ["/aircraft/very-light-jet-aircraft-washing/", "aircraft/very-light-jet-aircraft-washing/index.html"],
  ["/aircraft/light-jet-aircraft-washing/", "aircraft/light-jet-aircraft-washing/index.html"],
  ["/airports/", "airports/index.html"],
  ...airportPages
]);
const servicePages = new Map([
  ["/services/aircraft-washing/", "services/aircraft-washing/index.html"],
  ["/waterless-aircraft-wash/", "waterless-aircraft-wash/index.html"],
  ["/services/wet-aircraft-washing/", "services/wet-aircraft-washing/index.html"],
  ["/services/aircraft-belly-cleaning/", "services/aircraft-belly-cleaning/index.html"],
  ["/services/aircraft-bug-removal/", "services/aircraft-bug-removal/index.html"],
  ["/services/aircraft-interior-cleaning/", "services/aircraft-interior-cleaning/index.html"],
  ["/aircraft-ceramic-protection/", "aircraft-ceramic-protection/index.html"],
  ["/services/monthly-aircraft-maintenance/", "services/monthly-aircraft-maintenance/index.html"]
]);
const resourcePages = new Map([
  ["/resources/", "resources/index.html"],
  ["/resources/how-often-should-an-aircraft-be-washed/", "resources/how-often-should-an-aircraft-be-washed/index.html"],
  ["/resources/waterless-vs-wet-aircraft-washing/", "resources/waterless-vs-wet-aircraft-washing/index.html"],
  ["/resources/why-deionized-water-is-used-for-aircraft-washing/", "resources/why-deionized-water-is-used-for-aircraft-washing/index.html"],
  ["/resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/", "resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/index.html"],
  ["/resources/aircraft-belly-cleaning-guide/", "resources/aircraft-belly-cleaning-guide/index.html"],
  ["/resources/what-spray-ceramic-protection-does-for-aircraft/", "resources/what-spray-ceramic-protection-does-for-aircraft/index.html"],
  ["/resources/how-to-prepare-an-aircraft-for-mobile-washing/", "resources/how-to-prepare-an-aircraft-for-mobile-washing/index.html"]
]);
const articlePages = new Map([...resourcePages].filter(([route]) => route !== "/resources/"));
const aircraftPages = new Map([
  ["/aircraft/", "aircraft/index.html"],
  ["/aircraft/single-engine-aircraft-washing/", "aircraft/single-engine-aircraft-washing/index.html"],
  ["/aircraft/twin-piston-aircraft-washing/", "aircraft/twin-piston-aircraft-washing/index.html"],
  ["/aircraft/turboprop-aircraft-washing/", "aircraft/turboprop-aircraft-washing/index.html"],
  ["/aircraft/very-light-jet-aircraft-washing/", "aircraft/very-light-jet-aircraft-washing/index.html"],
  ["/aircraft/light-jet-aircraft-washing/", "aircraft/light-jet-aircraft-washing/index.html"]
]);
const aircraftCategoryPages = new Map([...aircraftPages].filter(([route]) => route !== "/aircraft/"));
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

function plainText(html) {
  return html
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
  if (!html.includes('href="/resources/"')) fail(`${file}: missing Resources navigation or contextual link`);
  if (!html.includes('href="/aircraft/"')) fail(`${file}: missing Aircraft navigation or contextual link`);
  if (!html.includes('href="/airports/"')) fail(`${file}: missing Airports navigation or contextual link`);
  const primaryNav = html.match(/<ul\s+class=["']nav-links["']>([\s\S]*?)<\/ul>/i)?.[1] ?? "";
  const footerNav = html.match(/<ul\s+class=["']footer-links["']>([\s\S]*?)<\/ul>/i)?.[1] ?? "";
  if (!primaryNav.includes('href="/aircraft/"')) fail(`${file}: primary navigation is missing Aircraft`);
  if (!footerNav.includes('href="/aircraft/"')) fail(`${file}: footer navigation is missing Aircraft`);
  if (!primaryNav.includes('href="/airports/"')) fail(`${file}: primary navigation is missing Airports`);
  if (!footerNav.includes('href="/airports/"')) fail(`${file}: footer navigation is missing Airports`);
  if ((primaryNav.match(/<li>/g) ?? []).length !== 8) fail(`${file}: primary navigation must contain exactly eight items`);
  if ((footerNav.match(/<li>/g) ?? []).length !== 8) fail(`${file}: footer navigation must contain exactly eight items`);

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

  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  const jsonLdDocuments = [];
  if (jsonLdBlocks.length === 0) fail(`${file}: missing JSON-LD`);
  for (const block of jsonLdBlocks) {
    try {
      jsonLdDocuments.push(JSON.parse(block[1]));
    } catch (error) {
      fail(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  if (route !== "/") {
    const visibleBreadcrumb = html.match(/<nav\s+class=["']breadcrumbs["']\s+aria-label=["']Breadcrumb["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? "";
    const visibleItems = [...visibleBreadcrumb.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match, index, items) => {
      const href = match[1].match(/<a\b[^>]*href=["']([^"']+)["']/i)?.[1];
      return { name: plainText(match[1]), item: href ? new URL(href, canonicalHost).href : `${canonicalHost}${route}` };
    });
    const breadcrumb = jsonLdDocuments
      .flatMap((document) => document["@graph"] ?? [document])
      .find((item) => item?.["@type"] === "BreadcrumbList");
    const schemaItems = breadcrumb?.itemListElement ?? [];
    if (visibleItems.length !== schemaItems.length) {
      fail(`${file}: visible and structured breadcrumbs have different item counts`);
    } else {
      visibleItems.forEach((item, index) => {
        if (item.name !== schemaItems[index]?.name) fail(`${file}: breadcrumb label mismatch at position ${index + 1}`);
        if (item.item !== schemaItems[index]?.item) fail(`${file}: breadcrumb URL mismatch at position ${index + 1}`);
      });
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1];
    if (href.startsWith("tel:") && href !== "tel:+14179890976") fail(`${file}: non-normalized telephone link ${href}`);
    if (href.startsWith("sms:") && href !== "sms:+14179890976") fail(`${file}: non-normalized SMS link ${href}`);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/full-aircraft-ceramic-coating")) fail(`${file}: links to unavailable full ceramic service`);
    if (href.startsWith("/airports/") && href !== "/airports/" && !airportPages.has(href.split("#")[0].split("?")[0])) {
      fail(`${file}: links to an unpublished airport (${href})`);
    }
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
  if (/based at(?:\s+an?|\s+the)?\s+airport/i.test(html) && !/(?:not represented as being based at|not based at an airport)/i.test(html)) {
    fail(`${file}: possible airport-base claim`);
  }
  if (route !== "/" && !/<nav\s+class=["']breadcrumbs["']\s+aria-label=["']Breadcrumb["']/i.test(html)) {
    fail(`${file}: missing visible breadcrumb navigation`);
  }
  if (/"(?:streetAddress|openingHours|aggregateRating|review)"\s*:/i.test(html)) {
    fail(`${file}: unsupported address, hours, or review structured data`);
  }
}

if (airportRecords.length !== 18) fail(`data/airports.json: expected exactly 18 records, found ${airportRecords.length}`);
const airportSlugs = new Set();
for (const airport of airportRecords) {
  for (const field of ["name", "slug", "city", "state", "faaIdentifier", "verificationSource", "verificationDate", "regionGroup", "nearbyAirportSlugs", "travelTier", "notes"]) {
    if (airport[field] == null || airport[field] === "" || (Array.isArray(airport[field]) && airport[field].length === 0)) {
      fail(`data/airports.json: ${airport.slug ?? airport.name ?? "record"} is missing ${field}`);
    }
  }
  if (airport.published !== true) fail(`data/airports.json: ${airport.slug} is not explicitly published`);
  if (airport.verificationDate !== "2026-08-04") fail(`data/airports.json: ${airport.slug} has an unexpected verification date`);
  if (!Array.isArray(airport.verificationSource) || airport.verificationSource.some((url) => !/^https:\/\//.test(url))) {
    fail(`data/airports.json: ${airport.slug} must have HTTPS verification sources`);
  }
  if (airportSlugs.has(airport.slug)) fail(`data/airports.json: duplicate slug ${airport.slug}`);
  airportSlugs.add(airport.slug);
  for (const nearbySlug of airport.nearbyAirportSlugs) {
    if (!airportRecords.some((candidate) => candidate.slug === nearbySlug)) fail(`data/airports.json: ${airport.slug} has unknown nearby slug ${nearbySlug}`);
  }
}

const airportHub = read("airports/index.html");
if (!/"@type"\s*:\s*"CollectionPage"/i.test(airportHub)) fail("airports/index.html: missing CollectionPage structured data");
if (!airportHub.includes("18 verified public-use airport areas")) fail("airports/index.html: missing accurate 18-airport introduction");
for (const route of airportPages.keys()) {
  if (!airportHub.includes(`href="${route}"`)) fail(`airports/index.html: missing airport link ${route}`);
}

function visibleMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return main
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39|rsquo|ndash|mdash|middot);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedAirportText(text) {
  let result = text.toLowerCase();
  for (const airport of airportRecords) {
    const values = [airport.name, airport.city, airport.state, airport.faaIdentifier, airport.icaoIdentifier, airport.iataIdentifier].filter(Boolean);
    for (const value of values.sort((a, b) => b.length - a.length)) {
      result = result.replaceAll(value.toLowerCase(), " [airport] ");
    }
  }
  return result.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

const airportVisibleTexts = new Map();
const normalizedLongParagraphs = new Map();
for (const [route, file] of airportPages) {
  const airport = airportRecords.find((record) => route === `/airports/${record.slug}/`);
  const html = read(file);
  const visible = visibleMain(html);
  airportVisibleTexts.set(file, visible);
  const wordCount = visible.split(/\s+/).filter(Boolean).length;
  if (wordCount < 700 || wordCount > 1100) fail(`${file}: expected 700–1100 visible main-content words, found ${wordCount}`);
  if (!html.includes('href="/airports/"')) fail(`${file}: missing Airport Service Area link`);
  if (!html.includes('href="/services/"')) fail(`${file}: missing Services hub link`);
  if (!html.includes('href="/aircraft/"')) fail(`${file}: missing Aircraft hub link`);
  if (!html.includes('href="tel:+14179890976"')) fail(`${file}: missing call action`);
  if (!html.includes('href="sms:+14179890976"')) fail(`${file}: missing SMS action`);
  if (!html.includes(airport.name) || !html.includes(`FAA ${airport.faaIdentifier}`)) fail(`${file}: missing verified airport name or FAA identifier`);
  if (airport.icaoIdentifier && !html.includes(`ICAO ${airport.icaoIdentifier}`)) fail(`${file}: missing verified ICAO identifier`);
  if (airport.iataIdentifier && airport.iataIdentifier !== airport.faaIdentifier && !html.includes(`IATA ${airport.iataIdentifier}`)) fail(`${file}: missing distinct verified IATA identifier`);
  if (!/not represented as being based at, affiliated with, endorsed by, or partnered with/i.test(html)) fail(`${file}: missing independent-service clarification`);
  if (!/Customers arrange aircraft and facility access/i.test(html)) fail(`${file}: missing customer access responsibility`);
  if (!/Travel charges may apply/i.test(html)) fail(`${file}: missing travel-charge qualification`);
  if (!/at least 24 hours of (?:advance )?notice is preferred/i.test(html)) fail(`${file}: missing scheduling qualification`);
  if (!/RealClean Aviation Products/i.test(html)) fail(`${file}: missing measured product wording`);
  if (!/"@type"\s*:\s*"Service"/i.test(html)) fail(`${file}: missing Service structured data`);
  if (!/"@type"\s*:\s*"WebPage"/i.test(html)) fail(`${file}: missing WebPage structured data`);
  if (!/"@type"\s*:\s*"BreadcrumbList"/i.test(html)) fail(`${file}: missing BreadcrumbList structured data`);
  const serviceLinks = new Set([...html.matchAll(/href=["'](\/(?:services\/[^"'#?]+\/|waterless-aircraft-wash\/|aircraft-ceramic-protection\/))["']/gi)].map((match) => match[1]));
  if (serviceLinks.size < 2) fail(`${file}: must link to at least two relevant services`);
  if (!/href=["']\/resources\/[^"']+\/["']/i.test(html)) fail(`${file}: missing related resource article`);
  const faqCount = (html.match(/<details>/gi) ?? []).length;
  if (faqCount < 3 || faqCount > 5) fail(`${file}: expected three to five visible FAQs, found ${faqCount}`);
  const operationalData = [/runway (?:length|heading|surface)/i, /\b(?:CTAF|UNICOM|ATIS|NOTAM)\b/i, /fuel prices?/i, /FBO (?:phone|email|hours|contact)/i];
  for (const pattern of operationalData) if (pattern.test(html)) fail(`${file}: prohibited operational airport data matched ${pattern}`);

  for (const paragraph of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const plain = paragraph[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (plain.split(/\s+/).length < 25) continue;
    const normalized = normalizedAirportText(plain);
    normalizedLongParagraphs.set(normalized, (normalizedLongParagraphs.get(normalized) ?? 0) + 1);
  }
}

const airportTextEntries = [...airportVisibleTexts.entries()];
for (let i = 0; i < airportTextEntries.length; i += 1) {
  const [fileA, textA] = airportTextEntries[i];
  const wordsA = normalizedAirportText(textA).split(" ");
  const shinglesA = new Set(wordsA.slice(0, -4).map((_, index) => wordsA.slice(index, index + 5).join(" ")));
  for (let j = i + 1; j < airportTextEntries.length; j += 1) {
    const [fileB, textB] = airportTextEntries[j];
    const wordsB = normalizedAirportText(textB).split(" ");
    const shinglesB = new Set(wordsB.slice(0, -4).map((_, index) => wordsB.slice(index, index + 5).join(" ")));
    const intersection = [...shinglesA].filter((shingle) => shinglesB.has(shingle)).length;
    const union = new Set([...shinglesA, ...shinglesB]).size;
    const similarity = union ? intersection / union : 0;
    if (similarity >= 0.82) fail(`${fileA} and ${fileB}: airport-page similarity ${(similarity * 100).toFixed(1)}% exceeds 82%`);
  }
}
for (const [file] of airportTextEntries) {
  const html = read(file);
  const uniqueParagraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((plain) => plain.split(/\s+/).length >= 25)
    .map(normalizedAirportText)
    .filter((paragraph) => normalizedLongParagraphs.get(paragraph) === 1);
  if (uniqueParagraphs.length < 2) fail(`${file}: needs at least two substantial airport-specific paragraphs`);
}
const standardizedAirportParagraphs = [
  /^ozark aircraft wash may provide mobile aircraft washing/i,
  /^independent mobile service ozark aircraft wash is based in/i,
  /^the customer may need to notify the airport/i,
  /^owners should disclose special coatings/i,
  /^at least 24 hours of advance notice is preferred/i,
  /^confirm current information airport names/i,
  /^provide airport the aircraft category and condition/i
];
for (const [paragraph, count] of normalizedLongParagraphs) {
  if (count > 4 && !standardizedAirportParagraphs.some((pattern) => pattern.test(paragraph))) {
    fail(`Airport pages: nonstandard substantial paragraph is repeated ${count} times (${paragraph.slice(0, 90)}...)`);
  }
}

const aircraftHub = read("aircraft/index.html");
if (!/"@type"\s*:\s*"CollectionPage"/i.test(aircraftHub)) fail("aircraft/index.html: missing CollectionPage structured data");
for (const route of aircraftCategoryPages.keys()) {
  if (!aircraftHub.includes(`href="${route}"`)) fail(`aircraft/index.html: missing category link ${route}`);
}

for (const [route, file] of aircraftCategoryPages) {
  const html = read(file);
  if (!html.includes('href="/aircraft/"')) fail(`${file}: missing link back to Aircraft hub`);
  if (!html.includes('href="tel:+14179890976"')) fail(`${file}: missing call action`);
  if (!html.includes('href="sms:+14179890976"')) fail(`${file}: missing SMS action`);
  if (!/<nav\s+class=["']breadcrumbs["']\s+aria-label=["']Breadcrumb["']/i.test(html)) fail(`${file}: missing breadcrumbs`);
  if (!/"@type"\s*:\s*"Service"/i.test(html)) fail(`${file}: missing Service structured data`);
  if (!/"@type"\s*:\s*"WebPage"/i.test(html)) fail(`${file}: missing WebPage structured data`);
  if (!/"@type"\s*:\s*"BreadcrumbList"/i.test(html)) fail(`${file}: missing BreadcrumbList structured data`);
  const serviceLinks = new Set([...html.matchAll(/href=["'](\/(?:services\/[^"'#?]+\/|waterless-aircraft-wash\/|aircraft-ceramic-protection\/))["']/gi)].map((match) => match[1]));
  if (serviceLinks.size < 2) fail(`${file}: must link to at least two relevant services`);
  if (!/href=["']\/resources\/[^"']+\/["']/i.test(html)) fail(`${file}: missing related resource article`);
  if ((html.match(/<details>/gi) ?? []).length < 3) fail(`${file}: must contain at least three visible FAQs`);

  const unsupportedAircraftClaims = [
    /(?:factory|OEM|manufacturer)[- ](?:approved|authorized|certified) service/i,
    /speciali[sz]ed expertise (?:for|with|on) (?:Cessna|Piper|Cirrus|Beech|King Air|Pilatus|TBM|Citation|Phenom|HondaJet|Eclipse|Lear)/i,
    /personally serviced every/i,
    /(?:improves|increases) (?:aerodynamic performance|fuel economy|flight safety)/i,
    /(?:detects|diagnoses) (?:corrosion|leaks?|engine condition)/i,
    /(?:ensures|guarantees) (?:airworthiness|inspection readiness|damage prevention)/i
  ];
  for (const pattern of unsupportedAircraftClaims) {
    if (pattern.test(html)) fail(`${file}: unsupported aircraft claim matched ${pattern}`);
  }
  if (!new RegExp(`"url"\\s*:\\s*"${canonicalHost.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(html)) {
    fail(`${file}: structured-data URL does not match canonical route`);
  }
}

const resourceHub = read("resources/index.html");
if (!/"@type"\s*:\s*"CollectionPage"/i.test(resourceHub)) fail("resources/index.html: missing CollectionPage structured data");
for (const route of articlePages.keys()) {
  if (!resourceHub.includes(`href="${route}"`)) fail(`resources/index.html: missing article link ${route}`);
}

for (const [route, file] of articlePages) {
  const html = read(file);
  if (!html.includes('href="/resources/"')) fail(`${file}: missing link back to Resources hub`);
  if (!/<nav\s+class=["']breadcrumbs["']\s+aria-label=["']Breadcrumb["']/i.test(html)) fail(`${file}: missing breadcrumbs`);
  if (!/Reviewed by Ozark Aircraft Wash\s*·\s*August 3, 2026/i.test(html)) fail(`${file}: missing visible reviewed date`);
  if (!html.includes('href="tel:+14179890976"')) fail(`${file}: missing call action`);
  if (!html.includes('href="sms:+14179890976"')) fail(`${file}: missing SMS action`);
  if (!html.includes('href="/services/"')) fail(`${file}: missing Services hub link`);
  if (!/href=["']\/(?:services\/|waterless-aircraft-wash\/|aircraft-ceramic-protection\/)/i.test(html)) fail(`${file}: missing related service link`);
  if (!html.includes('href="/#quote"')) fail(`${file}: missing quote-section link`);
  if ((html.match(/<details>/gi) ?? []).length < 1) fail(`${file}: missing visible FAQ details`);

  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      if (Array.isArray(data["@graph"])) nodes.push(...data["@graph"]);
      else nodes.push(data);
    } catch {
      // The generic JSON-LD check above reports the parse error.
    }
  }
  const article = nodes.find((node) => node["@type"] === "Article");
  if (!article) {
    fail(`${file}: missing Article structured data`);
  } else {
    if (article.url !== `${canonicalHost}${route}`) fail(`${file}: Article URL does not match canonical route`);
    if (article.datePublished !== "2026-08-03" || article.dateModified !== "2026-08-03") fail(`${file}: Article dates must match the implementation date`);
    if (article.publisher?.["@id"] !== `${canonicalHost}/#organization`) fail(`${file}: Article publisher must reference the organization`);
    if (article.image && !html.includes(article.image.replace(canonicalHost, ""))) fail(`${file}: Article schema image is not visibly used`);
  }

  const unsafeEducationalClaims = [
    /cleaning (?:prevents|detects|diagnoses) corrosion/i,
    /washing (?:improves|increases) (?:safety|fuel efficiency|aerodynamic performance)/i,
    /bugs? (?:cause|reduce) \d+(?:\.\d+)?\s*%/i,
    /cleaning (?:determines|confirms) airworthiness/i,
    /written by (?:an? )?(?:aviation expert|certified aircraft-care specialist)/i,
    /FAA-certified detailer/i
  ];
  for (const pattern of unsafeEducationalClaims) {
    if (pattern.test(html)) fail(`${file}: unsupported educational claim matched ${pattern}`);
  }
}

const serviceHub = read("services/index.html");
for (const route of servicePages.keys()) {
  if (!serviceHub.includes(`href="${route}"`)) fail(`services/index.html: missing service link ${route}`);
}

for (const [route, file] of servicePages) {
  const html = read(file);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  if (!html.includes('href="/services/"')) fail(`${file}: missing link back to services hub`);
  if (!main.includes('href="/aircraft/"')) fail(`${file}: missing contextual Aircraft hub link in main content`);
  if (!html.includes('href="/#pricing-section"')) fail(`${file}: missing homepage pricing link`);
  if (!html.includes('href="/#gallery"')) fail(`${file}: missing homepage gallery link`);
  if (!html.includes('href="/#quote"')) fail(`${file}: missing homepage quote link`);
  if (!html.includes('href="tel:+14179890976"')) fail(`${file}: missing call action`);
  if (!html.includes('href="sms:+14179890976"')) fail(`${file}: missing SMS action`);
  if (!/"@type"\s*:\s*"Service"/i.test(html)) fail(`${file}: missing Service structured data`);
  if (!/"@type"\s*:\s*"BreadcrumbList"/i.test(html)) fail(`${file}: missing BreadcrumbList structured data`);
  if (/full professional (?:aircraft )?ceramic coating/i.test(html) && !/not currently (?:offered|available)/i.test(html)) {
    fail(`${file}: full professional ceramic coating is promoted without an unavailable-service statement`);
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
if (sitemapUrls.length !== 45) fail(`sitemap.xml: expected exactly 45 public URLs, found ${sitemapUrls.length}`);
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
const requiredPricingExamples = [
  "Examples: Cessna 172, Piper Cherokee, Cirrus SR20/SR22, Beech Bonanza",
  "Examples: Baron, Seneca, Twin Comanche, Cessna 310",
  "Examples: King Air, Pilatus PC-12, TBM, Piper Meridian",
  "Examples: Citation Mustang, Phenom 100, HondaJet, Eclipse 500",
  "Examples: Citation CJ series, Lear 31/35, Phenom 300"
];
for (const examples of requiredPricingExamples) {
  if (!pricing.includes(examples)) fail(`pricing.js: preserved category examples changed or missing (${examples})`);
}

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
  ["services/index.html", ["yellow-black-aircraft-exterior"]],
  ["services/aircraft-washing/index.html", ["yellow-black-aircraft-exterior"]],
  ["aircraft-washing-springfield-mo/index.html", ["yellow-black-aircraft-exterior"]],
  ["aircraft-washing-branson-mo/index.html", ["yellow-black-aircraft-hangar-side"]],
  ["waterless-aircraft-wash/index.html", ["yellow-black-aircraft-exterior"]],
  ["services/wet-aircraft-washing/index.html", ["yellow-black-aircraft-hangar-side"]],
  ["services/aircraft-belly-cleaning/index.html", ["yellow-black-aircraft-glossy-nose"]],
  ["services/aircraft-bug-removal/index.html", ["yellow-black-aircraft-exterior"]],
  ["aircraft-ceramic-protection/index.html", ["yellow-black-aircraft-glossy-nose"]],
  ["services/monthly-aircraft-maintenance/index.html", ["yellow-black-aircraft-hangar-side"]],
  ["airports/index.html", ["yellow-black-aircraft-hangar-side"]]
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
console.log(`Current service pages: ${servicePages.size}`);
console.log(`Aircraft-care resource articles: ${articlePages.size}`);
console.log(`Aircraft category pages: ${aircraftCategoryPages.size}`);
console.log(`Verified airport pages: ${airportPages.size}`);
console.log(`Largest responsive modern image set: ${(modernBytes / 1024).toFixed(1)} KiB / 450 KiB budget`);
console.log(`JPEG fallback image set: ${(fallbackBytes / 1024).toFixed(1)} KiB / 900 KiB budget`);
console.log("All validation checks passed.");
