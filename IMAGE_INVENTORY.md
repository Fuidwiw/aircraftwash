# Approved image library inventory

Date reviewed: September 5, 2026

The existing `images/source/` directory is the approved visual source library for this phase. No stock, downloaded, or AI-generated images were added. The four originals remain unchanged, and optimized public copies are stored separately in `images/`.

## Approved originals

| Original | Dimensions | File size | Visible content only | Public optimized stem |
|---|---:|---:|---|---|
| `images/source/hero-aircraft.jpg` | 1254 × 1254 | 1,655,539 bytes | Square Ozark Aircraft Wash illustration with a yellow, black, and white aircraft, water, wash wand, and business name | `images/ozark-aircraft-wash-logo*` |
| `images/source/aircraft-1.jpg` | 500 × 333 | 39,187 bytes | Yellow, black, and white aircraft parked outdoors under a blue sky | `images/yellow-black-aircraft-exterior*` |
| `images/source/aircraft-2.jpg` | 5712 × 4284 | 7,616,835 bytes | Side view of a yellow, black, white, and purple-trim aircraft inside a hangar | `images/yellow-black-aircraft-hangar-side*` |
| `images/source/aircraft-3.jpg` | 5712 × 4284 | 7,584,682 bytes | Front three-quarter view of a glossy black, yellow, white, and purple-trim aircraft inside a hangar | `images/yellow-black-aircraft-glossy-nose*` |

No aircraft model, airport, owner, customer, or location is inferred from these images. Small existing aircraft markings are preserved but are not identified or enlarged in the site copy.

## Page placement map

| Page | Placement | Original used | Optimized files | Alt treatment |
|---|---|---|---|---|
| Homepage | Primary photo hero | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose` at 480, 768, and 960 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | Describes only the visible glossy nose, aircraft colors, wings, and hangar; it does not identify a model or location |
| Homepage | Gallery image 1 | `aircraft-1.jpg` | `yellow-black-aircraft-exterior` at 320 and 500 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | Describes the visible aircraft colors and outdoor sky only |
| Homepage | Gallery image 2 | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side` at 480, 768, and 960 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | Describes the visible aircraft colors, side view, and hangar only |
| Homepage | Gallery image 3 | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose` at 480, 768, and 960 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | Describes the visible glossy nose, colors, wings, and hangar only |
| Springfield service information | Introductory service image | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Does not identify the location or imply the photo was taken in Springfield |
| Branson service information | Mobile service planning image | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | Does not identify the location or imply the hangar is in Branson |
| Waterless aircraft wash | Suitable-conditions section | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Does not claim that a waterless wash is being performed or shown |
| Spray ceramic protection | Benefits section | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose*` | Describes visible gloss without claiming that a coating caused it |
| All indexable pages | Social sharing image | `hero-aircraft.jpg` | `images/og-aircraft.jpg`, 1200 × 630 JPEG with the complete square artwork contained on a white field | Open Graph text identifies it as the Ozark Aircraft Wash illustrated logo |

The exterior photo is reused once because the approved library contains only three photographs for four current service-information pages. The other photographs are not repeated across secondary pages.

## Generated and legacy display files

The descriptive stems above are the active public files. Earlier Phase 1 generic derivatives (`hero-aircraft*`, `aircraft-1*`, `aircraft-2*`, and `aircraft-3*` in the root `images/` directory) remain in place but are no longer referenced by public HTML. They are generated copies, not additional source photographs. Originals are only the four files under `images/source/`.

Every active derivative preserves the original aspect ratio. The homepage photo hero uses a responsive full-bleed presentation with `object-fit: cover`; the source file itself is not cropped or altered, and mobile positioning is checked so markings are not emphasized. Content photos use `height: auto`. Below-the-fold placements are lazy-loaded and include explicit intrinsic dimensions, `srcset`, and `sizes`; the likely homepage LCP image is intentionally eager and has high fetch priority.

## September 2026 conversion redesign placements

No new image was created, downloaded, deleted, color-adjusted, or cropped during the conversion redesign. The approved library remains the only visual source.

