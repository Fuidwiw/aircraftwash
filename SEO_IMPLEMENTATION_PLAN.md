# Ozark Aircraft Wash SEO Implementation Plan

Audit date: August 3, 2026  
Scope: the complete working tree at `C:\Projects\Aircraft-Wash`, plus read-only local rendering at desktop and mobile widths and authoritative airport-name/code checks.  
Change policy followed: no website source, content, configuration, or asset was modified. This report is the only file created.

## 1. Executive summary

Ozark Aircraft Wash is currently a very small, fast-to-understand static website: six HTML pages, four JPEGs, a `robots.txt`, a hand-written `sitemap.xml`, and a custom-domain `CNAME`. There is no framework, build process, dependency tree, database, server-side application, form processor, analytics integration, or automated test suite. That simplicity is a strength and should be preserved.

The site already has a useful SEO foundation: unique titles and descriptions, self-referencing canonicals, one H1 per page, crawlable call/text links, visible pricing, a sitemap, a permissive robots file, mobile viewport support, homepage Open Graph metadata, and valid homepage JSON-LD. All six local page routes returned HTTP 200 in the audit server, all discovered internal page and fragment targets exist, the pricing selector works, and the browser console showed no errors.

The largest immediate risks are not the technology stack. They are:

1. About 16.11 MiB of self-hosted JPEGs load on the homepage, including two 5712×4284 gallery files of about 7.4 MiB each, with no responsive sources, dimensions, or lazy loading.
2. Several specific airport/city service claims require owner verification. The current homepage says the business “regularly” serves places as far as Joplin and Lee's Summit; Lee's Summit is outside the supplied Southwest Missouri focus and its airport name has changed.
3. The crawlable, sitemap-listed `/full-aircraft-ceramic-coating/` page promotes an unconfirmed service and “longer-term” protection even though full coating is absent from the supplied current-services list. It must not be confused with the confirmed short-term spray ceramic service.
4. Five secondary pages are only about 133–197 words, repeat the same layout and calls to action, have no full site navigation, no social metadata, no page-specific structured data, and almost no links to related content.
5. Shared CSS, header, footer, metadata, and schema are duplicated or missing rather than maintained from one source. That will become error-prone as service, airport, aircraft, and resource pages are added.

Recommendation: keep a static, self-hosted output and the existing visual identity. First correct unsupported claims and performance/accessibility defects. Then introduce shared CSS plus a small dependency-free Node templating/validation layer for repeatable static-page generation. Add only pages supported by real service coverage and genuinely distinct content. Do not mass-produce city, airport, manufacturer, or model pages.

## 2. Current project architecture

### Technology and structure

- Plain HTML5 files served from directories with `index.html` files.
- Inline CSS on every page; the five secondary pages duplicate essentially the same card/button styles.
- Inline vanilla JavaScript only on the homepage, used to render pricing and reveal an optional full-coating card.
- Four local JPEG files; no third-party scripts, web fonts, CSS frameworks, CDNs, cookies, or API calls were found.
- `CNAME` contains `ozarkaircraftwash.com`, and the Git remote points to GitHub. This strongly suggests a branch-based GitHub Pages deployment, but the repository has no Pages workflow or deployment documentation. The actual Pages settings and www/apex redirects must be verified outside the repository.
- No `.openai/hosting.json`, server configuration, package manifest, build script, README, CI workflow, test directory, or validation script exists.

### Working-tree state at audit time

- Tracked and modified: `index.html`.
- Tracked and unchanged: `CNAME`.
- Untracked: all five secondary-page directories, `images/`, `robots.txt`, and `sitemap.xml`.
- The untracked state is a deployment risk: these files will not be part of a Git-based deployment until intentionally reviewed and committed. Do not run bulk staging without confirming scope.

### Architectural recommendation

Do not replace the site with React, Next.js, a CMS, or a server application. The planned page count does justify removing duplication. Use:

- Static HTML as the deployed artifact.
- One shared `/assets/css/site.css` and a very small `/assets/js/pricing.js`.
- A dependency-free `scripts/build.mjs` using built-in Node APIs once the second content phase starts.
- Human-editable JSON data for business facts, navigation, services, and page metadata.
- A base template and a small number of page-type templates.
- A dependency-free validation script that checks generated files, required metadata, internal links, image attributes, schema JSON parsing, and sitemap coverage.

This keeps deployment as “upload/commit static files,” while giving a non-developer a small number of clearly documented content fields to update.

## 3. Current page inventory

| Route | Source file | Approx. visible words | Current purpose | Key audit notes |
|---|---|---:|---|---|
| `/` | `index.html` | 487 | Home, services, pricing, gallery, quote | Strongest page; 16.11 MiB image payload; homepage-only OG and JSON-LD; pricing depends on JS |
| `/aircraft-washing-springfield-mo/` | `aircraft-washing-springfield-mo/index.html` | 197 | Springfield city/service page | Specific airport list needs service verification; no shared nav, images, OG, or JSON-LD |
| `/aircraft-washing-branson-mo/` | `aircraft-washing-branson-mo/index.html` | 156 | Branson city/service page | Thin and structurally similar to Springfield page; airport coverage needs verification |
| `/waterless-aircraft-wash/` | `waterless-aircraft-wash/index.html` | 133 | Waterless wash service | Useful intent but too brief; lacks process detail, limitations, related links, OG, and schema |
| `/aircraft-ceramic-protection/` | `aircraft-ceramic-protection/index.html` | 177 | Spray ceramic protection | Correctly distinguishes spray protection from a full/permanent coating; preserve this positioning |
| `/full-aircraft-ceramic-coating/` | `full-aircraft-ceramic-coating/index.html` | 179 | Claimed full coating service | Hidden from the homepage UI but directly accessible and listed in sitemap; service and claims are not supported by supplied business information |

