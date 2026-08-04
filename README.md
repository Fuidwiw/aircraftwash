# Ozark Aircraft Wash website

This repository contains the static website for Ozark Aircraft Wash. It uses plain HTML, shared CSS, and a small amount of vanilla JavaScript. There is no CMS, frontend framework, database, runtime server, or third-party package dependency.

## Project structure

- `index.html` — homepage, current service summary, pricing, gallery, and quote actions.
- `aircraft-washing-springfield-mo/` and `aircraft-washing-branson-mo/` — current regional service-information pages.
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
- `SEO_IMPLEMENTATION_PLAN.md` — original audit and future-phase plan.

## Edit website text

Open the relevant `.html` file in a normal text editor. Preserve the semantic page structure, one H1, canonical URL, meta description, Open Graph fields, and JSON-LD. Run validation after every factual or structural edit.

Business facts that require confirmation before publication include:

- Any new airport, city, aircraft, manufacturer, or service claim.
- Airport/FBO affiliation, access, or base claims.
- Public address, email, hours, biography, credentials, reviews, insurance, or response-time claims.
- New product approvals, certifications, expected duration, or surface-suitability claims.
- New fees, pricing rules, travel radius, or availability promises.
- Any claim that full professional ceramic coating is currently offered.

Do not create location pages until each location is separately verified. A future structured airport data file should live at `data/airports.json`, but that file and those pages are intentionally deferred beyond Phase 1.

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
& 'C:\Users\Jesus Himself\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts\optimize_images.py
npm run validate
```

The Python path above is the bundled Codex desktop runtime used for this implementation. On another machine, use a Python installation with Pillow 12 or later and AVIF/WebP support. Review every resulting image visually before deployment, especially aircraft proportions, paint, reflections, lettering, and any visible aircraft identifiers. The public display names are intentionally descriptive (`ozark-aircraft-wash-logo`, `yellow-black-aircraft-exterior`, `yellow-black-aircraft-hangar-side`, and `yellow-black-aircraft-glossy-nose`); do not replace them with an aircraft model, airport, customer, or location unless independently verified.

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

Validation covers required metadata, canonical consistency, duplicate titles/descriptions, JSON-LD parsing, internal links and fragments, image references/dimensions/alt text, normalized phone/SMS links, sitemap coverage, unpublished-page exclusions, prohibited factual claims, preserved prices, and image budgets.

Browser checks are still required at narrow and wide viewports. Confirm navigation, pricing selection, call/text URIs, image proportions, no horizontal overflow, visible focus, and the retired ceramic notice.

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

## Deployment

Production response headers and `CNAME` indicate GitHub Pages, but the configured publishing branch/folder is not stored in this working tree. Before deploying:

1. Open the repository's GitHub **Settings → Pages** and verify the publishing source.
2. Run `npm run validate` and `npm test`.
3. Run `npm run serve` and manually check every public page plus an unknown URL.
4. Review `git status --short` and `git diff`; preserve unrelated work.
5. Commit the intended static files to the branch/folder confirmed in Pages settings.
6. After deployment, verify the canonical redirects, all five sitemap URLs, `robots.txt`, the 404 response, and the ceramic fallback.

Do not change DNS or assume a different publishing branch solely from this README.
