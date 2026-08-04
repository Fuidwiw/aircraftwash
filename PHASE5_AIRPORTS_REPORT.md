# Phase 5 Airport Service Area Report

Implementation date: August 4, 2026

## Pages created

- One Airport Service Area hub at `/airports/`.
- Exactly 18 approved airport pages, all represented in `data/airports.json` and itemized in `PHASE5_CONTENT_MATRIX.md`.
- No additional airport, city, aircraft, manufacturer, model, resource, review, map, or operational-guide page was created.

## Existing pages modified

- `index.html`: added a compact Airport Service Area card and clear Ava-base, access, and travel qualifications.
- `services/index.html`: linked mobile-service planning to the verified airport hub.
- `aircraft/index.html`: linked category and quote planning to airport-specific logistics.
- `resources/index.html`: paired the owner-preparation guide with the airport hub.
- `aircraft-washing-springfield-mo/index.html`: linked the regional page to SGF/KSGF and Downtown Airport/3DW pages.
- `aircraft-washing-branson-mo/index.html`: linked the regional page to PLK/KPLK, BBG/KBBG with IATA BKG, and FWB/KFWB pages.
- All 28 pre-Phase-5 HTML documents, including the 404 and retired ceramic fallback, received the same Airports item in primary and footer navigation. Their existing purpose and content were otherwise preserved except for the six integrations above.

## Navigation and homepage integration

Primary and footer navigation now use eight items: Home, Services, Aircraft, Airports, Resources, Pricing, Gallery, and Quote. The Airport Service Area hub is reachable sitewide. The homepage uses a representative hub card rather than listing all 18 airports, and it states that the business is based in the City of Ava rather than at an airport.

## Services, aircraft, and resource integration

The Services hub connects access planning to the airport section. The Aircraft hub connects aircraft category, configuration, and quoting context to airport logistics. The Resource Center connects the preparation checklist to the verified location registry. These additions preserve the Phase 2–4 hubs and do not add services, categories, or articles.

## Internal linking structure

- The hub links to every approved airport and groups them geographically.
- Every airport page links back to the Airport, Services, and Aircraft hubs.
- Every airport page links to at least two relevant current services, one relevant resource, current pricing guidance, call and SMS actions, and two nearby approved airport pages.
- Springfield and Branson regional pages remain broad regional pages and now point to the appropriate airport-specific pages.
- No unapproved airport route can pass validation or enter the sitemap.

## Structured data and metadata

Each airport page has a unique title, description, canonical, Open Graph fields, Twitter fields, one H1, and `Service`, `WebPage`, and `BreadcrumbList` JSON-LD. The hub uses `CollectionPage` and `BreadcrumbList`. The schema identifies the provider through the existing Organization node and uses city-level `areaServed`; it does not use an airport as a business address or add reviews, hours, prices, certifications, affiliations, or operational data.

## Sitemap and validation

The sitemap increased from 26 to exactly 45 canonical public URLs: 19 new airport-section URLs plus the 26 existing public URLs. Substantively integrated pages received an August 4, 2026 `lastmod`.

The dependency-free validator now checks:

- exactly 18 published registry records and airport pages;
- required source URLs, verification dates, approved nearby slugs, and unique slugs;
- exactly 45 canonical sitemap URLs;
- the eight-item primary and footer navigation;
- 700–1100 visible main-content words per airport page;
- unique metadata, identifiers, city/state context, breadcrumbs, JSON-LD, FAQs, service/resource links, call/SMS links, access language, travel language, measured RealClean wording, and independent-service language;
- no links to an airport route outside the registry;
- no runway, frequency, NOTAM, fuel-price, or FBO-directory data;
- pairwise five-word-shingle similarity below 82% plus at least two substantial airport-specific paragraphs per page;
- the unchanged Phase 1–4 metadata, links, prices, category restrictions, retired ceramic fallback, and image budgets.

## Image use and reuse

No image was downloaded, generated, deleted, converted, or newly created. The hub reuses approved source `images/source/aircraft-2.jpg` through existing `yellow-black-aircraft-hangar-side*` AVIF, WebP, and JPEG derivatives. It retains the 960 × 720 intrinsic size, responsive `srcset`/`sizes`, lazy loading, preserved aspect ratio, and visible-only alt text. Individual airport pages deliberately use no photograph because the approved library does not verify that any photo depicts a listed airport. All pages retain the existing approved illustrated Open Graph image.

## Access disclaimers and travel wording

Pages state that customers arrange aircraft and facility access, notify the responsible airport/FBO/hangar operator/facility when required, and identify an allowed work area. Inclusion never promises gate, ramp, hangar, security, or aircraft access. Sensitive credentials are not requested.

Travel language remains qualitative. Appointments are considered individually from Ava; travel charges may apply based on location and scheduling; and at least 24 hours of advance notice is preferred. No fixed radius, mileage fee, guaranteed date, same-day service, emergency service, after-hours service, or response time was added.

## Airport claims deliberately avoided

- No airport or FBO base, address, partnership, affiliation, endorsement, or preferred-provider claim.
- No guaranteed access, unrestricted availability, or assurance that washing is allowed in a proposed area.
- No runway, frequency, navigation, NOTAM, fuel, FBO contact/directory, security, operating-hours, or airport-procedure guidance.
- No copied airport marketing language beyond the minimum verified identity and naming context.
- No airport-specific customer, aircraft, review, or photograph claim.

## Remaining owner questions

- Facility permission and the allowed work area remain appointment-specific and must be confirmed by the customer with the responsible facility.
- Actual travel charge and date availability remain quote-specific.
- Future changes to airport names or identifiers require reverification before publication.
- The owner may later decide whether to adopt public-facing “Regional” branding for Boone County in preference to the FAA-registered wording; the current discrepancy is documented.
- The owner may later confirm whether the City of Lebanon branding or the abbreviated FAA registered name should control future metadata; the current page uses the city-facing name.

No deployment, staging, commit, push, pull, reset, rebase, analytics installation, DNS change, or hosting-setting change was performed.