### Metadata inventory

- Every page has a unique `<title>`, meta description, `meta robots`, viewport tag, and self-referencing canonical.
- Homepage title is 73 characters and description is 227 characters. Secondary descriptions range from 160 to 223 characters. Character count is not a ranking rule, but these are likely to be truncated or rewritten and should be made more focused.
- Only the homepage has Open Graph fields. No page has Twitter/X card fields.
- Only the homepage has JSON-LD.
- Every page has exactly one H1. The observed H1 → H2 → H3 order is logical; no heading-level skip was found.

## 4. Existing SEO strengths

- Simple, crawlable static HTML with no client-side routing.
- One descriptive H1 and one canonical per page.
- Unique page titles and descriptions rather than duplicated boilerplate.
- Clear mention of the primary Springfield, Branson, and Southwest Missouri service area.
- Visible, specific services rather than vague “detailing” copy.
- Confirmed service positioning is generally careful: low-pressure methods, deionized water, aircraft-safe procedures, mobile service, and short-term spray ceramic protection.
- Spray ceramic page explicitly says it is not a permanent or multi-year full coating.
- Pricing, gallery content, call links, and SMS links are visible and functional and should be retained.
- Homepage `LocalBusiness` JSON-LD parses as valid JSON and includes the correct phone number and an offer catalog.
- `robots.txt` allows crawling and names the sitemap.
- `sitemap.xml` is well-formed XML and lists all six current routes.
- Local route checks returned 200 for all six pages, `robots.txt`, and `sitemap.xml`.
- All discovered local page links and homepage fragment links resolve to existing targets.
- Mobile rendering at 390×844 had no horizontal overflow.
- The aircraft selector is properly labelled; changing it updated the category and prices without console errors.
- No render-blocking third-party scripts, font downloads, trackers, or large JS bundles exist.

## 5. Technical problems found

### High priority

1. **Excessive image payload.** The four images total 16,896,243 bytes (16.11 MiB). `aircraft-2.jpg` is 5712×4284 and 7,616,835 bytes; `aircraft-3.jpg` is 5712×4284 and 7,584,682 bytes; `hero-aircraft.jpg` is 1254×1254 and 1,655,539 bytes. These are far larger than their rendered sizes.
2. **No responsive image behavior.** Gallery `<img>` elements have no `width`, `height`, `srcset`, `sizes`, `loading`, or `decoding` attributes. This wastes bandwidth and can create layout shift. The two below-the-fold gallery images are requested eagerly.
3. **Hero image delivery.** The likely LCP image is a large CSS background. It has no responsive variants and is discovered through inline CSS rather than an HTML image/preload path. Its square composition is heavily cropped on desktop and shows prominent logo lettering behind the text.
4. **Unconfirmed page is indexable.** `/full-aircraft-ceramic-coating/` is in `sitemap.xml`. The homepage card is only hidden with `display:none`; the page remains directly crawlable. A UI flag is not an SEO publication control.
5. **No automated validation.** There is no link checker, HTML/schema validator, sitemap coverage test, image budget, Lighthouse budget, or CI job.

### Medium priority

- Shared CSS is copied into every page. Fixes to typography, focus states, tap targets, or spacing can drift.
- Homepage prices are inserted with JavaScript into empty containers. The selector works, but the raw HTML has no default pricing content or `<noscript>` fallback. Rendered HTML is less robust for users or crawlers when JS is unavailable.
- Secondary pages have no global navigation and link only back to the homepage. This is weak for discovery, orientation, and internal equity flow.
- The homepage alone has Open Graph data; it is missing `og:site_name`, `og:locale`, `og:image:width`, `og:image:height`, and `og:image:alt`. The secondary pages have no social preview metadata.
- No Twitter/X card metadata exists.
- Canonicals consistently use the apex domain, while the supplied public URL uses `www`. The repository does not prove that `https://www.ozarkaircraftwash.com/*` permanently redirects to the equivalent apex URL. Confirm one preferred host and enforce a one-hop 301/308 redirect.
- No custom `404.html` exists.
- No favicon or manifest was found. This is not a direct ranking factor but affects polish and search/browser presentation.
- Sitemap has no accurate `<lastmod>` values and contains manual `priority`/`changefreq` fields that add maintenance work. Use only factual `lastmod` dates when content materially changes; omit speculative fields.
- The hidden full-coating link is relative (`full-aircraft-ceramic-coating/`) while other homepage page links are root-relative. It works from `/` but is fragile if the component is reused.

### Analytics and search tooling

- No Google Analytics, privacy-friendly analytics, call/SMS event tracking, Google Search Console verification, Bing verification, or other measurement code was found.
- Do not add tracking merely for SEO. First confirm owner preference and privacy requirements. Search Console verification can use a DNS record and does not require client-side code.

## 6. Content problems found

