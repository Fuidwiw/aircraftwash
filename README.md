# Ozark Aircraft Wash website

This repository contains the static website for Ozark Aircraft Wash. It uses plain HTML, shared CSS, and a small amount of vanilla JavaScript. There is no CMS, frontend framework, database, runtime server, or third-party package dependency.

## Project structure

- `index.html` — homepage, current service summary, pricing, gallery, and quote actions.
- `services/` — current services hub plus aircraft washing, wet washing, belly cleaning, bug removal, interior cleaning, and monthly-maintenance pages.
- `aircraft-washing-springfield-mo/` and `aircraft-washing-branson-mo/` — current regional service-information pages.
- `airports/` — Airport Service Area hub plus 18 verified airport-specific planning pages.
- `data/airports.json` — publication-controlled airport identity, source, date, grouping, nearby-link, and travel-context registry.
- `waterless-aircraft-wash/` and `aircraft-ceramic-protection/` — current service pages.
- `full-aircraft-ceramic-coating/` — retired-service fallback notice; not an available service page.
- `404.html` — branded not-found page.
- `assets/css/site.css` — shared layout, colors, responsive behavior, and accessibility styles.
- `assets/js/pricing.js` — all interactive aircraft-category prices.
- `images/` — optimized public images and responsive derivatives.
- `images/source/` — untouched source images; these are archived and are not referenced by public HTML.
- `IMAGE_INVENTORY.md` — approved-original inventory and page-by-page image placement map.
- `scripts/optimize_images.py` — repeatable image conversion helper.
- `scripts/validate.mjs` — dependency-free site validation.
- `scripts/serve.mjs` — dependency-free local preview server.
- `sitemap.xml`, `robots.txt`, and `CNAME` — search and GitHub Pages domain files.
- `PHASE1_CLAIMS_REPORT.md` — factual wording changed during Phase 1.
- `PHASE2_SERVICES_REPORT.md` — Phase 2 page, navigation, linking, schema, sitemap, validation, and image summary.
- `PHASE2_CONTENT_MATRIX.md` — purpose, metadata, related links, images, FAQs, and approximate visible word counts for every service page.
- `SEO_IMPLEMENTATION_PLAN.md` — original audit and future-phase plan.

### Phase 3 resource files

- `resources/` contains the Resource Center hub and seven aircraft-care articles.
- `PHASE3_RESOURCES_REPORT.md` records resource architecture, navigation, linking, schema, sitemap, validation, images, and claim limits.
- `PHASE3_CONTENT_MATRIX.md` records search intent, article differentiation, links, metadata, schema, FAQs, word counts, and reviewed dates.

### Phase 4 aircraft-category files

- `aircraft/` contains the Aircraft Categories hub and five category pages matching the current pricing selector.
- `PHASE4_AIRCRAFT_REPORT.md` records Phase 4 routes, navigation, links, schema, validation, image reuse, and claim safeguards.
- `PHASE4_CONTENT_MATRIX.md` records category intent, examples, unique sections, links, metadata, schema, FAQs, and visible word counts.

### Phase 5 airport files

- `airports/` contains the Airport Service Area hub and exactly 18 approved airport pages.
- `data/airports.json` is the source of truth for published airport names, identifiers, source URLs, verification dates, regional groups, nearby links, and qualitative travel context.
- `scripts/generate_airport_pages.mjs` regenerates the static airport hub and 18 pages from the approved registry and maintained unique content profiles.
- `scripts/generate_phase5_docs.mjs` regenerates the Phase 5 content matrix and verification table from the registry and published HTML.
- `PHASE5_AIRPORTS_REPORT.md`, `PHASE5_CONTENT_MATRIX.md`, and `PHASE5_AIRPORT_VERIFICATION.md` document implementation, differentiation, identity verification, source decisions, and remaining owner questions.

### Phase 6 audit files

- `PHASE6_FINAL_AUDIT.md` records the final technical, factual, content, accessibility, performance, and deployment-readiness audit.
- `FINAL_DEPLOYMENT_CHECKLIST.md` is the operator checklist for repository review, GitHub Pages publication, production verification, and post-launch monitoring.
- `FINAL_ROUTE_INVENTORY.md` inventories all 45 canonical public pages plus the branded 404 and retired-service fallback.
- `scripts/generate_final_route_inventory.mjs` regenerates the route inventory directly from the current HTML and sitemap.

## Edit website text

Open the relevant `.html` file in a normal text editor. Preserve the semantic page structure, one H1, canonical URL, meta description, Open Graph fields, and JSON-LD. Run validation after every factual or structural edit.

