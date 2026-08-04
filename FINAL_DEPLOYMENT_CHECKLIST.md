# Final Deployment Checklist

Use this checklist only after the owner approves the complete local Phase 1–6 change set. Phase 6 did not stage, commit, push, change GitHub settings, alter DNS, or deploy.

1. **Validate.** From `C:\Projects\Aircraft-Wash`, run:

   ```powershell
   node scripts\generate_final_route_inventory.mjs
   npm run validate
   npm test
   git diff --check
   ```

   Stop if any command fails or if regenerating `FINAL_ROUTE_INVENTORY.md` produces an unexplained diff.

2. **Preview.** Run `npm run serve`, open `http://127.0.0.1:8000`, and review every document in `FINAL_ROUTE_INVENTORY.md` at 320, 390, 768, 1024, and 1440 CSS pixels. Include `/404.html` and `/full-aircraft-ceramic-coating/`. Recheck pricing, FAQ disclosures, navigation, call/SMS links, focus visibility, images, and horizontal overflow.

3. **Inspect the Git diff.** Run:

   ```powershell
   git status -sb
   git diff --check
   git diff
   git ls-files --others --exclude-standard
   ```

   Confirm that all intended Phase 1–6 files are included and that unrelated work is excluded. Pay particular attention to the generated `airports/`, `aircraft/`, `resources/`, and `services/` trees, `data/airports.json`, documentation, sitemap, validation scripts, and responsive images.

4. **Commit.** After owner approval, stage only the reviewed files and create one descriptive commit. Do not use a broad staging command unless every displayed untracked and modified file has been reviewed. Re-run validation against the exact committed tree.

5. **Resolve remote divergence safely.** Fetch remote references, then inspect both sides before integrating anything:

   ```powershell
   git fetch origin
   git status -sb
   git rev-list --left-right --count HEAD...origin/main
   git log --oneline --graph --decorate --left-right HEAD...origin/main
   ```

   At the Phase 6 audit, local `main` was one commit ahead of `origin/main` with no remote-only commit shown. If that changes, stop and review the remote commits. Choose a normal merge or rebase only after the owner decides which history is intended. Do not default to reset, force-push, or discarding either side.

6. **Push.** Push the reviewed branch normally. Do not force-push. Confirm the remote commit SHA matches the locally approved commit.

7. **Confirm the GitHub Pages build.** In repository **Settings → Pages**, verify the publishing branch/folder, custom domain `ozarkaircraftwash.com`, and **Enforce HTTPS**. Confirm the Pages build completes successfully. These settings are not stored in this working tree, and Phase 6 did not change them.

8. **Check live routes.** Verify the apex homepage, all 45 sitemap URLs, `robots.txt`, `sitemap.xml`, an unknown URL, and the retired ceramic fallback. Confirm the old production copy is gone—especially the LXT listing, active full-ceramic promotion, old Springfield/Branson-only positioning, and unsupported product wording. Also verify HTTP and `www` requests redirect to the equivalent apex HTTPS path.

9. **Submit the sitemap.** In the owner-controlled Google Search Console property for the canonical apex host, submit `https://ozarkaircraftwash.com/sitemap.xml`. Do not assume Search Console ownership or create a new property without owner authorization.

10. **Request indexing.** After the new HTML is live, use URL Inspection for the homepage and the Services, Aircraft, Airports, and Resources hubs. Request indexing only for canonical, indexable pages. Do not request indexing for `404.html` or the retired full-ceramic fallback.

11. **Monitor Search Console.** Watch indexing, sitemap processing, canonical selection, mobile usability, and enhancement reports. Recheck airport facts before later substantive republication. Treat any new airport, service, aircraft category, price, credential, address, hours, review, affiliation, or availability claim as owner-verification work before publication.

## GitHub Pages constraints retained

- The deployable site is plain static HTML/CSS/JavaScript; no build step or server runtime is required.
- `CNAME` selects `ozarkaircraftwash.com`, and canonical URLs use that apex host.
- Root-relative links are appropriate for the custom-domain root deployment.
- GitHub Pages has no repository-level per-path 301 configuration. The full-ceramic URL therefore remains a short `noindex, follow` fallback canonicalized to `/aircraft-ceramic-protection/` until a reverse proxy or CDN can provide the exact permanent redirect documented in `README.md`.