1. **Unsupported location claims.** The homepage states that the company serves eight named airports and “regularly” serves multiple cities. The supplied business information confirms Springfield, Branson, Southwest Missouri, and nearby aviation facilities—not every named airport or city.
2. **Airport naming accuracy.** Current authoritative sources show:
   - Branson Airport uses FAA identifier `BBG`; `BKG` is its IATA code. If both are useful, label them explicitly rather than presenting BKG as the only code.
   - The current name is Branson West Municipal Airport/Emerson Field (`FWB`).
   - The current city name is Monett Regional Airport (`HFJ`), not “Monett Municipal Airport.”
   - The current full Aurora name is Jerry Sumners Sr. Aurora Municipal Airport (`2H2`).
   - The current FAA presentation is Kansas City/Lee's Summit Regional Airport (`LXT`), not “Lee's Summit Municipal Airport.” It is in the Kansas City area, not the stated Southwest Missouri core.
3. **Thin secondary pages.** Each contains roughly 133–197 words, with repeated cards, service lists, and calls to action. They do not yet provide enough distinct decision-making value to justify a large expansion using the same pattern.
4. **Potential doorway-page pattern.** The Springfield and Branson pages mostly swap place names and airport lists. Adding many similar city/airport pages would create a doorway-page and duplicate-content risk.
5. **Unconfirmed full-coating offer.** Full aircraft ceramic coating is not in the supplied current-service list. The page claims professional application, curing/flash time, correction/prep, and longer-term protection. All require explicit owner confirmation before indexing.
6. **Unverified duration claim.** The homepage says spray ceramic lasts approximately 3–6 months. Keep “short-term” positioning, but verify the duration against the actual product, application process, storage, use, and manufacturer documentation before retaining a numerical range.
7. **Generic gallery descriptions.** Alt text such as “Aircraft wash example 1” does not explain what is shown or which service is demonstrated. It also gives no indication that image publication permission exists.
8. **Limited trust/process detail.** There is no owner-approved explanation of access coordination, surface/component precautions, what owners should prepare, what a quote includes, or how service eligibility varies by airport. These would be more useful than repeated keyword phrases.
9. **No substantial educational content.** The FAQ has only three short answers and does not link to deeper resources.

## 7. Conversion problems found

- Call and text are the only lead paths. This is acceptable for a simple site, but users who cannot initiate SMS from desktop have no form or email fallback.
- There is no short quote checklist near every CTA (aircraft category, airport, desired service, condition, timing), even though secondary pages mention some of these items.
- Phone/SMS URI formatting is inconsistent (`417-989-0976` versus `4179890976`). Both forms generally work, but standardize on `tel:+14179890976` and `sms:+14179890976` while displaying `417-989-0976`.
- SMS links have no optional prefilled message. A concise, editable message could reduce friction if verified across target devices.
- Secondary pages lack pricing links, gallery proof, related services, and full navigation.
- The homepage's “service” cards are not links; users must reach a later “Service Pages” section to open details.
- The visible footer is a styled `<div>`, contains no clickable phone, and provides no navigation.
- No quote-form events, call clicks, text clicks, or selector usage are measured. If analytics is approved, measure conversions without collecting aircraft identifiers or other unnecessary personal data.
- No business hours, response-time commitment, email address, or contact form is present. Do not invent any of these; add only owner-approved facts.

## 8. Recommended site architecture

Use four carefully limited content groups plus the homepage:

1. **Core services:** one substantial page per genuinely distinct service. These pages should explain when the service fits, what is included/excluded, process and precautions, related add-ons, service-area logistics, pricing guidance, and a quote checklist.
2. **Airports:** only airports actually served, after owner and access confirmation. Each page must include airport-specific service logistics and evidence, not just a substituted name/code.
3. **Aircraft:** broad manufacturer or category pages only when the content can explain meaningful surface/configuration considerations without implying endorsement or certification.
4. **Resources:** evergreen owner education that answers pre-purchase questions and links naturally to services.

Do not publish a page solely because a keyword exists. A location page should meet all of these gates:

- The owner confirms the airport is genuinely served now.
- The business can legally and practically access the ramp/hangar or can explain owner-arranged access without implying an airport/FBO relationship.
- The page has unique operational information and at least one truthful, owner-approved detail beyond the airport name.
- Its search intent is not already fully served by a nearby city page.
- It has at least two useful internal links in and two links out.

## 9. Proposed URL structure

### Preserve existing URLs

Avoid breaking already published paths. Keep these as the canonical service/location URLs unless Search Console data shows they have no value and a real server-side redirect is available:

- `/aircraft-washing-springfield-mo/`
- `/aircraft-washing-branson-mo/`
- `/waterless-aircraft-wash/`
- `/aircraft-ceramic-protection/` — keep for the confirmed spray product and make “spray” unmistakable in title/H1/body

Treat `/full-aircraft-ceramic-coating/` as pending owner decision. Temporarily exclude it from navigation and sitemap and use `noindex` only if the hosting copy must remain accessible during review. If the service is not offered, use a true 301/308 redirect to the spray-protection page if the hosting layer supports it; do not rely on a hidden card.

### Core services

- `/services/` — service hub
- `/aircraft-washing/`
- `/waterless-aircraft-wash/` — existing
- `/wet-aircraft-wash/`
- `/aircraft-belly-cleaning/`
- `/aircraft-bug-removal/`
- `/aircraft-interior-cleaning/`
- `/aircraft-ceramic-protection/` — existing spray protection URL
- `/monthly-aircraft-maintenance-washing/`