Business facts that require confirmation before publication include:

- Any new airport, city, aircraft, manufacturer, or service claim.
- Airport/FBO affiliation, access, or base claims.
- Public address, email, hours, biography, credentials, reviews, insurance, or response-time claims.
- New product approvals, certifications, expected duration, or surface-suitability claims.
- New fees, pricing rules, travel radius, or availability promises.
- Any claim that full professional ceramic coating is currently offered.

Do not create an additional location page until the location is separately verified and explicitly approved. Airport data lives in `data/airports.json`; a record needs an official source, verification date, approved identifiers and slug, nearby links, and `published: true` before its page, navigation links, or sitemap entry may be generated.

## Edit service copy and internal links

Each service is a directly editable static `index.html` file. Preserve its unique purpose instead of copying paragraphs from another service page. Every current service page must retain:

- A link back to `/services/`.
- Links to `/#pricing-section`, `/#gallery`, and `/#quote`.
- A contextual main-content link to `/aircraft/` for the supported aircraft-category guidance.
- Normalized call and text links.
- Visible breadcrumbs that match its `BreadcrumbList` JSON-LD.
- A truthful `Service` object referencing `https://ozarkaircraftwash.com/#organization`.
- Two or three natural links to genuinely related services.

To add or change a related-service link, use the published canonical route and descriptive anchor text. Do not add a link to `/full-aircraft-ceramic-coating/`, an airport route absent from `data/airports.json`, an unapproved aircraft/manufacturer page, or any route that has not been approved and published.

## Verify and update airport information

Airport pages contain marketing and appointment-planning information, not navigation or operational guidance. Before changing a name, identifier, associated city, or publication state:

1. Recheck a current FAA, airport, municipal, or state official source.
2. Update `data/airports.json`, including `verificationSource`, `verificationDate`, naming notes, nearby links, and qualitative travel context.
3. Preserve `published: true` only when owner approval and verification are complete.
4. Update the maintained airport-specific profile in `scripts/generate_airport_pages.mjs` without copying another page's local paragraphs.
5. Run `node scripts/generate_airport_pages.mjs` and `node scripts/generate_phase5_docs.mjs`.
6. Review the generated diff, metadata, visible name/identifiers, access and affiliation wording, links, and unique local content.
7. Add or change the sitemap URL only after the page passes `npm run validate`.

Never add runway data, frequencies, NOTAMs, fuel prices, FBO directory/contact data, gate or security information, airport hours, navigation guidance, an airport business address, or an airport/FBO relationship claim. Customers remain responsible for permission and access. Airport changes can occur, so visible identity should be rechecked before a substantive republication.

## Edit educational resources

Each educational article is a directly editable `resources/<slug>/index.html` file. Preserve its direct answer near the top, visible `Reviewed by Ozark Aircraft Wash` date, link to `/resources/`, Services hub and relevant service links, visible native FAQ disclosures, quote actions, one H1, breadcrumbs, and matching `Article` plus `BreadcrumbList` JSON-LD.

When article content changes substantively, update the visible reviewed date, `datePublished`/`dateModified` as factually appropriate, sitemap `lastmod`, and `PHASE3_CONTENT_MATRIX.md`. Do not automatically change dates for formatting-only work. Do not add an invented expert byline, credential, unsupported technical conclusion, or outside citation that has not been separately verified.

Educational content is limited to cleaning and appearance care. It must not present maintenance, inspection, corrosion, safety, mechanical, performance, or airworthiness conclusions.

## Update page metadata

When service copy changes materially, review the page’s unique `<title>`, meta description, canonical URL, Open Graph title/description/URL/image, and Twitter title/description/image. Keep one H1 and `index, follow` on current public services. Structured data must match the visible page wording.

Do not add a meta keywords tag, hidden prices, reviews, ratings, an address, business hours, credentials, certifications, or airport affiliations.

## Update sitemap entries

`sitemap.xml` contains only canonical, indexable public pages. Add a URL only after its route, metadata, links, structured data, and factual review are complete. Use a date-only `lastmod` only when that page received substantive content changes. Do not add `priority` or `changefreq`, and never add the retired full-ceramic URL.

## Update prices

All category pricing and examples are in `assets/js/pricing.js`. The default single-engine price rows also appear directly in `index.html` so useful prices remain visible without JavaScript.

When a verified price changes:

1. Update the applicable value in `assets/js/pricing.js`.
2. If it is a default single-engine value, update the matching row in `index.html`.
3. Update the preserved-price fixtures in `scripts/validate.mjs` so the intentional change is explicit.
4. Run `npm run validate` and test every category in the browser.

