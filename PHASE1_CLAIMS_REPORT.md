# Phase 1 factual claim changes

Date: August 3, 2026

This report records factual marketing and service claims changed during the Phase 1 technical cleanup. It does not introduce airport pages, manufacturer pages, aircraft-model pages, reviews, credentials, hours, email, or new services.

## Sitewide identity and availability

| Files | Previous claim or implication | Phase 1 wording/action | Reason |
|---|---|---|---|
| All public HTML pages and footer | The business was framed primarily around Springfield and Branson, without a stated base city. | States that Ozark Aircraft Wash is a mobile business based in Ava, Missouri, serving Southwest Missouri. | Ava is now verified; no airport is presented as the business base. |
| Homepage and regional pages | Broad statements that service is available at airports throughout the named area. | States that mobile washing may be available where access and local rules permit. | Airport access and permission are conditional. |
| Homepage and regional pages | No clear party was responsible for ramp, gate, hangar, or facility access. | Adds that customers must arrange aircraft and facility access and notify the applicable airport, FBO, hangar operator, or facility when required. | Customer responsibility is verified. |
| Homepage and service pages | Water/equipment responsibility was unclear or described mainly as a service-selection variable. | States that Ozark Aircraft Wash brings its own cleaning equipment, products, and water supply. | This operating model is verified; customers are not told to supply water or power. |
| Homepage and regional/service pages | Travel language implied broad availability without a confirmed travel policy. | Says regional service is available, longer-distance appointments are considered individually, and travel charges may apply based on distance and scheduling. | Avoids an invented radius or guaranteed availability. |
| Homepage and regional pages | No advance-notice or scheduling qualification. | Says at least 24 hours of advance notice is preferred and availability varies with travel, weather, access, and existing commitments. | Reflects verified scheduling preference without a response-time guarantee. |

## Airport and location claims

| File | Previous claim or implication | Phase 1 wording/action | Reason |
|---|---|---|---|
| `index.html` | Listed SGF, BKG, FWB, 2H2, M17, HFJ, JLN, and Lee's Summit/LXT under “Airports We Serve.” | Removes the named-airport list and replaces it with conditional airport/private-facility availability. | Individual airports have not been approved for new or expanded claims in this phase. |
| `index.html` | Said the business regularly serves Springfield, Branson, Ozark, Nixa, Republic, Aurora, Monett, Bolivar, Joplin, and surrounding airports. | Removes the “regularly serve” city list; describes service from Ava throughout Southwest Missouri with longer trips considered individually. | Removes unsupported frequency and unrestricted coverage implications. |
| `index.html` | Presented Lee's Summit Municipal Airport (`LXT`) as actively served. | Removes Lee's Summit and `LXT` entirely. | Active service at LXT is not verified. |
| `aircraft-washing-springfield-mo/index.html` | Named Springfield-Branson National Airport and several nearby airports as served. | Removes named-airport claims; describes Springfield-area appointments as conditional on travel, weather, access, and commitments. | Avoids airport-specific claims until later verification. |
| `aircraft-washing-branson-mo/index.html` | Named BKG, FWB, and SGF and referred broadly to private hangars and airport facilities. | Removes named-airport claims; describes Branson-area appointments and permitted facilities cautiously. | Avoids implying affiliation, permanent access, or guaranteed service. |
| Springfield and Branson pages | Referred to aircraft owners, pilots, hangar tenants, and aviation operators as served groups. | Focuses on mobile service conditions and owner-arranged access instead of asserting customer relationships. | No customer-group evidence or partnerships were provided. |

## Products and aircraft-care claims

| Files | Previous claim or implication | Phase 1 wording/action | Reason |
|---|---|---|---|
| Homepage and service pages | Used broad “aviation-safe chemicals” or “aircraft-safe products” wording. | Names RealClean Aviation Products as products selected for aircraft cleaning and appearance care; asks customers to disclose special coatings, finishes, and manufacturer restrictions. | Uses the verified brand without claiming FAA/OEM approval or universal surface suitability. |
| Homepage pricing descriptions | Described some methods as aircraft-safe. | Uses measured descriptions such as “aircraft-cleaning products” and “careful aircraft-cleaning methods.” | Avoids certification or universal-approval implications. |
| Waterless page | Implied waterless washing was ideal whenever water use was limited. | Says it may fit suitable conditions and that wet washing may be more appropriate for other contamination. | Avoids treating waterless cleaning as universally suitable. |

## Ceramic protection claims

| File | Previous claim or implication | Phase 1 wording/action | Reason |
|---|---|---|---|
| `index.html` | Contained hidden full-coating card, full-coating price fields, and code capable of revealing an available full-coating offer. | Removes the card, link, price data, display flag, and all available-service promotion. | Full professional coating is planned but not currently offered. |
| `sitemap.xml` | Listed `/full-aircraft-ceramic-coating/` as an indexable service page. | Removes the URL from the sitemap. | Unavailable services must not be promoted or submitted for indexing. |
| `full-aircraft-ceramic-coating/index.html` | Advertised full coating, longer-term protection, prep/correction work, and quote actions as current offerings. | Replaces the page with a short factual notice stating that full professional coating is planned but unavailable; adds `noindex, follow` and a canonical/link to spray protection. | GitHub Pages cannot provide a repository-level per-path 301; this is the non-JavaScript fallback. |
| `aircraft-ceramic-protection/index.html` | Called spray protection a maintenance-style option and distinguished it from a full coating. | Clarifies that it is a temporary protective finish, not paint correction, permanent protection, a cured aviation system, factory approval, or manufacturer certification. | Preserves the current service while preventing confusion with the planned service. |
| Homepage, pricing JS, and spray page | Stated approximately 3–6 months of spray protection depending on use, storage, and exposure. | Preserves the existing duration wording and adds “temporary” and “short-term” context. | The instruction explicitly allowed the duration already present on the website. |

## Pricing claims

| Files | Previous claim or implication | Phase 1 wording/action | Reason |
|---|---|---|---|
| `index.html` and `assets/js/pricing.js` | Prices were present but lacked the newly verified qualification. | Preserves every category, example, package amount, add-on, and monthly-plan price; adds that pricing may vary by condition, location, travel distance, access requirements, and requested work. | Prices are verified; qualification reflects confirmed variables without inventing fees. |
| `index.html` | Default prices were injected only after JavaScript ran. | Places all default single-engine prices in the initial HTML and lets JavaScript enhance category switching. | This is a technical presentation change, not a factual price change. |

## Claims intentionally not added

No claim was added for airport/FBO affiliation, guaranteed airport access, a public street address, public email, fixed hours, same-day or emergency service, nationwide availability, a fixed mileage fee, certifications, training, insurance, reviews, years of experience, manufacturer approval, FAA approval, helicopters, warbirds, midsize jets, large-cabin jets, or service for every aircraft type.