Root-level service slugs keep current URL conventions and avoid unnecessary migrations.

### Airport pages: initial candidates, not approved service claims

All rows below still require owner confirmation of current service coverage, access process, travel policy, and enough unique content before publication.

| Airport | Code(s) to present accurately | Nearby city | Recommended URL | Facts that must be verified before publishing |
|---|---|---|---|---|
| Springfield-Branson National Airport | FAA/IATA `SGF` | Springfield | `/airports/springfield-branson-national-airport-aircraft-washing/` | Service is currently offered at SGF; owner/FBO/ramp-access process; which services are practical there; travel fee; any completed-work evidence or approved photo |
| Springfield Downtown Airport | FAA `3DW` | Springfield | `/airports/springfield-downtown-airport-aircraft-washing/` | Business actually serves 3DW; access/water/hangar coordination; travel fee; unique local evidence. Do not call it the business base. |
| Branson Airport | FAA `BBG`, IATA `BKG` | Branson | `/airports/branson-airport-aircraft-washing/` | Business actually serves the airport; which code customers recognize; permission/access workflow; services and travel fee; no implied airport relationship |
| Branson West Municipal Airport/Emerson Field | FAA `FWB` | Branson West | `/airports/branson-west-municipal-airport-aircraft-washing/` | Current service coverage; access/water/hangar process; travel fee; owner-approved evidence; use full current airport name |
| M. Graham Clark Downtown Airport | FAA `PLK` | Branson | `/airports/m-graham-clark-downtown-airport-aircraft-washing/` | Current service coverage; access and travel process; unique content; no claim of being on-airport or affiliated |

Authoritative identity references used for the candidate table:

