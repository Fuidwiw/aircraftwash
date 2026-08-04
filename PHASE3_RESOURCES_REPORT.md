# Phase 3 resources report

Date completed: August 3, 2026

## Pages created

- `/resources/` — grouped aircraft-care Resource Center hub.
- `/resources/how-often-should-an-aircraft-be-washed/`
- `/resources/waterless-vs-wet-aircraft-washing/`
- `/resources/why-deionized-water-is-used-for-aircraft-washing/`
- `/resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/`
- `/resources/aircraft-belly-cleaning-guide/`
- `/resources/what-spray-ceramic-protection-does-for-aircraft/`
- `/resources/how-to-prepare-an-aircraft-for-mobile-washing/`

## Pages modified

The homepage gained a compact three-article section. The Services hub gained a concise two-guide education section. Each current service page gained one or two contextually relevant resource links. The homepage, Services hub, all eight service pages, Springfield, Branson, 404, and retired ceramic fallback gained Resources in primary and footer navigation.

## Navigation and internal linking

Primary navigation now uses Home, Services, Resources, Pricing, Gallery, and Quote, without a dropdown. Every article links to the Resource hub, Services hub, at least one relevant service, related educational content, call and SMS actions, and the homepage quote section. The hub links all seven articles and includes service, pricing, gallery, and quote paths. Links from service pages are selective: method comparison from waterless, DI-water education from wet washing, topic guides from belly/bug/spray, wash frequency from monthly care, and mobile preparation from washing/interior.

## Metadata and Article schema

All eight resource pages have unique titles, descriptions, canonical URLs, index/follow directives, Open Graph and Twitter fields, one H1, visible breadcrumbs, and matching `BreadcrumbList` JSON-LD. The hub uses `CollectionPage`; each article uses `Article` with the canonical URL, `datePublished` and `dateModified` of `2026-08-03`, `mainEntityOfPage`, and the existing organization publisher reference. Images appear in Article schema only on the two articles where the approved image is visibly present. Visible attribution reads “Reviewed by Ozark Aircraft Wash · August 3, 2026”; no person, biography, or credential was invented.

## Sitemap and validation

The sitemap now contains the existing 12 public URLs plus the Resource hub and seven articles, for exactly 20 canonical indexable URLs. All Phase 3 pages use substantive-change `lastmod` date `2026-08-03`; the retired ceramic fallback remains excluded.

The dependency-free validator now covers 20 public pages, seven resource articles, 404, and the retired fallback. New checks verify resource routes, exact sitemap count, Resources navigation, hub coverage, service and quote links, FAQs, reviewed-date text, Article and breadcrumb schema, matching Article dates, publisher reference, visible schema images, and narrowly defined unsupported technical or credential claims. Existing metadata, link, image, price, claim, and payload protections remain active.

Final `npm run validate` and `npm test` runs passed, and `git diff --check` reported no whitespace errors. Browser QA covered the homepage, Resource hub, seven articles, Services hub, eight service pages, Springfield, Branson, 404 response, and retired fallback at 320, 390, 768, and 1440 CSS pixels: 88 route/viewport combinations. All 88 had one H1, correct Services and Resources navigation, no horizontal overflow, explicit image dimensions, and no undersized navigation or primary controls. Every article had its reviewed date, three FAQ disclosures, and normalized call/SMS actions at all widths. The seven Resource hub cards resolved correctly, a card navigation and FAQ expansion were exercised, homepage pricing changed from the default Single Engine state to Twin Piston values, approved images retained their proportions, and the browser console reported no warnings or errors.

## Approved images and reuse

- Resource hub: optimized derivatives from `images/source/aircraft-1.jpg`.
- Wash-frequency article: optimized derivatives from `images/source/aircraft-2.jpg`.
- Spray-protection article: optimized derivatives from `images/source/aircraft-3.jpg`.
- Five other articles: no image because the approved library does not directly depict their specific educational subject.

No stock, downloaded, or generated image was added. No original or derivative was changed or removed. Every reused placement preserves responsive AVIF/WebP/JPEG markup, dimensions, lazy loading, aspect ratio, and visible-only alt text.

## Technical claims deliberately avoided

- No quantified aerodynamic, fuel-consumption, safety, or performance effect from bugs or residue.
- No corrosion detection or prevention, paint preservation/failure, leak diagnosis, mechanical conclusion, inspection result, or airworthiness determination.
- No chemical-purity guarantee, universal spot-free result, or claim that DI water replaces products, hand washing, rinsing, or drying.
- No assertion that waterless or wet washing is universally superior or suitable.
- No FAA, OEM, manufacturer, factory, or government approval/certification claim.
- No permanent, multi-year, cured, corrective, or scratch-repair claim for spray ceramic protection.
- No active full professional ceramic service promotion; it remains explicitly unavailable.
- No expert byline, author biography, training claim, or aircraft-care credential.
- No instruction for owners to move or operate aircraft beyond their authority or normal procedures.

## Owner decisions still required

- Whether to approve additional original photography that truthfully depicts washing, DI-water use, belly work, bug removal, or cabin preparation.
- Whether any external authoritative citations should be added later after exact sources and wording are separately reviewed.
- Whether future airport, aircraft-category, manufacturer, or model pages should be approved; none were created in Phase 3.
- Whether and when professional full aircraft ceramic coating becomes genuinely available. Until confirmed, it remains unavailable and excluded from navigation, pricing, and sitemap.
- Deployment remains an owner-controlled action. Phase 3 was not staged, committed, pushed, or deployed.
