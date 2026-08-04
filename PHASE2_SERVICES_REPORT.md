# Phase 2 services report

Date completed: August 3, 2026

## Pages created

- `/services/` — complete current-services hub.
- `/services/aircraft-washing/` — mobile exterior washing overview.
- `/services/wet-aircraft-washing/` — low-pressure wet hand-washing information.
- `/services/aircraft-belly-cleaning/` — condition-based belly cleaning information.
- `/services/aircraft-bug-removal/` — leading-edge, windshield, and exterior bug-removal guidance.
- `/services/aircraft-interior-cleaning/` — verified cabin-cleaning scope and limitations.
- `/services/monthly-aircraft-maintenance/` — verified recurring appearance-care plan.

## Pages expanded

- `/waterless-aircraft-wash/` now explains method suitability, condition assessment, microfiber handling, wet-wash alternatives, limitations, access, pricing, and related services.
- `/aircraft-ceramic-protection/` now explains temporary benefits, measured three-to-six-month wording, preparation, limitations, and the difference from the unavailable professional full coating.
- The homepage now points to the hub, links the principal service cards to current pages, and presents the remaining current services compactly without duplicating the hub.
- The Springfield and Branson pages now link contextually to the hub and current service pages while preserving cautious location, travel, and access wording.
- The 404 and retired full-ceramic fallback navigation now point to the services hub.

## Navigation and internal links

Public-page navigation uses Home, Services, Pricing, Gallery, and Quote, with Services pointing to `/services/`. Each current service page links to the hub, homepage pricing, homepage gallery, homepage quote information, call and SMS actions, and two or three contextually related services. No dropdown, airport page, aircraft-category page, manufacturer page, or retired-ceramic link was added.

## Metadata and structured data

The hub and eight service pages have unique titles and descriptions, canonical URLs on `https://ozarkaircraftwash.com`, index/follow directives, Open Graph fields, Twitter card fields, one H1, visible breadcrumbs, and matching `BreadcrumbList` JSON-LD. Each individual service page also has a truthful `Service` object referencing the existing organization ID. The hub uses `WebPage` and `BreadcrumbList`. No address, hours, reviews, ratings, certifications, hidden prices, airport affiliations, or manufacturer approvals were added.

## Sitemap and validation

The sitemap contains 12 canonical, indexable URLs: the homepage, services hub, eight current service pages, Springfield, and Branson. All materially changed entries use `2026-08-03`; the retired full-ceramic page is excluded.

The dependency-free validator now covers all 12 public pages plus the 404 and retired-service fallback. Added protections verify route existence, hub coverage, sitemap coverage, unique metadata, one H1, canonical-host consistency, internal links, service-page hub/pricing/gallery/quote/call/SMS links, visible and structured breadcrumbs, valid JSON-LD, image requirements, preserved pricing, image budgets, and the existing factual exclusions.

Final `npm run validate` and `npm test` runs both passed. Browser review covered the homepage, hub, eight service pages, Springfield, Branson, 404 response, and retired fallback at 320, 390, 768, and 1440 CSS pixels: 56 route/viewport combinations. All 56 checks had one H1, correct Services navigation, no horizontal overflow, explicit image dimensions, and no undersized primary controls. The homepage pricing selector successfully changed the initial Single Engine HTML state to Twin Piston pricing, a service FAQ opened with native `details`/`summary` behavior, approved photos retained their proportions, and the browser console reported no warnings or errors.

## Approved images used

- Services hub, aircraft washing, waterless washing, and bug removal use optimized variants derived from `images/source/aircraft-1.jpg`.
- Wet washing and monthly maintenance use optimized variants derived from `images/source/aircraft-2.jpg`.
- Belly cleaning and spray ceramic protection use optimized variants derived from `images/source/aircraft-3.jpg`.
- Interior cleaning uses no image because the approved library contains no cabin photo. This avoids implying that an exterior photograph shows interior work.

The repeated use is intentional because the approved source library contains three aircraft photos. Existing AVIF, WebP, and JPEG responsive derivatives are reused; no original was changed or deleted, and no stock or generated image was added. See `IMAGE_INVENTORY.md` for the placement map.

## Claims intentionally avoided

- No airport or FBO base, affiliation, endorsement, guaranteed access, or airport-address claim.
- No fixed radius, mileage fee, nationwide guarantee, fixed hours, same-day guarantee, emergency service, or response-time promise.
- No FAA, OEM, manufacturer, factory, or government approval/certification claim.
- No universal product or surface suitability claim.
- No warbird, helicopter, midsize-jet, or large-cabin-jet promotion.
- No manufacturer/model expertise claim.
- No maintenance, inspection, corrosion-detection, airworthiness, restoration, disinfection, repair, paint-correction, or performance claim.
- No new price, fee, contract, billing, cancellation, deposit, discount, or membership term.
- No active promotion of full professional ceramic coating; the page states it is planned but unavailable.

## Owner decisions still needed

- Whether to approve and supply additional original photography, especially a truthful cabin/interior image, to reduce repeated exterior-photo use.
- Whether any future airport, city, aircraft-category, manufacturer, or model page should be created; each requires separate factual approval and is outside Phase 2.
- Whether and when full professional ceramic coating becomes an actually available service. Until separately confirmed, it must remain unavailable and excluded from navigation, pricing, and the sitemap.
- Deployment remains an owner action. No files were deployed, pushed, committed, or staged during this phase.