- [FAA: Springfield-Branson National Airport (SGF)](https://www.faa.gov/flight_deck/sgf)
- [FAA location identifiers: Branson Airport BBG, M. Graham Clark PLK, and Branson West FWB](https://www.faa.gov/documentLibrary/media/Order/7350.9S_Location_Identifiers.pdf)
- [Official Branson Airport site](https://flybranson.com/airport/)
- [Official M. Graham Clark Downtown Airport site](https://flyplk.com/)
- [FAA chart supplement: Springfield Downtown (3DW)](https://aeronav.faa.gov/afd/22JAN2026/NC_274_22JAN2026.pdf)

Second-wave candidates, only after owner confirmation and only if each can support distinct content:

- Jerry Sumners Sr. Aurora Municipal Airport (`2H2`), Aurora.
- Bolivar Municipal Airport (`M17`), Bolivar.
- Monett Regional Airport (`HFJ`), Monett/Pierce City; use the [official City of Monett airport name](https://monettmo.gov/158/Airport).
- Joplin Regional Airport (`JLN`), Joplin; confirm that the travel radius truly includes Joplin.

Do not include Kansas City/Lee's Summit Regional Airport (`LXT`) in the initial Southwest Missouri architecture. Add it only if the owner confirms genuine recurring coverage and can explain why it belongs in the service area.

### Aircraft pages

- `/aircraft/` — aircraft-type hub
- `/aircraft/cirrus-aircraft-washing/`
- `/aircraft/cessna-aircraft-washing/`
- `/aircraft/piper-aircraft-washing/`
- `/aircraft/beechcraft-aircraft-washing/`
- `/aircraft/single-engine-piston-aircraft-washing/`
- `/aircraft/twin-piston-aircraft-washing/`
- `/aircraft/turboprop-aircraft-washing/`
- `/aircraft/light-jet-aircraft-washing/`

Start with category pages because they map to existing pricing and can contain broader, more useful guidance. Add manufacturer pages only when the owner can provide non-duplicated, factual content. Do not imply factory approval, endorsement, certification, or model-specific expertise.

### Educational resources

- `/resources/` — resource hub
- `/resources/how-often-should-an-aircraft-be-washed/`
- `/resources/waterless-vs-wet-aircraft-washing/`
- `/resources/why-deionized-water-is-used-for-aircraft-washing/`
- `/resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/`
- `/resources/aircraft-belly-cleaning-guide/`
- `/resources/what-spray-ceramic-protection-does-for-aircraft/`
- `/resources/how-to-prepare-an-aircraft-for-mobile-washing/`

Each article should answer the question directly, describe limits and variables, link to the relevant service, and carry an accurate reviewed/updated date. Do not manufacture an expert byline or credentials.

## 10. Proposed navigation structure

### Desktop header

- Logo/business name → Home
- Services → `/services/`
  - Aircraft Washing
  - Waterless Washing
  - Wet Washing
  - Belly Cleaning
  - Bug Removal
  - Interior Cleaning
  - Spray Ceramic Protection
  - Monthly Maintenance
- Aircraft → `/aircraft/`
- Airports → `/airports/`
- Resources → `/resources/`
- Pricing → `/#pricing-section`
- Gallery → `/#gallery`
- Contact/Quote → `/#quote`

Use a simple accessible disclosure button for grouped links, or keep the first version as a two-row list if a reliable keyboard/touch menu is not yet implemented.

### Mobile navigation

The current four links fit at 390 px and the page has no horizontal overflow, but browser measurement showed link boxes only 46–66 px wide by 18 px high. Increase each interactive target to at least 44×44 CSS pixels. As navigation grows, use a labelled menu button with correct expanded state, keyboard support, focus management, and a visible close action. Keep call/text actions prominent but do not make the sticky header consume excessive vertical space.

### Footer

Use a semantic `<footer>` containing the business name, clickable phone, confirmed service-area statement, primary navigation, and privacy link if analytics or a form is added. Do not display a street address or airport base unless the owner confirms it for public use.

## 11. Exact files that will need modification

### Existing files

| File | Planned modification |
|---|---|
| `index.html` | Use shared header/footer/CSS; shorten metadata; optimize hero/gallery markup; server-render default pricing; correct unverified location and coating claims; add internal links; improve landmarks and CTA details; update JSON-LD |
| `aircraft-washing-springfield-mo/index.html` | Expand with confirmed unique content; shared navigation/footer; related links; OG/schema/breadcrumbs; correct airport scope |
| `aircraft-washing-branson-mo/index.html` | Expand or consolidate if it cannot be differentiated; correct BBG/BKG labeling; shared template, links, OG/schema/breadcrumbs |
| `waterless-aircraft-wash/index.html` | Expand process, use cases, limits, related services, pricing link, FAQs; shared template and schema |
| `aircraft-ceramic-protection/index.html` | Keep explicitly spray/short-term; verify numerical durability claims; add shared template, links, OG/schema |
| `full-aircraft-ceramic-coating/index.html` | Owner decision required before any SEO implementation: confirm service and claims, or temporarily `noindex`/remove from sitemap, then redirect or repurpose appropriately |
| `robots.txt` | Keep simple allow rule and preferred-host sitemap URL; no blanket blocking of pages intended for `noindex` |
| `sitemap.xml` | Generate from publishable canonical pages; exclude unconfirmed/noindex URLs; add accurate `lastmod`; remove manual priority/changefreq unless maintained intentionally |
| `images/hero-aircraft.jpg` | Replace with properly composed, compressed responsive derivatives while preserving the current public URL or redirect/reference compatibility |
| `images/aircraft-1.jpg` | Add optimized derivatives and descriptive metadata/alt mapping |
| `images/aircraft-2.jpg` | Downsize/compress; keep original outside deployed payload if archival quality is needed |
| `images/aircraft-3.jpg` | Downsize/compress; keep original outside deployed payload if archival quality is needed |
| `CNAME` | No change expected if the apex domain remains canonical; modify only if the owner deliberately chooses `www` and deployment supports it |

## 12. New files or directories that should be created

### Shared implementation

- `assets/css/site.css`
- `assets/js/pricing.js`
- `assets/images/` only if assets are reorganized without breaking current URLs
- `data/site.json` — phone, preferred host, confirmed service area, navigation, social image defaults
- `data/services.json` — service labels, short descriptions, paths, pricing categories
- `data/airports.json` — publication flag plus verified name/code/city/content fields
- `data/aircraft.json` — publication flag plus approved category/manufacturer content
- `templates/base.html`
- `templates/service.html`
- `templates/airport.html`
- `templates/aircraft.html`
- `templates/resource.html`
- `scripts/build.mjs`
- `scripts/validate-site.mjs`
- `package.json` with only local `build`, `check`, and `serve` scripts; no runtime dependencies are necessary
- `README.md` with content-editing, validation, and deployment instructions
- `.gitignore` for local-only generated reports/cache if needed; do not ignore deployed HTML
- `.github/workflows/validate.yml` if GitHub Actions is enabled
- `404.html`

### Hubs and content directories

- `services/index.html`
- The new root-level service directories listed in section 9
- `airports/index.html` plus only verified airport directories
- `aircraft/index.html` plus approved category/manufacturer directories
- `resources/index.html` plus the seven initial article directories
- `privacy/index.html` only when a form, analytics, or another data-collection feature creates a real need

The build script should generate only pages with an explicit `published: true` flag. Missing owner verification should fail validation or keep a page unpublished, not turn placeholder text into a live claim.

## 13. Reusable page-template strategy

### Base template

One base template should own:

- `lang`, charset, viewport, title, description, robots, canonical.
- Open Graph and Twitter/X card fields.
- Shared stylesheet and optional page script.
- Skip link, header, primary navigation, `<main>`, and footer.
- Organization identity JSON-LD and page-specific schema injection.

### Page-type templates

- **Service:** problem/use case, fit/not-fit guidance, included work, process/precautions, related services, pricing link, service area, FAQ, quote checklist.
- **Airport:** verified airport identity, mobile-service logistics, available services, access caveat, travel/pricing policy, unique evidence, nearby relevant service links. Never insert an airport address as the business address.
- **Aircraft:** broad category/manufacturer context, areas requiring care, suitable service choices, pricing category, limitations, related education. No endorsement/certification language.
- **Resource:** concise answer, factors/variables, practical steps, related service CTA, reviewed date, sources where factual claims need support.

### Editing model

Keep business facts centralized in `data/site.json`; page-specific copy stays in clearly named data files or Markdown-like text fields. Build output remains ordinary HTML and can be deployed without a Node server. Document the small number of commands in `README.md`.

If the owner prefers zero build step during phase 1, first extract shared CSS/JS and manually update the six pages. Introduce generation before publishing the larger architecture, not after dozens of duplicates exist.

## 14. Structured-data strategy

1. **Homepage:** use `Organization` plus `WebSite`, or keep `LocalBusiness` only with fields that are true for a service-area business. Do not invent a public street address, opening hours, geo coordinates, reviews, aggregate rating, or social profiles.
2. **Service pages:** `Service` with `provider` referencing one stable organization `@id`, truthful `areaServed`, service name/description, and canonical URL.
3. **All secondary pages:** `BreadcrumbList` matching visible breadcrumbs.
4. **Airport pages:** describe the business's `Service`; do not mark Ozark Aircraft Wash as the airport, an airport tenant, or an FBO, and do not use the airport address as the business address.
5. **Aircraft pages:** use `Service` or `WebPage`, not `Product`, unless a genuine purchasable product is being described.
6. **Articles:** `Article` only with a real publisher, truthful publication/modification dates, and a real author identity approved by the owner.
7. **FAQs:** visible FAQ content may use `FAQPage` when it follows schema rules, but do not create FAQs solely to seek a rich result and do not expect guaranteed display.

Use one canonical organization node, for example `https://ozarkaircraftwash.com/#organization`, and reference it from each page. Validate JSON parsing locally and use Google's Rich Results Test/Schema.org validator before release. Structured data must mirror visible copy.

## 15. Internal-linking strategy

- Homepage links directly from each service card to its full service page.
- Service hub links to every published service; each service links back to the hub, pricing, two related services, one relevant resource, and quote CTA.
- Airport hub links only to verified published airports. Each airport page links to applicable service pages and one preparation resource.
- Aircraft hub links to category/manufacturer pages. Each aircraft page links to its pricing category, appropriate wash methods, protection option, and preparation guide.
- Resource articles link contextually to one or two services, not repeatedly with exact-match anchors.
- Service pages link back to educational resources where owners need more explanation.
- Add visible breadcrumbs to every non-home page.
- Avoid sitewide links to every airport. Keep the primary nav compact and use hubs.
- Audit for orphan pages and ensure every indexable URL has at least one contextual internal link.
- Use descriptive anchors such as “waterless aircraft washing process,” while varying wording naturally.

## 16. Image-optimization strategy

### Current asset facts

| Image | Dimensions | File size | Current use |
|---|---:|---:|---|
| `hero-aircraft.jpg` | 1254×1254 | 1,655,539 B (1.58 MiB) | CSS hero background and OG image |
| `aircraft-1.jpg` | 500×333 | 39,187 B (38.3 KiB) | Gallery |
| `aircraft-2.jpg` | 5712×4284 | 7,616,835 B (7.27 MiB) | Gallery |
| `aircraft-3.jpg` | 5712×4284 | 7,584,682 B (7.23 MiB) | Gallery |

### Implementation

- Create AVIF and WebP variants with optimized JPEG fallback.
- Generate only useful widths, for example 480, 768, 1200, and 1600 px for the hero; 320, 640, and 960 px for gallery items.
- Target a practical initial budget: hero under about 250 KiB at the largest commonly served size and each gallery thumbnail under about 150 KiB, then verify visual quality on aircraft paint, windows, and gradients.
- Use `<picture>`/`srcset`/`sizes` for content images and explicit `width`/`height` or `aspect-ratio` to prevent layout shift.
- Use `loading="lazy"` and `decoding="async"` for below-the-fold gallery images; do not lazy-load the LCP hero.
- Consider an HTML `<picture>` with `object-fit: cover` instead of a CSS background so responsive selection and fetch priority are controllable. If the hero image is decorative, use empty alt; the H1 already supplies meaning.
- Produce a dedicated 1200×630 social image instead of using the square hero image.
- Replace generic alt text with concise, factual descriptions of visible content/service. Do not identify aircraft models, locations, customers, or outcomes unless confirmed.
- Confirm the owner has permission to publish each image and whether tail numbers or other identifiers should be obscured.
- Keep full-resolution originals outside the deployed public directory if they are needed for future editing.

## 17. Sitemap and robots strategy

- Keep `robots.txt` minimal:
  - `User-agent: *`
  - `Allow: /`
  - one sitemap line using the final preferred host.
- Do not use `robots.txt` to hide an unconfirmed page that should be removed from search; crawlers need access to read `noindex`.
- Generate `sitemap.xml` from pages that are canonical, indexable, published, and return 200.
- Exclude hidden drafts, noindex pages, redirect URLs, 404s, and unconfirmed full-coating content.
- Use an accurate ISO date-only `<lastmod>` when substantive content changes. Do not update it automatically on every build.
- Omit `priority` and `changefreq` unless the owner has a concrete maintenance reason.
- After deployment, submit the preferred sitemap in Google Search Console and Bing Webmaster Tools and monitor excluded/duplicate/canonical reports.
- Verify the apex/www and HTTP/HTTPS variants resolve in one permanent redirect to the canonical equivalent path.

## 18. Accessibility improvements

### Findings

- Positive: `lang="en"`, viewport metadata, a labelled select, logical headings, readable base sizing, keyboard-native links/select, and no horizontal overflow at 390 px.
- Add a “Skip to main content” link.
- Use semantic `<header>`, labelled `<nav>`, `<main>`, and `<footer>` elements. The current render had one nav but no header/main/footer landmarks.
- Make the brand a home link.
- Increase current mobile nav tap targets from the measured 18 px height to at least 44 px in both dimensions.
- Add clear `:focus-visible` styles that are not removed by hover rules.
- Review the sticky header at narrow widths and browser zoom so it does not obscure anchors or consume too much of the viewport; use `scroll-margin-top` on targets.
- Improve generic gallery alt text and declare image dimensions.
- The gold `#d4af37` used for price text on white is below WCAG AA contrast; use a darker gold/brown for text while keeping the existing gold identity for backgrounds/decorative accents.
- Ensure new dropdown/menu behavior works by keyboard, communicates expanded state, and returns focus appropriately.
- Avoid placing essential text only in image backgrounds.
- Test at 200% zoom, 320 CSS px width, keyboard only, reduced motion, and Windows High Contrast/forced colors.

## 19. Testing and validation plan

### Current validation capability

There are no project-defined validation commands: no `package.json`, Makefile, test scripts, HTML validator, link checker, Lighthouse config, or CI workflow exists.

Commands that work in the current environment today are:

```powershell
# Preview the static site from the project root.
python -m http.server 8000

# Confirm sitemap XML is well formed.
[xml](Get-Content -Raw .\sitemap.xml) | Out-Null

# Inspect the exact Git scope before any deployment work.
git status --short
```

These are preview/smoke-check commands, not a complete test suite.

### Add these project commands

```powershell
npm run build
npm run check
npm run serve
```

`npm run check` should fail on:

- Missing/duplicate titles, descriptions, H1s, canonicals, or canonical URLs.
- Invalid JSON-LD or XML.
- Broken internal links, fragments, image references, or sitemap URLs.
- Indexable pages absent from the sitemap, and noindex/redirect pages present in it.
- Unpublished airport data entering output.
- Images over the agreed byte/dimension budget.
- Missing image width/height/alt/loading policy.
- Non-preferred-host absolute URLs.
- Accidental claims from a blocked phrase list such as “certified,” “factory approved,” “permanent,” or “multi-year” unless explicitly allowlisted with owner evidence.

### Manual and external validation before release

- Browser test at 320, 390, 768, 1024, and 1440 CSS px.
- Keyboard-only navigation, visible focus, zoom, and screen-reader landmark/name spot checks.
- Phone and SMS links on iOS and Android; verify desktop fallback messaging.
- Pricing selector for all five categories with and without JS.
- Lighthouse mobile runs on home plus one page of each template type; track LCP, CLS, INP, total transfer size, and accessibility issues.
- W3C/Nu HTML validation.
- Google Rich Results Test and Schema.org validator for representative pages.
- Crawl the deployed host and verify status, canonical, redirect, noindex, and sitemap behavior.
- Check every image visually after compression for banding, blur, or paint-detail artifacts.
- Verify no console errors and no mixed content.

## 20. Deployment plan

1. Confirm where the live site is actually deployed, which branch/directory publishes, and whether GitHub Pages or another host controls redirects and headers.
2. Back up or preserve the current production artifact and record baseline screenshots, Lighthouse results, indexed URLs, and Search Console data if available.
3. Resolve the current modified/untracked files deliberately; do not let the new build overwrite owner changes.
4. Implement technical cleanup on a `codex/` feature branch or equivalent preview branch.
5. Build into the same static route structure so deployment remains simple.
6. Run local and CI checks, then deploy a preview if the host supports it.
7. Obtain owner approval for service facts, prices, airport coverage, images, and coating copy.
8. Deploy the technical foundation and corrected existing pages before publishing new page groups.
9. Verify production status codes, host redirects, canonicals, robots, sitemap, call/SMS behavior, pricing, layout, and analytics consent/privacy behavior if added.
10. Submit the sitemap and monitor crawl/indexing and real performance. Roll out new groups in small batches so quality and search behavior can be reviewed.

Do not publish dozens of new URLs in one release. Static output can continue to be hosted on GitHub Pages or any basic web server/CDN.

## 21. Risks and items requiring owner verification

### Must be confirmed before implementation or publication

- Exact airports currently served, not merely reachable.
- Which of SGF, 3DW, BBG/BKG, FWB, PLK, 2H2, M17, HFJ, and JLN are actively in scope.
- Whether Lee's Summit/LXT is genuinely served; otherwise remove it from current copy.
- Airport/FBO/ramp/hangar access rules and whether the customer must arrange access.
- Any travel radius, travel fees, minimum job size, water/power requirements, and scheduling limitations.
- Whether Ozark Aircraft Wash is based at any airport. Nothing inspected confirms an airport base; do not claim one.
- Whether full aircraft ceramic coating is a current service. If yes: exact product/system, training or authorization that may truthfully be stated, prep/correction scope, expected durability wording, cure requirements, price validity, and maintenance terms. If no: unpublish/redirect the current page.
- The actual spray ceramic product and support for the “approximately 3–6 months” claim. Never describe spray protection as permanent or multi-year.
- Accuracy and current validity of all displayed prices, category examples, add-ons, monthly-plan scope, and condition/travel surcharges.
- The specific products/procedures that support “aircraft-safe” and “aviation-safe” wording, without overstating certification or approval.
- Whether services are performed for jets/turboprops and all manufacturer categories shown in pricing; category pricing is not proof of specialized expertise.
- Public business address, business hours, email, owner/team biography, insurance/licensing/certifications, and any response-time statement. None should be added without evidence.
- Permission to use each gallery image and any aircraft/customer/location identification; whether tail numbers need privacy treatment.
- Any reviews/testimonials and permission to quote them; do not add aggregate-rating schema without eligible, visible, genuine reviews.
- Preferred canonical host (`ozarkaircraftwash.com` versus `www.ozarkaircraftwash.com`) and redirect control.
- Live deployment source and whether the current untracked files are intentionally production-ready.
- Search Console/Bing ownership, existing analytics account, privacy preference, and desired conversion events.

### Principal implementation risks

- Publishing templated airport/city pages without unique facts could create doorway/duplicate-content problems.
- Changing existing paths without real permanent redirects could lose accumulated signals and break links.
- Automatically generating location claims from a data list could publish an unverified service area at scale.
- Image conversion without visual QA could damage paint/detail fidelity.
- Adding a framework/CMS would increase maintenance burden without solving the current issues.
- A phone/SMS-only funnel may lose desktop leads; a form adds privacy, spam, delivery, and maintenance obligations.
- Claims about aircraft safety, protection duration, airport relationships, or certification can create trust and liability risk if not documented.

## 22. Phased implementation checklist

### Phase 0 — owner decisions and baseline

- [ ] Confirm deployment host, source branch/folder, and preferred apex/www host.
- [ ] Review and intentionally preserve current modified/untracked work.
- [ ] Confirm all services and prices.
- [ ] Decide the fate of `/full-aircraft-ceramic-coating/`.
- [ ] Confirm the specific airports/cities genuinely served.
- [ ] Confirm gallery permissions and privacy needs.
- [ ] Capture production performance/indexing baseline.

### Phase 1 — technical and factual cleanup

- [ ] Correct airport names/codes and remove or soften unverified “serve/regularly serve” claims.
- [ ] Exclude unconfirmed full-coating content from sitemap/indexing pending owner decision.
- [ ] Compress/resize images; add responsive formats, dimensions, and lazy loading.
- [ ] Extract shared CSS and pricing JS.
- [ ] Add semantic landmarks, skip link, focus styles, 44×44 mobile targets, and accessible mobile navigation.
- [ ] Server-render the default pricing state and preserve all current prices/gallery/contact features.
- [ ] Standardize phone/SMS URIs and quote instructions.
- [ ] Add full navigation/footer to secondary pages.
- [ ] Complete OG/Twitter metadata and create a dedicated social image.
- [ ] Update homepage organization/service schema using verified facts only.
- [ ] Generate a clean sitemap and confirm robots/canonical host behavior.
- [ ] Add `404.html`.

### Phase 2 — maintainable static generation and validation

- [ ] Add base and page-type templates plus human-editable data files.
- [ ] Add dependency-free build and validation scripts.
- [ ] Add `package.json`, README, and optional CI check.
- [ ] Enforce required metadata, publication flags, link checks, image budgets, and claim guardrails.
- [ ] Confirm generated output matches existing visual identity and routes.

### Phase 3 — core service depth

- [ ] Create `/services/` hub.
- [ ] Expand the existing waterless and spray-protection pages.
- [ ] Publish aircraft washing, wet wash, belly cleaning, bug removal, interior cleaning, and monthly-maintenance pages.
- [ ] Add contextual pricing, gallery, resource, and quote links.
- [ ] Validate each page for unique purpose rather than word-count targets.

### Phase 4 — educational resources

- [ ] Publish the seven initial owner-education articles in small batches.
- [ ] Add truthful reviewed/updated dates and real authorship/publisher information.
- [ ] Link resources to services and vice versa.
- [ ] Check that articles answer questions without unsupported technical or maintenance claims.

### Phase 5 — airport pages

- [ ] Publish an `/airports/` hub with only confirmed locations.
- [ ] Start with the smallest set among SGF, 3DW, BBG/BKG, FWB, and PLK that passes every publication gate.
- [ ] Include unique access/logistics/evidence on every page.
- [ ] Add 2H2, M17, HFJ, or JLN only after the same verification.
- [ ] Do not publish LXT unless genuine service coverage is documented.

### Phase 6 — aircraft pages

- [ ] Start with single-engine piston, twin-piston, turboprop, and light-jet category pages.
- [ ] Add manufacturer pages only when distinct, verified content exists.
- [ ] Audit wording for endorsement, factory approval, certification, and model-expertise implications.

### Phase 7 — measure and maintain

- [ ] Verify/submit Search Console and Bing sitemap.
- [ ] Add privacy-respecting conversion measurement only if approved.
- [ ] Monitor indexing, queries, calls/texts, crawl errors, and Core Web Vitals.
- [ ] Review prices, airports, service claims, links, and schema quarterly.
- [ ] Update `lastmod` only for substantive edits.
- [ ] Consolidate or improve pages that do not remain useful; never multiply thin variants to chase rankings.

## Final priority order

The five highest-priority improvements are:

1. Reduce the 16.11 MiB homepage image payload and add responsive, dimensioned, lazy-loaded gallery images.
2. Resolve unsupported location and full-ceramic claims before further indexing or page creation.
3. Add shared navigation/footer/CSS, semantic landmarks, accessible tap targets, and stronger internal links to every page.
4. Deepen the existing service/location pages and establish strict unique-content gates before adding airports or aircraft pages.
5. Add a small static build/validation workflow so metadata, schema, links, sitemap coverage, image budgets, and publication flags cannot drift.

No ranking outcome is promised or implied. The purpose of this plan is to improve accuracy, crawlability, usability, maintainability, performance, and conversion opportunities while preserving the site's static architecture and existing business features.
