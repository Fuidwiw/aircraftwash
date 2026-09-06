import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const phone = "+14179890976";

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(full) : entry.name.endsWith(".html") ? [full] : [];
  });
}

function routeFor(file) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function current(route, section) {
  if (section === "services") return route.startsWith("/services/") || ["/waterless-aircraft-wash/", "/aircraft-ceramic-protection/"].includes(route);
  if (section === "aircraft") return route.startsWith("/aircraft/");
  if (section === "locations") return route.startsWith("/airports/") || route.startsWith("/aircraft-washing-");
  if (section === "resources") return route.startsWith("/resources/");
  return false;
}

function header(route) {
  const aria = (section) => current(route, section) ? ' aria-current="page"' : "";
  const homeCurrent = route === "/" ? ' aria-current="page"' : "";
  return `<header class="site-header"><nav class="navbar" aria-label="Primary navigation"><a class="brand" href="/"${homeCurrent}><img src="/images/ozark-aircraft-wash-logo-480.webp" srcset="/images/ozark-aircraft-wash-logo-480.webp 480w" sizes="44px" width="44" height="44" alt=""><span class="brand-copy">Ozark Aircraft Wash<small>Mobile Aircraft Detailing</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span aria-hidden="true">Menu</span></button><ul class="nav-links" id="primary-menu"><li><a href="/services/"${aria("services")}>Services</a></li><li><a href="/aircraft/"${aria("aircraft")}>Aircraft</a></li><li><a href="/airports/"${aria("locations")}>Locations</a></li><li><a href="/resources/"${aria("resources")}>Resources</a></li><li><a class="nav-contact" data-conversion="phone" href="tel:${phone}">Call</a></li><li><a class="nav-contact" data-conversion="text" href="sms:${phone}">Text</a></li><li><a class="nav-quote" data-conversion="quote-cta" href="/#quote">Get a Quote</a></li></ul></nav></header>`;
}

const footer = `<footer class="site-footer"><div class="footer-inner"><div><p><strong>Ozark Aircraft Wash</strong></p><p>Professional mobile aircraft detailing based in Ava and serving Southwest Missouri by appointment.</p><p><a data-conversion="phone" href="tel:${phone}">Call 417-989-0976</a><br><a data-conversion="text" href="sms:${phone}">Text 417-989-0976</a></p></div><nav aria-label="Service links"><h3>Explore</h3><ul class="footer-links"><li><a href="/services/">Services</a></li><li><a href="/aircraft/">Aircraft</a></li><li><a href="/airports/">Locations</a></li><li><a href="/resources/">Resources</a></li><li><a href="/#pricing-section">Pricing</a></li><li><a href="/#gallery">Gallery</a></li></ul></nav><nav aria-label="Business links"><h3>Work with us</h3><ul class="footer-links"><li><a data-conversion="quote-cta" href="/#quote">Request a quote</a></li><li><a data-conversion="partnership-cta" href="/aviation-partners/">Aviation partners</a></li><li><a href="/resources/how-to-prepare-an-aircraft-for-mobile-washing/">Prepare for service</a></li></ul></nav></div></footer>`;
const mobileActions = `<nav class="mobile-actions" aria-label="Quick contact"><a data-conversion="phone" href="tel:${phone}">Call</a><a data-conversion="text" href="sms:${phone}">Text</a><a data-conversion="quote-cta" href="/#quote">Get Quote</a></nav>`;

let changed = 0;
for (const file of htmlFiles(root)) {
  let html = fs.readFileSync(file, "utf8");
  const route = routeFor(file);
  const before = html;
  html = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, header(route));
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer);
  html = html.replace(/<nav class="mobile-actions"[\s\S]*?<\/nav>/, "");
  html = html.replace(/<script src="\/assets\/js\/site\.js" defer><\/script>/g, "");
  html = html.replace(/<\/body>/, `${mobileActions}<script src="/assets/js/site.js" defer></script></body>`);
  html = html.replace(/<a(?![^>]*data-conversion=)([^>]*href="tel:\+14179890976"[^>]*)>/g, '<a data-conversion="phone"$1>');
  html = html.replace(/<a(?![^>]*data-conversion=)([^>]*href="sms:\+14179890976"[^>]*)>/g, '<a data-conversion="text"$1>');
  html = html.replace(/<a(?![^>]*data-conversion=)([^>]*href="\/#quote"[^>]*)>/g, '<a data-conversion="quote-cta"$1>');
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(`Updated shared navigation, footer, mobile actions, and conversion hooks in ${changed} HTML files.`);