| Page | Placement | Original used | Optimized display files | Notes |
|---|---|---|---|---|
| Homepage | Photo hero and gallery image 3 | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose*` | Hero is the only eager photograph and uses AVIF/WebP/JPEG responsive sources; gallery reuse is necessary because the library contains three aircraft photographs |
| Homepage | Gallery image 1 | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Visible-only outdoor aircraft description |
| Homepage | Gallery image 2 and regional-service image | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | Visible-only hangar-side description; the regional placement does not identify a location |
| Aviation Partners | Introductory image | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | General aviation-business context only; no partner, airport, customer, or affiliation is claimed |
| Sitewide header | Compact brand mark | `hero-aircraft.jpg` | `ozark-aircraft-wash-logo-480.webp` | Decorative empty alt because the adjacent brand name is visible text; fixed 44 × 44 display size |

## Phase 2 service-page placements

Phase 2 reused the same approved derivatives and did not create or download any new photography. The following placements were added or retained:

| Page | Original used | Optimized display files | Reason for selection |
|---|---|---|---|
| Services hub | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | General exterior aircraft view for the complete service overview |
| Aircraft washing | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | General exterior aircraft view without implying a specific method or location |
| Waterless aircraft washing | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Neutral exterior view; copy does not claim the pictured aircraft is being washed |
| Wet aircraft washing | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | Full side view that preserves aircraft proportions; no wet-wash action is claimed |
| Aircraft belly cleaning | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose*` | Lower front and exterior view without claiming that belly work is visibly shown |
| Aircraft bug removal | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Exterior and leading-edge context without identifying a model or location |
| Aircraft interior cleaning | None | None | The approved library has no cabin image; using no photo is more accurate than implying an exterior photo depicts interior work |
| Spray ceramic protection | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose*` | Visible gloss only; the alt text and copy do not claim that spray protection caused it |
| Monthly appearance maintenance | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | Neutral hangar view appropriate to recurring appearance-care planning |

Repeated-image disclosure: the approved library contains three aircraft photographs, so repeated use is necessary across eight service pages and the hub. `aircraft-1.jpg` is used on the hub and three service pages; `aircraft-2.jpg` is used on two service pages; and `aircraft-3.jpg` is used on two service pages. No image identifies an aircraft model, airport, customer, or location. Every placement uses the existing AVIF, WebP, and JPEG responsive variants, explicit intrinsic dimensions, accurate visible-only alt text, preserved aspect ratio, and lazy loading.

## Phase 3 resource placements

Phase 3 created no image files and reused three existing approved derivative sets:

| Resource page | Original used | Optimized display files | Reason and alt treatment |
|---|---|---|---|
| Resource Center hub | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Neutral exterior view for the complete education hub; alt text describes only visible colors and outdoor sky |
| How Often Should an Aircraft Be Washed? | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` | Hangar context supports the storage discussion without identifying the aircraft, hangar, or location |
| What Spray Ceramic Protection Does for Aircraft | `aircraft-3.jpg` | `yellow-black-aircraft-glossy-nose*` | Visible gloss supports the topic; the text and alt do not claim that the pictured finish resulted from spray protection |
| Other five resource articles | None | None | No approved image directly and truthfully illustrates DI water, residue removal, belly cleaning, or owner preparation; images were not forced into those articles |

Resource-image reuse is limited but intentional: each of the three approved aircraft photographs appears once in the Phase 3 resource section. Existing AVIF, WebP, and JPEG derivatives, dimensions, responsive sources, lazy loading, and aspect ratios are preserved. No stock or generated image was added, and no original or derivative was deleted.

## Phase 4 aircraft-category placements

Phase 4 created no image files and did not modify an original or derivative.

| Aircraft page | Original used | Optimized display files | Reason and alt treatment |
|---|---|---|---|
| Aircraft Categories hub | `aircraft-1.jpg` | `yellow-black-aircraft-exterior*` | Neutral exterior view for the complete category hub; alt text describes only visible aircraft colors and outdoor sky |
| Five aircraft-category pages | None | None | The approved library does not verify that a pictured aircraft represents any particular pricing category, so category-specific image claims were avoided |

The hub placement uses the existing AVIF, WebP, and JPEG responsive variants, explicit 500 × 333 intrinsic dimensions, accurate visible-only alt text, preserved aspect ratio, and lazy loading. The Open Graph image on all six Phase 4 pages remains `images/og-aircraft.jpg`, derived from the approved illustrated logo. No aircraft model, manufacturer, airport, customer, or location is inferred.

## Phase 5 airport placements

Phase 5 created no image files and did not modify or delete an approved original or derivative.

| Airport page | Placement | Original used | Optimized display files | Reason and alt treatment |
|---|---|---|---|---|
| Airport Service Area hub | Introductory service-region image | `aircraft-2.jpg` | `yellow-black-aircraft-hangar-side*` at 480, 768, and 960 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | A neutral hangar-side view for mobile service planning; alt text describes only the visible colors, side view, and hangar and does not identify an airport, aircraft model, customer, or location |
| All 18 airport detail pages | None | None | None | The approved source library does not verify that a photograph depicts any listed airport, so a potentially misleading location image was not used |

The hub image uses the existing 960 × 720 intrinsic dimensions, responsive `srcset` and `sizes`, lazy loading, and unchanged aspect ratio. Paint colors, reflections, lettering, proportions, and existing markings remain unaltered. Its reuse from earlier pages is necessary because the project has only three approved aircraft photographs; no stock photography or AI-generated image was introduced. All 19 Phase 5 pages use the existing `images/og-aircraft.jpg` social image derived from the approved illustrated logo.
