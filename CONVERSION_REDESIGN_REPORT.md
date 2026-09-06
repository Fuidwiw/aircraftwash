# Conversion redesign report

Date completed: September 5, 2026

## Outcome

The static site was redesigned as a premium, conversion-focused mobile aircraft detailing website while preserving the existing architecture, canonical host, verified services, prices, airport registry, public routes, and factual safeguards. No framework, CMS, database, external form service, analytics package, stock photograph, or AI-generated image was added.

The primary market position is now “Mobile Aircraft Detailing in Southwest Missouri,” with Springfield treated as the principal regional demand center. Ava remains accurately disclosed as the business base in supporting regional, footer, access, and structured-data copy rather than dominating the homepage hero.

## Design and conversion changes

- Replaced the logo-led homepage hero with the approved glossy-aircraft photograph and a dark navy editorial treatment.
- Introduced a restrained navy, aviation blue, white, and muted gold design system with compact radii, stronger type hierarchy, wider spacing, and fewer heavy card effects.
- Replaced the eight-link header with Logo, Services, Aircraft, Locations, Resources, Call, Text, and a visually distinct Get a Quote action. The logo provides the Home link.
- Added an accessible hamburger menu with `aria-expanded`, Escape-key close behavior, link-close behavior, visible focus states, and large tap targets.
- Added a fixed mobile Call / Text / Get Quote action bar.
- Added a verified-fact trust strip: Mobile Service, Equipment & Water Provided, Aircraft-Specific Products, and Southwest Missouri.
- Reorganized the homepage around outcomes, approved work photography, aircraft-specific planning, preserved pricing, a four-step process, regional coverage, recurring care, aviation-business inquiries, quote intake, and FAQs.
- Added stable `data-conversion` hooks for phone, text, quote CTA, quote submit, and partnership actions. No tracking software is installed.
- Standardized the header, footer, mobile actions, and shared behavior script across all current HTML documents.

## New aviation-partner page

`/aviation-partners/` invites inquiries from FBOs, flight schools, charter operators, aircraft managers, and other aviation organizations. It carefully states that the page does not represent an existing affiliation, endorsement, exclusive arrangement, or guaranteed service agreement. The page is canonical, indexable, represented in the sitemap, and linked from the homepage and footer.

## Quote form behavior

The homepage now contains labeled fields for name, phone, email, airport/location, aircraft make/model, requested service, optional tail number, optional preferred date, and optional notes. Native HTML validation provides a useful frontend experience.

There is no approved backend or form provider in the project. A valid quote-form submission now creates a URL-encoded SMS addressed to `+14179890976` from the entered aircraft, location, service, date, tail-number, contact, and notes fields; email is intentionally excluded. The visitor reviews and sends the message in their own messaging app. A visible fallback can copy the quote details or open the verified call and text actions, and the site does not claim that information was sent, stored, or received.

## Factual claim changes

| Area | Previous emphasis or wording | Current verified treatment |
|---|---|---|
| Homepage position | Mobile aircraft washing based in Ava | Professional mobile aircraft detailing in Southwest Missouri, with Springfield regional emphasis; Ava remains disclosed as the base |
| Service framing | Mostly process/category labels | Existing services are framed by customer outcome without adding services or changing scope |
| Airport pages | “Aircraft Washing at [Airport]” | “Aircraft Detailing at [Airport]” while retaining appointment, access, travel, permission, and no-affiliation qualifications |
| Airport hub | Airport Aircraft Washing Service Area | Mobile Aircraft Detailing at Southwest Missouri Airports, retaining all 18 registry-controlled locations and verified identifiers |
| Springfield regional page | Aircraft washing in Springfield | Mobile aircraft detailing in Springfield, still conditional on travel, access, facility rules, and scheduling |
| Branson regional page | Aircraft washing in Branson | Mobile aircraft detailing in Branson, still conditional on travel, access, facility rules, and scheduling |
| Aviation organizations | No dedicated inquiry page | New discussion page with an explicit statement that no existing airport/FBO relationship is represented |
| Quote form | Call/text information only | Frontend inquiry fields with a truthful no-backend fallback to call/text |

