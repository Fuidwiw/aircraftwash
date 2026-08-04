# Approved image library inventory

Date reviewed: August 3, 2026

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
| Homepage | Hero background | `hero-aircraft.jpg` | `ozark-aircraft-wash-logo` at 480, 768, and 1200 pixels in AVIF, WebP, and JPEG, plus JPEG fallback | Empty alt because the illustration is decorative behind the page heading; the visible business name is already text on the page |
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

Every active derivative preserves the original aspect ratio. Site CSS uses `height: auto` and does not use `object-fit: cover`, hover scaling, or color filters on photographs. Below-the-fold placements are lazy-loaded and include explicit intrinsic dimensions, `srcset`, and `sizes`.
