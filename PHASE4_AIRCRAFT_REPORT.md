# Phase 4 aircraft-category implementation report

Date: August 4, 2026

## Scope completed

Phase 4 added a static Aircraft Categories section without adding manufacturer pages, model pages, airports, services, prices, dependencies, or generated/downloaded imagery. The site now has an Aircraft hub and five pages matching the verified pricing categories: single-engine, twin-piston, turboprop, very light jet, and light jet.

## Pages created

- `/aircraft/`
- `/aircraft/single-engine-aircraft-washing/`
- `/aircraft/twin-piston-aircraft-washing/`
- `/aircraft/turboprop-aircraft-washing/`
- `/aircraft/very-light-jet-aircraft-washing/`
- `/aircraft/light-jet-aircraft-washing/`

Each category page contains distinct category considerations, available appearance-care services, quote factors, mobile logistics, access responsibilities, travel and scheduling qualifications, three or four visible native FAQ disclosures, call and SMS actions, breadcrumbs, and contextual service/resource links. Visible main-content word counts range from approximately 876 to 962 words.

## Existing pages modified

- `index.html`: added a compact category section, direct category links, and a pricing-adjacent Aircraft hub link.
- `services/index.html`: linked the existing pricing-category explanation to the Aircraft hub.
- `resources/index.html`: added a restrained Aircraft hub link in pricing context.
- Every current public page, `404.html`, and the retired ceramic fallback: added Aircraft to primary and footer navigation.

The shared navigation is Home, Services, Aircraft, Resources, Pricing, Gallery, and Quote. It remains a wrapped list rather than a complex dropdown.

## Internal linking

The Aircraft hub links to all five categories, Services, Resources, homepage pricing, gallery, quote information, phone, and SMS. Each category page links back to `/aircraft/`, to at least two relevant current services, to one or two relevant resource articles, and to homepage pricing/gallery/quote actions. Category pages deliberately do not link to every service or resource.

## Structured data and metadata

The hub uses `CollectionPage` and `BreadcrumbList`. Category pages use `Service`, `WebPage`, and `BreadcrumbList`, with the provider referencing `https://ozarkaircraftwash.com/#organization`. All six pages have unique titles, descriptions, canonical URLs, Open Graph fields, Twitter fields, `index, follow`, `lang="en"`, and exactly one H1. No Product, Offer, review, rating, certification, manufacturer relationship, or airport relationship was added.

## Sitemap and validation

All six canonical routes were added to `sitemap.xml` with the substantive implementation date. The homepage, Services hub, and Resource hub dates were updated because their visible content changed. The sitemap now contains exactly 26 indexable public URLs; the retired ceramic fallback remains excluded.

The dependency-free validator now verifies the six routes, exact sitemap count, hub coverage, category backlinks, service/resource links, call/SMS actions, breadcrumbs, JSON-LD types and canonical URLs, visible FAQs, unique metadata, navigation, preserved prices and category examples, excluded aircraft claims, and unsupported manufacturer/model or technical claims. Existing service, resource, link, image, metadata, claim, and image-budget checks remain active.

## Images and reuse

No new image file was created or modified. The Aircraft hub reuses the existing optimized `yellow-black-aircraft-exterior*` AVIF/WebP/JPEG derivatives sourced from `images/source/aircraft-1.jpg`. Its alt text describes only the visible colors and outdoor setting. Category pages intentionally use no photograph because the approved images do not verify a specific category. The social image remains the approved site illustration.

## Manufacturer and model wording controls

Model names appear only as the exact examples already present in `assets/js/pricing.js`. Every category page explains that examples are general pricing guidance and do not establish endorsement, factory authorization, model certification, specialized expertise, prior service, identical classification, or a guaranteed price. The light jet page explicitly says that not every Citation, Lear, or Phenom aircraft belongs in that category. No manufacturer or model landing page was created.

## Technical claims deliberately avoided

- No aerodynamic-performance, fuel-economy, flight-safety, or airworthiness claim.
- No mechanical or engine-condition conclusion, leak diagnosis, corrosion detection, inspection-readiness statement, or maintenance-compliance claim.
- No paint-thickness, repair, deicing, pressurization, avionics, flight-control, static-port, or pitot-system claim.
- No guaranteed suitability, damage prevention, airport access, response time, or availability.
- No FAA, OEM, factory, manufacturer, or government approval/certification claim.
- No promotion of full professional ceramic coating; spray protection remains temporary.
- No promotion of aircraft categories outside the five verified pricing groups.

## Owner approvals still required

- Whether future approved photography can truthfully represent any aircraft category; category pages currently use no photo.
- Whether category examples or prices ever change; both remain exactly as previously verified.
- Whether any manufacturer or model pages should ever be approved; none are warranted by pricing examples alone.
- Exact facility permission and access for any appointment remains owner/customer coordinated and location specific.
- Deployment remains owner controlled. Phase 4 was not staged, committed, pushed, pulled, rebased, reset, or deployed.