## Replace or optimize images

Public HTML uses AVIF, WebP, and JPEG fallbacks. `IMAGE_INVENTORY.md` records the visible content, dimensions, page placement, alt-text approach, and optimized location for every approved original. The source filenames are fixed so the optimizer can regenerate every active derivative:

- `images/source/hero-aircraft.jpg`
- `images/source/aircraft-1.jpg`
- `images/source/aircraft-2.jpg`
- `images/source/aircraft-3.jpg`

Do not download or generate a replacement when a suitable approved image already exists. Replace an original only after the new image has been approved, then run:

```powershell
python scripts\optimize_images.py
npm run validate
```

Image regeneration additionally requires Python with Pillow 12 or later and AVIF/WebP support. It is not required for ordinary text edits, validation, or preview. Review every resulting image visually before deployment, especially aircraft proportions, paint, reflections, lettering, and any visible aircraft identifiers. The public display names are intentionally descriptive (`ozark-aircraft-wash-logo`, `yellow-black-aircraft-exterior`, `yellow-black-aircraft-hangar-side`, and `yellow-black-aircraft-glossy-nose`); do not replace them with an aircraft model, airport, customer, or location unless independently verified.

The validator enforces these largest-responsive-set budgets:

- Modern AVIF set: at most 450 KiB.
- JPEG fallback set: at most 900 KiB.

The archived `images/source/` folder is intentionally excluded from homepage payload calculations.

## Validate and test

Node.js is the only tool required for validation and preview. No `npm install` step is needed.

```powershell
npm run validate
npm test
npm run serve
```

- `npm run validate` and `npm test` run the same full static-site validation.
- `npm run serve` starts `http://127.0.0.1:8000` and serves directory indexes plus the branded 404 page.
- Stop the preview server with `Ctrl+C`.

Validation covers required metadata, canonical consistency, duplicate titles/descriptions, JSON-LD parsing, visible/schema breadcrumb parity, internal links and fragments, image references/dimensions/alt text, normalized phone/SMS links, sitemap coverage, unpublished-page exclusions, prohibited factual claims, preserved prices, and image budgets.

Phase 3 checks also cover the Resource hub, seven article routes, exactly 20 sitemap URLs, Resources navigation, Article and breadcrumb schema, reviewed-date consistency, relevant service/quote links, visible FAQs, and narrowly defined unsupported educational or credential claims.

Phase 4 checks cover the Aircraft hub, five category routes, Aircraft navigation, category/service/resource links, call and SMS actions, breadcrumbs, Service/WebPage schema, visible FAQs, unchanged pricing examples and amounts, and manufacturer/model and technical-claim guardrails.

Phase 5 checks cover the Airport hub, exactly 18 registry-controlled airport routes, exactly 45 sitemap URLs, eight-item navigation, 700–1100 airport-page words, verified identifiers and dates, required access/travel/independence wording, related service/resource/nearby links, call and SMS actions, FAQ and schema requirements, unapproved-route exclusions, operational-data exclusions, and duplicate-content similarity safeguards.

Phase 6 adds visible/schema breadcrumb parity, contextual Aircraft-hub links on service pages, and a repeated-paragraph safeguard that permits only necessary standardized airport notices while catching excessive copied marketing copy.

Browser checks are still required at narrow and wide viewports. Confirm navigation, pricing selection, call/text URIs, image proportions, no horizontal overflow, visible focus, and the retired ceramic notice.

For Phase 2, manually preview these route groups after validation:

- `/` and `/services/`
- All eight service pages listed in `PHASE2_CONTENT_MATRIX.md`
- `/aircraft-washing-springfield-mo/` and `/aircraft-washing-branson-mo/`
- `/404.html` and `/full-aircraft-ceramic-coating/`

Check at approximately 320, 390, 768, and 1440 CSS pixels. Confirm that service cards, FAQ disclosures, related-service links, images, buttons, and sticky navigation remain usable without horizontal scrolling.

Also preview `/resources/` and every article listed in `PHASE3_CONTENT_MATRIX.md`. Confirm resource cards, comparison layouts, checklists, reviewed dates, FAQ controls, related links, and the current eight-item navigation at each target width.

Preview `/aircraft/` and every category listed in `PHASE4_CONTENT_MATRIX.md` at the same widths. Confirm the eight-item navigation wraps cleanly, category cards and related links work, FAQs use native disclosures, and category examples remain qualified as pricing guidance rather than expertise or endorsement claims.

