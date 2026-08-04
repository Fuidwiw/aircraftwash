import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const airports = JSON.parse(fs.readFileSync(path.join(root, "data", "airports.json"), "utf8"));

function htmlFor(airport) {
  return fs.readFileSync(path.join(root, "airports", airport.slug, "index.html"), "utf8");
}

function plain(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—").replace(/&middot;/g, "·").replace(/&#39;|&rsquo;/g, "’").replace(/\s+/g, " ").trim();
}

function visibleMainWords(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return plain(main.replace(/<script\b[\s\S]*?<\/script>/gi, " ")).split(/\s+/).filter(Boolean).length;
}

function textMatch(html, pattern) {
  return plain(html.match(pattern)?.[1] ?? "");
}

function linkTexts(html, routePattern) {
  return [...html.matchAll(new RegExp(`<a\\b[^>]*href=["'](${routePattern})["'][^>]*>([\\s\\S]*?)<\\/a>`, "gi"))]
    .map((match) => plain(match[2]));
}

function identifiers(airport) {
  return [
    `FAA ${airport.faaIdentifier}`,
    airport.icaoIdentifier ? `ICAO ${airport.icaoIdentifier}` : null,
    airport.iataIdentifier && airport.iataIdentifier !== airport.faaIdentifier ? `IATA ${airport.iataIdentifier}` : null,
  ].filter(Boolean).join("; ");
}

const matrixRows = airports.map((airport) => {
  const html = htmlFor(airport);
  const services = [...new Set(linkTexts(html, `/(?:services/[^"']+/|waterless-aircraft-wash/|aircraft-ceramic-protection/)`))].slice(0, 2).join("; ");
  const resources = [...new Set(linkTexts(html, `/resources/[^"']+/`))].join("; ");
  const nearby = airport.nearbyAirportSlugs.map((slug) => airports.find((candidate) => candidate.slug === slug)?.name).filter(Boolean).join("; ");
  const schema = [...new Set([...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((match) => match[1]).filter((type) => ["Service", "WebPage", "BreadcrumbList"].includes(type)))].join("; ");
  const title = textMatch(html, /<title>(.*?)<\/title>/is).replaceAll("|", "\\|");
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1] ?? "";
  const faqCount = (html.match(/<details>/gi) ?? []).length;
  const uniqueSections = `${airport.travelTier} ${airport.notes}`;
  return `| \`/airports/${airport.slug}/\` | ${airport.name} | ${airport.city}, ${airport.state} | ${identifiers(airport)} | Mobile aircraft washing appointment planning for this verified airport area | ${uniqueSections} | ${services} | ${resources} | ${nearby} | None | ${title} | ${description} | ${schema} | ${faqCount} | ${visibleMainWords(html)} |`;
});

const matrix = `# Phase 5 Airport Content Matrix

Generated from the published HTML and \`data/airports.json\` on August 4, 2026. Word counts cover visible \`main\` content and are approximate.

| URL | Airport name | City/state | Identifiers | Primary search intent | Unique content sections | Related services | Related resources | Nearby airport links | Image used | Title | Meta description | Structured-data types | FAQ count | Approx. visible words |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---:|---:|
${matrixRows.join("\n")}

The Airport Service Area hub at \`/airports/\` uses the approved \`aircraft-2.jpg\` source through the \`yellow-black-aircraft-hangar-side*\` derivatives. Individual airport pages intentionally use no photograph because the approved library does not verify any pictured airport or location.
`;

const verificationRows = airports.map((airport) => {
  const sources = airport.verificationSource.map((source) => `[official source](${source})`).join("<br>");
  const discrepancy = airport.notes;
  return `| ${airport.name} | ${airport.faaIdentifier} | ${airport.faaIdentifier} | ${airport.icaoIdentifier ?? "None verified"} | ${airport.iataIdentifier ?? "None verified"} | ${airport.city}, ${airport.state} | ${sources} | ${airport.verificationDate} | ${discrepancy} | ${airport.name}; ${identifiers(airport)} |`;
});

const verification = `# Phase 5 Airport Verification

Airport identity was reviewed on August 4, 2026 against FAA or airport/city/state official sources. The registry is the publication control; a future airport must not be published until its source, date, identifiers, approved slug, and \`published: true\` status are recorded. This report intentionally excludes runway, frequency, fuel, FBO-directory, access-code, navigation, and other operational airport data.

| Airport name | Expected identifier | Verified current identifier | ICAO | IATA | Associated city | Official source | Verification date | Discrepancy or naming note | Final website wording |
|---|---|---|---|---|---|---|---|---|---|
${verificationRows.join("\n")}

## Naming decisions

- FAA currently lists \`3DW\` as **Downtown**. The approved URL remains unchanged, while the visible airport name is **Downtown Airport** in Springfield.
- FAA records use **Floyd W Jones Lebanon**; the City of Lebanon currently uses **Floyd W. Jones Lebanon Regional Airport**. The public-facing city wording is used and the FAA identifiers remain LBO/KLBO.
- FAA records use **Boone County**; the airport website markets **Boone County Regional Airport**. The site uses **Boone County Airport**, with the branding difference recorded.
- The airport’s current site uses **Baxter County Airport**. No unverified “Regional” addition is made.
- **Branson Airport** uses FAA BBG, ICAO KBBG, and the distinct IATA code BKG. The identifiers are not treated as interchangeable.
- **Branson West Municipal Airport–Emerson Field** retains the current Emerson Field wording found in official Missouri airport material.
`;

fs.writeFileSync(path.join(root, "PHASE5_CONTENT_MATRIX.md"), matrix);
fs.writeFileSync(path.join(root, "PHASE5_AIRPORT_VERIFICATION.md"), verification);
console.log("Generated Phase 5 content matrix and airport verification report.");