No claim was added for pilot ownership, insurance, certifications, years of experience, reviews, customer names, airport access, airport/FBO partnerships, fixed availability, nationwide availability, or manufacturer/FAA approval. Full professional ceramic coating remains unavailable, unlinked from current-service navigation, noindex, absent from the sitemap, and canonicalized to the current spray ceramic protection page.

## Pricing preservation

All five aircraft groups and every service, add-on, and monthly-plan amount in `assets/js/pricing.js` remain unchanged. The single-engine fallback HTML also remains unchanged:

- Waterless wash: $225
- Wet wash: $275
- Full exterior detail: $750
- Interior cleaning: $250
- Spray ceramic protection: $350
- Belly degrease: $75
- Monthly maintenance: $175/month
- Monthly add-ons: $75, $100, and $150

The validator continues to pin every amount and category example across all five groups.

## Approved image use and payload

Only existing files from the approved `images/source/` library and their existing optimized derivatives are used. Originals were not deleted or modified. `IMAGE_INVENTORY.md` records the updated placement map.

- Original audited homepage image payload: approximately 16.11 MiB.
- Current largest unique modern homepage set: 298.6 KiB against a 450 KiB budget.
- Current largest unique JPEG-fallback set plus compact WebP header mark: 564.7 KiB against a 900 KiB budget.
- Approximate reduction from the original audited payload to the modern set: 98.2%.

The hero uses responsive AVIF, WebP, and JPEG sources, explicit intrinsic dimensions, high fetch priority, and no lazy loading. Below-the-fold photographs use responsive sources, dimensions, lazy loading, accurate visible-only alt text, and unmodified source aspect ratios. Aircraft models, airports, customers, and locations are not inferred from photographs.

## Architecture and maintenance

- `assets/css/site.css` is the shared design system.
- `assets/js/site.js` contains mobile-menu and quote-fallback behavior.
- `scripts/apply_conversion_chrome.mjs` reapplies shared navigation, footer, mobile actions, conversion hooks, and the shared script after static page generation.
- `scripts/generate_airport_pages.mjs` now emits the updated airport-detailing position and shared premium chrome.
- `npm run build` regenerates airport pages and documentation without third-party dependencies.
- `npm run validate` and `npm test` run the dependency-free validation suite.

## Deployment

No deployment, DNS, GitHub Pages setting, commit, push, or external-system change was made. The established canonical host remains `https://ozarkaircraftwash.com` and `CNAME` remains unchanged.

After owner review, use the repository’s existing GitHub Pages publishing source documented in `README.md` and `FINAL_DEPLOYMENT_CHECKLIST.md`. Before publication, run `npm run build`, `npm run validate`, `npm test`, and `git diff --check`; preview every route; then verify the apex and `www` redirects, sitemap, robots file, 404 response, retired ceramic fallback, form fallback, call/SMS actions, and representative routes on the live host.

## Owner confirmation still needed

- Whether to connect the quote workflow to a specific secure form provider or backend in a future phase. Until then it remains a transparent SMS handoff.
- “Pilot Owned” is owner-verified and is now published in the homepage hero, trust strip, and aircraft-aware care section.

## Final conversion-copy cleanup

- Removed operational disclaimers from the homepage hero and replaced them with Pilot Owned, Mobile Service, and Equipment & Water Provided trust signals.
- Added concise pilot-owned positioning without implying maintenance credentials, certifications, insurance status, or airport affiliation.
- Simplified the four-step homepage process and moved the one necessary permission note below the steps.
- Reframed the Springfield and Southwest Missouri section around regional convenience.
- Rebuilt all 18 generated airport detail pages so services, benefits, aircraft categories, scheduling, and quote actions lead; access, security, and non-affiliation language now appears in one near-bottom Airport & Facility Coordination section.
- Rewrote the aviation-partner page for FBOs, maintenance shops, flight schools, aircraft managers, brokers/dealers, and charter operators without inventing current partnerships.
- Added validation for Pilot Owned, prohibited hero caveat terms, the encoded SMS workflow, copy fallback, airport-page opening language, and coordination-section consolidation.
- Whether any aviation-organization relationship may later be named; none is claimed now.
- The current GitHub Pages publishing branch/folder and owner-controlled deployment timing.