Preview `/airports/`, every route in `PHASE5_CONTENT_MATRIX.md`, both regional pages, and representative service/resource/aircraft pages at 320, 390, 768, and 1440 CSS pixels. Confirm airport cards and nearby links work, identifiers remain readable, FAQs use native disclosures, call/SMS actions are tappable, images preserve proportions, and no horizontal overflow, affiliation claim, guaranteed access claim, or operational airport data appears.

Before publishing any service claim, verify new procedures, products, durations, prices, aircraft categories, access promises, or scheduling terms with the owner. Full professional ceramic coating remains unavailable and must not return to navigation, active services, pricing, or the sitemap. Any airport beyond the 18 registry-controlled Phase 5 records, and any new aircraft-category, manufacturer, or model page, requires separate verification and approval.

## Canonical host and production redirects

The selected canonical host is:

```text
https://ozarkaircraftwash.com
```

This is established by `CNAME`, every canonical URL, and production checks performed on August 3, 2026. The live server identified itself as GitHub Pages and returned:

- `http://ozarkaircraftwash.com/` → 301 to `https://ozarkaircraftwash.com/`
- `http://www.ozarkaircraftwash.com/` → 301 to `https://ozarkaircraftwash.com/`
- `https://www.ozarkaircraftwash.com/` → 301 to `https://ozarkaircraftwash.com/`
- `https://ozarkaircraftwash.com/` → 200
- A tested `www` service-page URL redirected to the equivalent apex path.

No canonical-host redirect is currently missing. Keep the GitHub Pages custom domain set to `ozarkaircraftwash.com`, keep `CNAME` unchanged, and keep “Enforce HTTPS” enabled in the repository's Pages settings. Those settings are outside this repository and must be verified before deployment.

## Ceramic-page redirect behavior

Full professional ceramic coating is planned but is not currently offered. The old path is therefore absent from navigation and `sitemap.xml`.

GitHub Pages does not provide a repository-level per-path HTTP 301 rule. The repository fallback at `/full-aircraft-ceramic-coating/` therefore:

- states that the service is not currently available;
- uses `noindex, follow`;
- canonicals to `/aircraft-ceramic-protection/`;
- links visitors to the currently offered spray ceramic service;
- does not use JavaScript or a meta-refresh redirect.

If a reverse proxy or CDN is added later, configure this exact permanent redirect before removing the fallback file:

```text
Match host: ozarkaircraftwash.com
Match path: /full-aircraft-ceramic-coating and /full-aircraft-ceramic-coating/*
Destination: https://ozarkaircraftwash.com/aircraft-ceramic-protection/
Status: 301 Permanent Redirect
Preserve query string: yes
```

The redirect must be path-specific and must not redirect unrelated 404s.

## Final review prerequisites and workflow

Required for ordinary review:

- Node.js with `npm`; no package installation is needed.
- A modern browser for the five target widths: 320, 390, 768, 1024, and 1440 CSS pixels.
- Repository and GitHub Pages settings access for the person performing deployment.

Optional only when regenerating images: Python with Pillow 12 or later plus AVIF/WebP support.

Before publication:

1. Run `node scripts/generate_final_route_inventory.mjs`, `npm run validate`, `npm test`, and `git diff --check`.
2. Start `npm run serve` and review every route in `FINAL_ROUTE_INVENTORY.md`, including `404.html` and the retired ceramic fallback.
3. Verify keyboard navigation, pricing selection, native FAQ disclosures, call/SMS URIs, image proportions, and horizontal overflow at all target widths.
4. Review `git status -sb` and the complete diff. Include only intended files in any later commit.
5. Follow `FINAL_DEPLOYMENT_CHECKLIST.md`; the checklist separates repository readiness from owner-controlled GitHub Pages, DNS, deployment, and Search Console actions.

## Deployment

Production response headers and `CNAME` indicate GitHub Pages, but the configured publishing branch/folder is not stored in this working tree. Before deploying:

1. Open the repository's GitHub **Settings → Pages** and verify the publishing source.
2. Run `npm run validate` and `npm test`.
3. Run `npm run serve` and manually check every public page plus an unknown URL.
4. Review `git status --short` and `git diff`; preserve unrelated work.
5. Commit the intended static files to the branch/folder confirmed in Pages settings.
6. After deployment, verify the canonical redirects, all 45 sitemap URLs, `robots.txt`, the 404 response, the airport hub and representative airport pages, and the ceramic fallback.

Do not change DNS or assume a different publishing branch solely from this README.
