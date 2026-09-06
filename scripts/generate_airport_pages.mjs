import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const airports = JSON.parse(fs.readFileSync(path.join(root, "data", "airports.json"), "utf8"));
const canonicalHost = "https://ozarkaircraftwash.com";

if (airports.length !== 18) throw new Error(`Expected exactly 18 verified airports, found ${airports.length}`);
function salesFaqItems(a) {
  return [
    ["What aircraft detailing services are available?", "Current services include exterior washing, interior cleaning, belly cleaning, bug removal, spray ceramic protection, and recurring appearance care. The right selection depends on the aircraft and the result requested."],
    ["What does the mobile service bring?", "Ozark Aircraft Wash arrives with its own aircraft-cleaning equipment, RealClean Aviation Products, and water supply for the agreed appearance-care service."],
    ["What should I include in a quote request?", `Share ${a.name}, the aircraft category and general condition, the service you want, and your preferred appointment date. Call, text, or use the homepage quote tool to start the conversation.`]
  ].map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
}

function airportPage(a) {
  const p = profiles[a.slug];
  if (!p) throw new Error(`Missing unique profile for ${a.slug}`);
  const variant = airports.findIndex(airport => airport.slug === a.slug) % 6;
  const idText = identifiers(a).join(" · ");
  const title = `Aircraft Detailing at ${a.name} | Ozark Aircraft Wash`;
  const description = `Professional mobile aircraft detailing at ${a.name} in ${a.city}, ${a.state}. Explore aircraft washing, interior care, focused cleaning, and recurring appearance care.`;
  const canonical = `${canonicalHost}/airports/${a.slug}/`;
  const nearby = a.nearbyAirportSlugs.map(slug => {
    const nearbyAirport = airports.find(item => item.slug === slug);
    return `<article><h3><a href="/airports/${nearbyAirport.slug}/">${nearbyAirport.name}</a></h3><p>${nearbyAirport.city}, ${nearbyAirport.state} · ${identifiers(nearbyAirport).join(" · ")}</p></article>`;
  }).join("");
  const benefits = [
    ["Care Comes to the Aircraft", "Mobile service reduces the need to reposition an aircraft solely for appearance care."],
    ["Equipment & Water Provided", "We arrive with aircraft-cleaning equipment, selected products, and our own water supply."],
    ["One Clear Service Scope", "Aircraft condition and the result you want guide the work discussed in your quote."]
  ].map(([heading, copy]) => `<article class="service-card"><h3>${heading}</h3><p>${copy}</p></article>`).join("");
  const schedulingIntroductions = [
    "Start with the aircraft, location, and result you want. We turn those details into a clear service conversation.",
    "A useful appointment request begins with the aircraft, its condition, and the appearance-care goal.",
    "Tell us what you fly, where it is kept, and which visible concerns you want addressed.",
    "Share the aircraft category, its general condition, and the service that best matches your goal.",
    "Begin with a simple call, text, or quote request describing the aircraft and the desired result.",
    "Aircraft details, condition, location, and service preference give us what we need to discuss the appointment."
  ];
  const coordinationIntros = [
    "Local operating practices and the proposed work area shape the final coordination conversation.",
    "The airport identity and appointment context below help keep planning specific to this location.",
    "Each facility has its own operating environment, so final work-area details are handled together.",
    "Location-specific planning keeps the requested service aligned with the actual aircraft and work area.",
    "Airport context matters when confirming where and how the agreed appearance-care work will take place.",
    "Final coordination connects the requested service with the aircraft's location and the responsible facility."
  ];
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,"name":`Mobile aircraft detailing at ${a.name}`,"serviceType":"Mobile aircraft washing and appearance care by appointment","url":canonical,"provider":{"@id":`${canonicalHost}/#organization`},"areaServed":{"@type":"City","name":`${a.city}, ${a.state}`},"description":description},{"@type":"WebPage","@id":`${canonical}#webpage`,"url":canonical,"name":title,"isPartOf":{"@id":`${canonicalHost}/#website`},"about":{"@id":`${canonical}#service`}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":`${canonicalHost}/`},{"@type":"ListItem","position":2,"name":"Airports","item":`${canonicalHost}/airports/`},{"@type":"ListItem","position":3,"name":a.name,"item":canonical}]}]};
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><meta property="og:site_name" content="Ozark Aircraft Wash"><meta property="og:title" content="Aircraft Detailing at ${a.name}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${canonicalHost}/images/og-aircraft.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Aircraft Detailing at ${a.name}"><meta name="twitter:description" content="Professional mobile aircraft appearance care in ${a.city}, ${a.state}."><meta name="twitter:image" content="${canonicalHost}/images/og-aircraft.jpg"><link rel="stylesheet" href="/assets/css/site.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body>${header()}<main id="main-content" tabindex="-1"><div class="container page-intro airport-page">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/airports/">Airports</a></li><li aria-current="page">${a.name}</li></ol></nav>
  <section class="airport-intro no-image card"><span class="eyebrow">Mobile aircraft appearance care</span><div class="identifier-row">${identifiers(a).map(id => `<span class="identifier-badge">${id}</span>`).join("")}</div><h1>Aircraft Detailing at ${a.name}</h1><p>${a.city}, ${a.state} · ${idText}</p><p>Professional mobile aircraft detailing for eligible aircraft at ${a.name}. Exterior washing, interior care, belly cleaning, bug removal, spray ceramic protection, and recurring aircraft care are available by appointment.</p><div class="button-row"><a class="button" href="tel:+14179890976">Call</a><a class="button secondary" href="sms:+14179890976">Text</a><a class="button secondary" href="/#quote">Get a Quote</a></div></section>
  <section class="card"><span class="eyebrow">Current appearance-care options</span><h2>Aircraft Detailing Services</h2><p>Choose focused care for the exterior, cabin, lower surfaces, finish, or an ongoing appearance routine. These current service pages explain the work and visible result in more detail.</p><div class="airport-service-grid">${serviceLinks(p, a)}</div><p><a href="/services/">Compare all current aircraft detailing services</a> and <a href="/#pricing-section">review current pricing</a>.</p></section>
  <section class="card"><h2>Mobile-Service Benefits</h2><div class="grid">${benefits}</div></section>
  <section class="card"><h2>Supported Aircraft Categories</h2><p>Current pricing and service guidance covers <a href="/aircraft/single-engine-aircraft-washing/">single-engine aircraft</a>, <a href="/aircraft/twin-piston-aircraft-washing/">twin-piston aircraft</a>, <a href="/aircraft/turboprop-aircraft-washing/">turboprops</a>, <a href="/aircraft/very-light-jet-aircraft-washing/">very light jets</a>, and <a href="/aircraft/light-jet-aircraft-washing/">light jets</a>. <a href="/aircraft/">Explore aircraft categories</a> to find the closest starting point for your quote.</p></section>
  <section class="card"><h2>How Scheduling Works</h2><p>${schedulingIntroductions[variant]}</p><ol class="process-list"><li><strong>Request a quote.</strong> Share the aircraft, location, condition, and desired service.</li><li><strong>Confirm the details.</strong> We discuss scope, timing, and the proposed work location.</li><li><strong>Meet at the aircraft.</strong> We arrive with the equipment, products, and water for the agreed service.</li></ol></section>
  <section class="card related-resources"><h2>Helpful Owner Resources</h2><div class="related-grid">${resourceLinks(p, a)}</div></section>
  <section class="card nearby-airports"><h2>Nearby Airport Service Areas</h2><div class="nearby-airport-grid">${nearby}</div><p><a href="/airports/">Return to the complete Airport Service Area</a>.</p></section>
  <section class="card faq-section airport-faq"><h2>${a.name} Service Questions</h2>${salesFaqItems(a)}</section>
  <section class="card access-notice"><h2>Airport &amp; Facility Coordination</h2><p>${coordinationIntros[variant]} ${p.focus}</p><p>${p.scope}</p><p>${p.schedule}</p><p>Customer or facility permission is required where applicable. Secure or restricted-area entry is not implied, and the customer arranges any required aircraft, ramp, hangar, gate, or security access. Do not send gate codes, security credentials, identity documents, or other sensitive access information through this website.</p><p><strong>Independent mobile service:</strong> Ozark Aircraft Wash is based in Ava, Missouri and is not represented as being based at, affiliated with, endorsed by, or partnered with ${a.name} or any FBO.</p><p class="source-note">Airport identity reviewed August 4, 2026. Airport names, identifiers, and facility requirements can change; this page is service information, not an aviation navigation resource.</p></section>
  <section class="quote-callout"><div><h2>Request Aircraft Detailing at ${a.name}</h2><p>Tell us about the aircraft, its condition, and the appearance-care result you want.</p></div><div class="button-row"><a class="button" href="tel:+14179890976">Call</a><a class="button secondary" href="sms:+14179890976">Text</a><a class="button outline" href="/#quote">Get a Quote</a></div></section>
</div></main>${footer("Airports")}</body></html>`;
}

function airportHub() {
  const groups = [...new Set(airports.map(a => a.regionGroup))];
  const cards = group => airports.filter(a => a.regionGroup === group).map(a => `<article class="airport-card"><div class="identifier-row">${identifiers(a).map(id => `<span class="identifier-badge">${id}</span>`).join("")}</div><h3><a href="/airports/${a.slug}/">${a.name}</a></h3><p>${a.city}, ${a.state}</p></article>`).join("");
  const canonical = `${canonicalHost}/airports/`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","@id":`${canonical}#webpage`,"url":canonical,"name":"Southwest Missouri Airport Aircraft Detailing","description":"Verified airport service-area information for mobile aircraft washing from Ava, Missouri.","isPartOf":{"@id":`${canonicalHost}/#website`},"publisher":{"@id":`${canonicalHost}/#organization`}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":`${canonicalHost}/`},{"@type":"ListItem","position":2,"name":"Airports","item":canonical}]}]};
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Southwest Missouri Airport Aircraft Detailing | Ozark Aircraft Wash</title><meta name="description" content="Explore mobile aircraft detailing service areas across Southwest Missouri and northern Arkansas, including Springfield, Branson, Ava, and surrounding communities."><link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><meta property="og:site_name" content="Ozark Aircraft Wash"><meta property="og:title" content="Southwest Missouri Airport Aircraft Detailing"><meta property="og:description" content="Mobile aircraft washing and appearance care across 18 verified airport areas."><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${canonicalHost}/images/og-aircraft.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Southwest Missouri Airport Aircraft Detailing"><meta name="twitter:description" content="Explore Missouri and northern Arkansas airport service areas."><meta name="twitter:image" content="${canonicalHost}/images/og-aircraft.jpg"><link rel="stylesheet" href="/assets/css/site.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body>${header()}<main id="main-content" tabindex="-1"><div class="container page-intro">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Airports</li></ol></nav>
  <section class="airport-intro card"><div><span class="eyebrow">Mobile service region</span><h1>Mobile Aircraft Detailing at Southwest Missouri Airports</h1><p>Based in Ava, Ozark Aircraft Wash brings professional mobile aircraft detailing to the Springfield region, Southwest Missouri, and nearby northern Arkansas communities.</p><p>Explore 18 verified public-use airport areas, compare current services, and request exterior, interior, focused cleaning, spray ceramic protection, or recurring aircraft care.</p><div class="button-row"><a class="button" href="tel:+14179890976">Call</a><a class="button secondary" href="sms:+14179890976">Text</a><a class="button secondary" href="/#quote">Get a Quote</a></div></div><picture class="service-photo compact"><source type="image/avif" srcset="/images/yellow-black-aircraft-hangar-side-480.avif 480w, /images/yellow-black-aircraft-hangar-side-768.avif 768w, /images/yellow-black-aircraft-hangar-side-960.avif 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px"><source type="image/webp" srcset="/images/yellow-black-aircraft-hangar-side-480.webp 480w, /images/yellow-black-aircraft-hangar-side-768.webp 768w, /images/yellow-black-aircraft-hangar-side-960.webp 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px"><img src="/images/yellow-black-aircraft-hangar-side.jpg" srcset="/images/yellow-black-aircraft-hangar-side-480.jpg 480w, /images/yellow-black-aircraft-hangar-side-768.jpg 768w, /images/yellow-black-aircraft-hangar-side-960.jpg 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px" width="960" height="720" loading="lazy" decoding="async" alt="Yellow, black, white, and purple-trim aircraft shown from the side inside a hangar"></picture></section>
  <section class="card"><h2>How Airport Appointments Work</h2><div class="grid"><article class="service-card"><h3>Choose a Location</h3><p>Open the airport page for verified name and identifier context.</p></article><article class="service-card"><h3>Select the Service</h3><p>Compare current exterior, interior, protection, and recurring-care options.</p></article><article class="service-card"><h3>Request a Quote</h3><p>Share the aircraft, condition, desired work, and preferred date by call, text, or the quote tool.</p></article></div></section>
  ${groups.map(group => `<section class="airport-group card"><h2>${group}</h2><div class="airport-grid">${cards(group)}</div></section>`).join("")}
  <section class="content-split"><article class="card"><h2>Services and Aircraft Categories</h2><p>Compare the <a href="/services/">current Services hub</a> and <a href="/aircraft/">five supported aircraft pricing categories</a> to choose a starting point for your aircraft.</p></article><article class="card"><h2>Prepare for Service</h2><p>Use the <a href="/resources/how-to-prepare-an-aircraft-for-mobile-washing/">mobile-wash preparation guide</a>, <a href="/#pricing-section">review current pricing</a>, and <a href="/#gallery">view the approved gallery</a>.</p></article></section>
  <section class="card access-notice"><h2>Airport &amp; Facility Coordination</h2><p>Customer or facility permission is required where applicable. Secure or restricted-area entry is not implied, and the customer arranges required aircraft and facility access. Do not send gate codes or sensitive security information through the website.</p><p>Ozark Aircraft Wash is an independent mobile business based in Ava, Missouri and is not represented as affiliated with, endorsed by, or partnered with an airport or FBO. Airport names, identifiers, and facility requirements can change and should be confirmed during scheduling.</p></section>
  <section class="quote-callout"><div><h2>Plan an Airport Appointment</h2><p>Tell us where the aircraft is kept, what it needs, and the result you want.</p></div><div class="button-row"><a class="button" href="tel:+14179890976">Call</a><a class="button secondary" href="sms:+14179890976">Text</a><a class="button outline" href="/#quote">Get a Quote</a></div></section>
</div></main>${footer("Airports")}</body></html>`;
}

for (const airport of airports) {
  if (!airport.published || !airport.verificationDate || !airport.verificationSource?.length) {
    throw new Error(`Refusing to publish unverified airport record: ${airport.slug}`);
  }
}

const profiles = {
  "ava-bill-martin-memorial-airport-aircraft-washing": {
    focus: "Because this is the closest listed airport to the business base in the City of Ava, the travel portion may be simpler than for distant regional appointments. Access is still never assumed: the aircraft owner must identify the permitted work area and arrange any gate, ramp, hangar, or aircraft access before arrival.",
    scope: "An Ava-area request is a practical fit for routine exterior washing, focused bug or belly work, interior cleaning, or recurring appearance maintenance when the aircraft condition and facility permission support the work.",
    schedule: "Even for a nearby appointment, at least 24 hours of notice is preferred so the work can be coordinated around weather, other commitments, and facility access.",
    services: ["aircraft-washing", "monthly-aircraft-maintenance"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["closest", "base"]
  },
  "mansfield-municipal-airport-aircraft-washing": {
    focus: "Mansfield is a comparatively close regional trip from Ava, but a smaller-airport setting does not establish informal access or automatic permission. The quote should identify whether the aircraft is on a ramp or in a hangar and who will meet the mobile crew when access requires coordination.",
    scope: "For light routine contamination, owners may ask whether a waterless service fits. Broader grime may instead call for a wet process only if the proposed area and any runoff requirements are approved by the facility.",
    schedule: "Scheduling can be more efficient when permission, aircraft positioning, and the requested method are settled before a travel time is reserved.",
    services: ["aircraft-washing", "wet-aircraft-washing"], resources: ["waterless-vs-wet-aircraft-washing"], faqs: ["small", "water"]
  },
  "willow-springs-memorial-airport-aircraft-washing": {
    focus: "A Willow Springs appointment extends east from the Ava service base into south-central Missouri. Owners should use the quote conversation to confirm the aircraft’s exact location, whether an approved exterior work area is available, and whether facility notification is needed.",
    scope: "Bug accumulation and lower-surface residue can change the request beyond a routine wash, so photographs of leading edges and the accessible belly area are especially helpful before travel is scheduled.",
    schedule: "Weather and travel timing should be considered together; a preferred date is useful, but availability is confirmed only after access and work-area questions are resolved.",
    services: ["aircraft-bug-removal", "aircraft-belly-cleaning"], resources: ["how-bugs-and-exhaust-residue-affect-aircraft-surfaces"], faqs: ["photos", "travel"]
  },
  "mountain-view-airport-aircraft-washing": {
    focus: "Mountain View sits within the south-central Missouri group, farther east than the closest Ava-area locations. A useful request explains where the aircraft will be positioned, what the owner has confirmed with the facility, and whether water use is permitted for the proposed appointment.",
    scope: "Owners can compare waterless and wet exterior approaches rather than choosing only by airport location. Visible contamination, finish restrictions, and facility rules determine which option may be appropriate.",
    schedule: "Coordinating the wash method before departure helps avoid arriving with a requested process that the work area cannot support.",
    services: ["aircraft-washing", "wet-aircraft-washing"], resources: ["waterless-vs-wet-aircraft-washing"], faqs: ["method", "permission"]
  },
  "west-plains-regional-airport-aircraft-washing": {
    focus: "West Plains is one of the farther south-central Missouri appointments in this initial list. Travel time, weather, the amount of work, and reliable access coordination all matter when deciding whether a requested date can be accepted.",
    scope: "A combined exterior and interior request may make a longer-distance appointment more useful, provided the cabin is prepared and the facility permits the exterior portion in the proposed area.",
    schedule: "Earlier notice is helpful for West Plains planning because the appointment must fit travel and existing commitments; the preferred 24-hour minimum is not a guarantee of availability.",
    services: ["aircraft-washing", "aircraft-interior-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["combine", "distance"]
  },
  "springfield-branson-national-airport-aircraft-washing": {
    focus: "At Springfield-Branson National Airport, a request must identify an approved general-aviation, private ramp, hangar, or other facility area where the work may lawfully occur. Ozark Aircraft Wash does not claim access to airline, terminal, secure, or restricted areas and cannot arrange authorization on the customer’s behalf.",
    scope: "Exterior and interior appearance care may be discussed only after the aircraft location, responsible facility contact, access plan, and washing permission are understood. Airport size does not make every area available for mobile cleaning.",
    schedule: "Advance coordination is particularly important here; facility approval and access should be settled before travel and service time are reserved.",
    services: ["aircraft-washing", "aircraft-interior-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["commercial", "secure"]
  },
  "springfield-downtown-airport-aircraft-washing": {
    focus: "The FAA currently records the facility as Downtown Airport, associated with Springfield. This page uses that current registered wording while the route retains the familiar Springfield description. A customer still needs to identify the exact ramp, hangar, or approved work area rather than assume city-area availability means on-field permission.",
    scope: "Routine exterior washing, interior cleaning, and focused residue work can be discussed for an individually approved appointment. Method choice depends on condition and facility rules, not the Downtown name.",
    schedule: "Springfield-area travel can be coordinated with other commitments, but the aircraft and access plan must be specific enough to support a firm appointment.",
    services: ["aircraft-washing", "aircraft-bug-removal"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["name", "access"]
  },
  "jerry-sumners-aurora-municipal-airport-aircraft-washing": {
    focus: "Aurora is west of Ava within the broader Southwest Missouri service region. The full verified airport name helps avoid confusion, but it does not imply that Ozark Aircraft Wash is an airport tenant or has standing ramp privileges.",
    scope: "Owners planning routine upkeep may compare a one-time exterior service with recurring appearance maintenance. The appropriate choice follows aircraft condition, travel efficiency, and permission for the work area.",
    schedule: "A confirmed meeting point and aircraft-access plan are useful before western regional travel is placed on the schedule.",
    services: ["aircraft-washing", "monthly-aircraft-maintenance"], resources: ["how-often-should-an-aircraft-be-washed"], faqs: ["tenant", "monthly"]
  },
  "bolivar-municipal-airport-aircraft-washing": {
    focus: "Bolivar is north of the Ava base and may require a longer travel block than closer south-central Missouri appointments. Owners should provide enough condition detail to avoid treating a distant request as a generic wash without a defined scope.",
    scope: "Exterior washing may be paired with belly cleaning when lower-surface residue is part of the request. Belly work is condition based and remains appearance cleaning rather than maintenance or diagnosis.",
    schedule: "Travel and weather can affect northern appointments, so preferred timing should include reasonable flexibility after facility permission is confirmed.",
    services: ["aircraft-washing", "aircraft-belly-cleaning"], resources: ["aircraft-belly-cleaning-guide"], faqs: ["belly", "north"]
  },
  "floyd-w-jones-lebanon-airport-aircraft-washing": {
    focus: "The City of Lebanon currently uses Floyd W. Jones Lebanon Regional Airport, while FAA records shorten the registered name to Floyd W Jones Lebanon. The page uses the city-facing name and verified LBO/KLBO identifiers without publishing operational airport details.",
    scope: "Lebanon-area requests can combine exterior and cabin appearance care when access, cabin preparation, and the approved work area are coordinated. A longer combined scope should be described before a travel date is accepted.",
    schedule: "Lebanon is a longer regional trip from Ava, so distance, existing commitments, and expected service time are considered together.",
    services: ["aircraft-washing", "aircraft-interior-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["regional-name", "cabin"]
  },
  "monett-regional-airport-aircraft-washing": {
    focus: "Current City of Monett and FAA sources use Monett Regional Airport, replacing older Municipal wording. The corrected name supports accurate appointment communication without suggesting an airport partnership or permanent service presence.",
    scope: "Bug removal and exterior washing are logical topics for an aircraft arriving with visible leading-edge contamination, while older or heavier residue may change the method and quoted time.",
    schedule: "Monett travel is scheduled individually from Ava, with access readiness and condition details reviewed before the appointment is confirmed.",
    services: ["aircraft-washing", "aircraft-bug-removal"], resources: ["how-bugs-and-exhaust-residue-affect-aircraft-surfaces"], faqs: ["old-name", "bugs"]
  },
  "m-graham-clark-downtown-airport-aircraft-washing": {
    focus: "M. Graham Clark Downtown Airport is one of three approved Branson-region airport pages, so this page focuses on coordinating the specific PLK/KPLK location rather than repeating broad Branson city information. The owner must identify the permitted ramp, hangar, or facility area for the aircraft.",
    scope: "Waterless washing may be worth discussing for suitable light contamination, while wet washing remains conditional on facility permission and runoff requirements.",
    schedule: "Branson-area demand and travel must fit existing commitments; early notice helps, but access approval remains the customer’s responsibility.",
    services: ["aircraft-washing", "wet-aircraft-washing"], resources: ["waterless-vs-wet-aircraft-washing"], faqs: ["plk", "wet"]
  },
  "branson-airport-aircraft-washing": {
    focus: "Branson Airport requires especially clear code and access wording: BBG is the FAA identifier, KBBG is ICAO, and BKG is the passenger-facing IATA code. Service is considered only for an approved area arranged by the customer; no airline, terminal, secure, or restricted-area access is claimed.",
    scope: "A quote can cover exterior or interior appearance care after the aircraft location and authorized work area are confirmed. The airport’s commercial role does not mean mobile washing is permitted throughout the property.",
    schedule: "Facility coordination should be completed before travel is scheduled, and longer-distance or larger-scope work remains subject to availability.",
    services: ["aircraft-washing", "aircraft-interior-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["codes", "approved-area"]
  },
  "branson-west-municipal-airport-aircraft-washing": {
    focus: "Current FAA and Missouri sources retain Emerson Field in the official Branson West Municipal Airport name. Using FWB/KFWB distinguishes this location from the other Branson-area airports, but access and washing permission still must be confirmed for the actual aircraft location.",
    scope: "Owners may discuss routine exterior care, temporary spray protection, or recurring maintenance when surface condition and the facility’s permitted work area support those services.",
    schedule: "Branson West travel is coordinated individually; confirm aircraft positioning and access before selecting a date.",
    services: ["aircraft-washing", "monthly-aircraft-maintenance"], resources: ["what-spray-ceramic-protection-does-for-aircraft"], faqs: ["emerson", "spray"]
  },
  "joplin-regional-airport-aircraft-washing": {
    focus: "Joplin is the westernmost Missouri location in the initial airport group and represents a substantial trip from Ava. At this commercial-service facility, the customer must arrange an approved general-aviation, private ramp, hangar, or other suitable area; terminal, airline, secure, and restricted access are not implied.",
    scope: "A clearly defined combination of exterior, belly, bug, or cabin work helps determine whether the travel and expected service time can be scheduled efficiently. Current aircraft category and condition details are especially useful before committing to this longer western trip.",
    schedule: "More advance coordination than the preferred minimum may be practical for Joplin because travel, weather, approved-area access, and existing commitments must align.",
    services: ["aircraft-washing", "aircraft-belly-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["western", "commercial"]
  },
  "boone-county-airport-harrison-aircraft-washing": {
    focus: "FAA records use Boone County Airport, while the airport’s public website uses Boone County Regional Airport. This Harrison page keeps the FAA-registered name and HRO/KHRO identifiers while recording that branding difference for future review.",
    scope: "A northern Arkansas request may combine exterior and interior work when the aircraft condition, cabin preparation, and approved work area are known in advance. The quote should separate requested cabin tasks from exterior work so travel and service time can be evaluated together.",
    schedule: "Cross-state travel from Ava is considered individually and may require more lead time than a nearby Missouri appointment.",
    services: ["aircraft-washing", "aircraft-interior-cleaning"], resources: ["how-to-prepare-an-aircraft-for-mobile-washing"], faqs: ["regional-brand", "arkansas"]
  },
  "baxter-county-airport-mountain-home-aircraft-washing": {
    focus: "Baxter County Airport serves the Mountain Home association used in the approved route, while the airport itself is outside the city center. The page uses the airport’s current self-published name and BPK/KBPK identifiers without copying airport directions or operational material.",
    scope: "For a longer northern Arkansas appointment, owners should describe whether the request is routine exterior care, heavier wet-wash work, interior cleaning, or a combination so travel and service time can be evaluated together.",
    schedule: "Because this is a longer cross-state trip, flexible dates and completed access coordination improve the chance of finding a workable appointment.",
    services: ["aircraft-washing", "wet-aircraft-washing"], resources: ["waterless-vs-wet-aircraft-washing"], faqs: ["mountain-home", "long-trip"]
  },
  "marion-county-regional-airport-flippin-aircraft-washing": {
    focus: "Arkansas aviation sources confirm Marion County Regional Airport at Flippin with FLP/KFLP. This is a cross-state service request from Ava, so the proposed work area and reliable owner-arranged access should be settled before travel is committed.",
    scope: "Owners can discuss exterior washing with focused bug or belly work when photographs show the relevant condition. The quote remains limited to appearance care and does not interpret mechanical causes.",
    schedule: "Travel, weather, access, and the amount of work are evaluated together for a Flippin-area appointment rather than promising service on every requested date.",
    services: ["aircraft-bug-removal", "aircraft-belly-cleaning"], resources: ["how-bugs-and-exhaust-residue-affect-aircraft-surfaces"], faqs: ["flippin", "residue"]
  }
};

const serviceNames = {
  "aircraft-washing": ["Aircraft washing", "/services/aircraft-washing/"],
  "wet-aircraft-washing": ["Wet aircraft washing", "/services/wet-aircraft-washing/"],
  "aircraft-belly-cleaning": ["Aircraft belly cleaning", "/services/aircraft-belly-cleaning/"],
  "aircraft-bug-removal": ["Aircraft bug removal", "/services/aircraft-bug-removal/"],
  "aircraft-interior-cleaning": ["Aircraft interior cleaning", "/services/aircraft-interior-cleaning/"],
  "monthly-aircraft-maintenance": ["Monthly appearance maintenance", "/services/monthly-aircraft-maintenance/"]
};
const resourceNames = {
  "how-to-prepare-an-aircraft-for-mobile-washing": ["Prepare an aircraft for mobile washing", "/resources/how-to-prepare-an-aircraft-for-mobile-washing/"],
  "waterless-vs-wet-aircraft-washing": ["Compare waterless and wet washing", "/resources/waterless-vs-wet-aircraft-washing/"],
  "how-bugs-and-exhaust-residue-affect-aircraft-surfaces": ["Understand bugs and exhaust residue", "/resources/how-bugs-and-exhaust-residue-affect-aircraft-surfaces/"],
  "how-often-should-an-aircraft-be-washed": ["Plan wash frequency by condition", "/resources/how-often-should-an-aircraft-be-washed/"],
  "aircraft-belly-cleaning-guide": ["Review the belly-cleaning guide", "/resources/aircraft-belly-cleaning-guide/"],
  "what-spray-ceramic-protection-does-for-aircraft": ["Understand temporary spray protection", "/resources/what-spray-ceramic-protection-does-for-aircraft/"]
};

function identifiers(a) {
  const items = [`FAA ${a.faaIdentifier}`];
  if (a.icaoIdentifier) items.push(`ICAO ${a.icaoIdentifier}`);
  if (a.iataIdentifier && a.iataIdentifier !== a.faaIdentifier) items.push(`IATA ${a.iataIdentifier}`);
  return items;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-inner"><div><p><strong>Ozark Aircraft Wash</strong></p><p>Professional mobile aircraft detailing based in Ava and serving Southwest Missouri by appointment.</p><p><a data-conversion="phone" href="tel:+14179890976">Call 417-989-0976</a><br><a data-conversion="text" href="sms:+14179890976">Text 417-989-0976</a></p></div><nav aria-label="Service links"><h3>Explore</h3><ul class="footer-links"><li><a href="/services/">Services</a></li><li><a href="/aircraft/">Aircraft</a></li><li><a href="/airports/">Locations</a></li><li><a href="/resources/">Resources</a></li><li><a href="/#pricing-section">Pricing</a></li><li><a href="/#gallery">Gallery</a></li></ul></nav><nav aria-label="Business links"><h3>Work with us</h3><ul class="footer-links"><li><a data-conversion="quote-cta" href="/#quote">Request a quote</a></li><li><a data-conversion="partnership-cta" href="/aviation-partners/">Aviation partners</a></li></ul></nav></div></footer><nav class="mobile-actions" aria-label="Quick contact"><a data-conversion="phone" href="tel:+14179890976">Call</a><a data-conversion="text" href="sms:+14179890976">Text</a><a data-conversion="quote-cta" href="/#quote">Get Quote</a></nav><script src="/assets/js/site.js" defer></script>`;
}
function header() {
  return `<a class="skip-link" href="#main-content">Skip to main content</a><header class="site-header"><nav class="navbar" aria-label="Primary navigation"><a class="brand" href="/"><img src="/images/ozark-aircraft-wash-logo-480.webp" srcset="/images/ozark-aircraft-wash-logo-480.webp 480w" sizes="44px" width="44" height="44" alt=""><span class="brand-copy">Ozark Aircraft Wash<small>Mobile Aircraft Detailing</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span aria-hidden="true">Menu</span></button><ul class="nav-links" id="primary-menu"><li><a href="/services/">Services</a></li><li><a href="/aircraft/">Aircraft</a></li><li><a href="/airports/" aria-current="page">Locations</a></li><li><a href="/resources/">Resources</a></li><li><a class="nav-contact" data-conversion="phone" href="tel:+14179890976">Call</a></li><li><a class="nav-contact" data-conversion="text" href="sms:+14179890976">Text</a></li><li><a class="nav-quote" data-conversion="quote-cta" href="/#quote">Get a Quote</a></li></ul></nav></header>`;
}
function serviceLinks(profile, airport) {
  return profile.services.map(key => { const [name, href] = serviceNames[key]; return `<article><h3><a href="${href}">${name}</a></h3><p>Explore ${name.toLowerCase()} for a cleaner, more presentable aircraft in ${airport.city}.</p></article>`; }).join("");
}
function resourceLinks(profile, airport) {
  return profile.resources.map(key => { const [name, href] = resourceNames[key]; return `<article><h3><a href="${href}">${name}</a></h3><p>Use this owner guide while preparing the aircraft, work area, and quote request for ${airport.name}.</p></article>`; }).join("");
}
function faqItems(a, p, variant) {
  const special = {
    closest: ["Does a nearby Ava appointment remove travel or access requirements?", "No. Proximity may simplify travel, but availability, permission, aircraft access, and the approved work area must still be confirmed."],
    base: [`Is Ozark Aircraft Wash based at ${a.name}?`, "No. The business is based in the City of Ava and is not based at or affiliated with any airport."],
    small: ["Does a smaller municipal airport automatically allow washing?", "No. Airport size does not establish permission. The customer confirms facility rules and an appropriate work area."],
    water: ["Does Ozark Aircraft Wash bring water?", "Yes. The mobile service brings aircraft-cleaning products, equipment, and water; facility permission and runoff requirements still apply."],
    photos: ["What condition photos help with a quote?", "Images of general exterior condition, bugs, lower-surface residue, and any areas of concern help define appearance-care scope without requesting sensitive access information."],
    travel: ["Could a travel charge apply?", "Yes. Travel charges may apply based on location and scheduling, and the amount is considered individually."],
    method: ["Is wet or waterless washing selected by airport?", "No. Visible condition, surfaces, restrictions, owner preference, and facility rules guide method selection."],
    permission: ["Who confirms that washing is permitted?", "The customer confirms permission with the airport, FBO, hangar operator, or facility and arranges the work area."],
    combine: ["Can exterior and interior work be combined?", "They may be requested together when condition, cabin preparation, access, travel, and scheduling support the combined scope."],
    distance: ["Is every requested West Plains date available?", "No. Travel, weather, access, and existing commitments determine appointment availability."],
    commercial: ["Does Ozark Aircraft Wash have unrestricted airport access?", "No. Only an approved area arranged by the customer may be considered; secure, airline, terminal, and restricted areas are not implied."],
    secure: ["Should gate or security codes be sent through the website?", "No. Do not send sensitive access information. Coordinate necessary access directly through the responsible facility and meet the crew when required."],
    name: ["Why does this page say Downtown Airport?", "That is the current FAA registered name for identifier 3DW; Springfield is included to clarify the associated city."],
    access: ["Who arranges ramp or hangar access?", "The customer arranges aircraft and facility access and notifies the appropriate organization when required."],
    tenant: ["Is Ozark Aircraft Wash an airport tenant?", "No. It is a mobile business based in Ava and is not represented as based at or affiliated with this airport."],
    monthly: ["Can recurring appearance care be discussed?", "Yes, when the aircraft, condition, travel schedule, and permitted work area fit the current monthly service."],
    belly: ["Is belly cleaning automatically part of a wash?", "No. It is condition-based related work and should be included in the quote request when needed."],
    north: ["How is Bolivar travel handled?", "Distance and scheduling are considered individually; no fixed mileage fee or guaranteed date is published."],
    "regional-name": ["Why does the website include Regional in the airport name?", "The City of Lebanon currently uses that public-facing name, while FAA records shorten it to Floyd W Jones Lebanon."],
    cabin: ["What should be prepared for interior cleaning?", "Secure personal items, identify special materials or restrictions, and arrange authorized cabin access."],
    "old-name": ["Is this Monett Municipal Airport?", "Current City of Monett and FAA sources use Monett Regional Airport, so that is the wording used here."],
    bugs: ["Can focused bug removal be requested?", "Yes, subject to surface suitability, condition, access, and the broader service recommendation."],
    plk: ["Which identifiers should be used for this Branson-area airport?", "The verified FAA identifier is PLK and the ICAO identifier is KPLK."],
    wet: ["Is wet washing automatically allowed?", "No. The customer must confirm water use, runoff requirements, access, and the approved work area."],
    codes: ["Why are BBG and BKG both shown?", "BBG is the FAA identifier, KBBG is ICAO, and BKG is the passenger-facing IATA code. They are labeled separately to prevent confusion."],
    "approved-area": ["Can service occur anywhere on Branson Airport property?", "No. Service can be considered only in an approved area with customer-arranged access and facility permission."],
    emerson: ["Is Emerson Field still part of the name?", "Yes. Current FAA and Missouri sources retain Emerson Field with Branson West Municipal Airport."],
    spray: ["Is spray ceramic a full professional coating?", "No. It is a temporary protective finish. Full professional ceramic coating is not currently offered."],
    western: ["Why may Joplin require more notice?", "It is the westernmost Missouri location in this list, so travel, approved access, weather, and service time must align."],
    "regional-brand": ["Why does the airport website say Boone County Regional?", "The airport uses that public branding, while the current FAA record lists Boone County. This page uses the FAA-registered name."],
    arkansas: ["Are northern Arkansas appointments guaranteed?", "No. They are considered individually based on travel, scheduling, weather, access, and facility permission."],
    "mountain-home": ["Why does the route mention Mountain Home?", "Mountain Home is the associated city used by official aviation sources; the page does not publish airport directions or an Ozark Aircraft Wash address."],
    "long-trip": ["Could additional lead time help?", "Yes. Flexible timing is useful for longer cross-state travel, although no response or availability guarantee is made."],
    flippin: ["Which airport identifiers should be provided?", "Use FAA identifier FLP or ICAO identifier KFLP with the airport name and Flippin association."],
    residue: ["Does cleaning residue diagnose a mechanical issue?", "No. Ozark Aircraft Wash provides appearance cleaning, not inspection, diagnosis, maintenance, or airworthiness conclusions."]
  };
  const quoteQuestions = [
    "What details should be included in a quote request?",
    "Which aircraft and access details help with a quote?",
    "What should an owner provide before requesting a quote?",
    "What information helps define the requested work?",
    "Which appointment details are useful for quoting?",
    "What should be ready before calling or texting for a quote?"
  ];
  const standard = [
    [`Does Ozark Aircraft Wash service ${a.name}?`, `Service may be available by appointment when travel, weather, scheduling, aircraft access, facility permission, and an appropriate work area align.`],
    [quoteQuestions[variant], `Provide ${a.name}, the aircraft category and condition, requested service, ramp or hangar location, access status, preferred date, and relevant surface or facility restrictions.`]
  ];
  return [...p.faqs.map(key => special[key]), ...standard].map(([q, answer]) => `<details><summary>${q}</summary><p>${answer}</p></details>`).join("");
}
for (const airport of airports) {
  const directory = path.join(root, "airports", airport.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), airportPage(airport));
}
fs.mkdirSync(path.join(root, "airports"), { recursive: true });
fs.writeFileSync(path.join(root, "airports", "index.html"), airportHub());
console.log(`Generated ${airports.length} verified airport pages plus the Airport Service Area hub.`);
