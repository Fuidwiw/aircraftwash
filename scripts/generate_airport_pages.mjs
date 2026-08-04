import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const airports = JSON.parse(fs.readFileSync(path.join(root, "data", "airports.json"), "utf8"));
const canonicalHost = "https://ozarkaircraftwash.com";

if (airports.length !== 18) throw new Error(`Expected exactly 18 verified airports, found ${airports.length}`);
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
function nav(current = "") {
  const items = [["Home","/"],["Services","/services/"],["Aircraft","/aircraft/"],["Airports","/airports/"],["Resources","/resources/"],["Pricing","/#pricing-section"],["Gallery","/#gallery"],["Quote","/#quote"]];
  return items.map(([label, href]) => `<li><a href="${href}"${current === label ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
}
function footer(current = "") {
  return `<footer class="site-footer"><div class="footer-inner"><div><p><strong>Ozark Aircraft Wash</strong></p><p>Mobile aircraft washing based in Ava, Missouri.</p><p><a href="tel:+14179890976">417-989-0976</a></p></div><nav aria-label="Footer navigation"><ul class="footer-links">${nav(current)}</ul></nav></div></footer>`;
}
function header(current = "Airports") {
  return `<a class="skip-link" href="#main-content">Skip to main content</a><header class="site-header"><nav class="navbar" aria-label="Primary navigation"><a class="nav-logo" href="/">Ozark Aircraft Wash</a><ul class="nav-links">${nav(current)}</ul></nav></header>`;
}
function serviceLinks(profile, airport) {
  return profile.services.map(key => { const [name, href] = serviceNames[key]; return `<article><h3><a href="${href}">${name}</a></h3><p>Review ${name.toLowerCase()} scope, limitations, access, and quote factors for a ${airport.city} request.</p></article>`; }).join("");
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
function airportPage(a) {
  const p = profiles[a.slug];
  if (!p) throw new Error(`Missing unique profile for ${a.slug}`);
  const variant = airports.findIndex(airport => airport.slug === a.slug) % 6;
  const optionNotes = [
    "Other current services can be discussed after the aircraft condition and requested result are clear. Water use, surface limitations, access, and available appointment time determine which combination is practical.",
    "The quote may also consider another current wash, interior, residue-removal, temporary spray-protection, or recurring-care option. Nothing is added automatically; the aircraft and proposed work area guide the recommendation.",
    "A request is not limited to the two highlighted services. Other currently published appearance-care options may fit when condition, finish restrictions, facility rules, and scheduling support them.",
    "Owners may ask about combining current exterior, cabin, focused cleaning, temporary spray-protection, or monthly-care services. The final scope follows the aircraft condition, access plan, and requested outcome.",
    "Additional current appearance-care work can be considered as part of the same quote. Suitability depends on aircraft configuration, visible condition, disclosed restrictions, facility permission, and appointment length.",
    "The highlighted links are planning starting points, not a fixed package. Other current services may be quoted when the aircraft, location, access, surface guidance, and schedule make the work appropriate."
  ];
  const equipmentNotes = [
    "The mobile crew brings the aircraft-cleaning equipment, water supply, and RealClean Aviation Products selected for the requested appearance-care work.",
    "Ozark Aircraft Wash travels with its own water, aircraft-cleaning equipment, and RealClean Aviation Products selected for aircraft cleaning and appearance care.",
    "Customers are not asked to supply the normal wash equipment or water: Ozark Aircraft Wash arrives with both, along with selected RealClean Aviation Products.",
    "Equipment, a water supply, and RealClean Aviation Products selected for aircraft appearance care travel with the mobile service.",
    "For an accepted appointment, Ozark Aircraft Wash provides its own water supply, aircraft-cleaning equipment, and selected RealClean Aviation Products.",
    "The planned mobile setup includes Ozark Aircraft Wash's own water, aircraft-cleaning equipment, and RealClean Aviation Products selected for appearance care."
  ];
  const categoryIntroductions = [
    "The current pricing structure organizes guidance around",
    "Published pricing separates the supported categories into",
    "For quote planning, the five current aircraft categories are",
    "The website's current category guidance covers",
    "Current price and scope discussions use these five categories:",
    "Owners can begin category planning with"
  ];
  const categoryClosings = [
    "Final classification and pricing depend on aircraft type, size, configuration, condition, location, travel distance, access requirements, and requested work.",
    "The actual aircraft, configuration, condition, travel, access needs, and requested scope determine the final category and quote.",
    "Category examples are only a starting point; size, configuration, condition, location, travel distance, access, and work requested still affect the quote.",
    "A final quote uses the specific aircraft and requested work, including condition, configuration, travel, access, and location factors.",
    "The listed categories do not replace an aircraft-specific review of size, configuration, condition, travel, access requirements, and requested services.",
    "Aircraft type is considered together with configuration, condition, location, travel distance, access requirements, and desired work before pricing is confirmed."
  ];
  const quotePrompts = [
    "Call or text with the airport, aircraft category and condition, requested work, access status, and preferred timing.",
    "When calling or texting, identify the airport, aircraft category, visible condition, desired service, access plan, and preferred date.",
    "A useful call or text includes the airport, aircraft category, condition, requested scope, access arrangement, and scheduling preference.",
    "Provide the airport, aircraft category and condition, proposed work, confirmed access status, and preferred timing by call or text.",
    "To discuss an appointment, call or text with the airport, aircraft category, general condition, requested service, access plan, and date preference.",
    "Call or text after gathering the airport, aircraft category, condition, requested work, access details, and reasonable scheduling options."
  ];
  const idText = identifiers(a).join(" · ");
  const title = `${a.name} Aircraft Washing | Ozark Aircraft Wash`;
  const description = `Mobile aircraft washing planning for ${a.name} in ${a.city}, ${a.state}, subject to travel, access, facility permission, and scheduling.`;
  const canonical = `${canonicalHost}/airports/${a.slug}/`;
  const nearby = a.nearbyAirportSlugs.map(slug => { const n = airports.find(item => item.slug === slug); return `<article><h3><a href="/airports/${n.slug}/">${n.name}</a></h3><p>${n.city}, ${n.state} · ${identifiers(n).join(" · ")}</p></article>`; }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><meta property="og:site_name" content="Ozark Aircraft Wash"><meta property="og:title" content="${a.name} Aircraft Washing"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${canonicalHost}/images/og-aircraft.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${a.name} Aircraft Washing"><meta name="twitter:description" content="Mobile appearance-care appointment planning for ${a.name} in ${a.city}, ${a.state}."><meta name="twitter:image" content="${canonicalHost}/images/og-aircraft.jpg"><link rel="stylesheet" href="/assets/css/site.css"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${canonical}#service`,"name":`Mobile aircraft washing near ${a.name}`,"serviceType":"Mobile aircraft washing and appearance care subject to facility permission and access","url":canonical,"provider":{"@id":`${canonicalHost}/#organization`},"areaServed":{"@type":"City","name":`${a.city}, ${a.state}`},"description":description},{"@type":"WebPage","@id":`${canonical}#webpage`,"url":canonical,"name":title,"isPartOf":{"@id":`${canonicalHost}/#website`},"about":{"@id":`${canonical}#service`}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":`${canonicalHost}/`},{"@type":"ListItem","position":2,"name":"Airports","item":`${canonicalHost}/airports/`},{"@type":"ListItem","position":3,"name":a.name,"item":canonical}]}]})}</script></head><body>${header()}<main id="main-content" tabindex="-1"><div class="container page-intro airport-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/airports/">Airports</a></li><li aria-current="page">${a.name}</li></ol></nav><section class="airport-intro no-image card"><span class="eyebrow">Airport service area</span><div class="identifier-row">${identifiers(a).map(id => `<span class="identifier-badge">${id}</span>`).join("")}</div><h1>Aircraft Washing at ${a.name}</h1><p>${a.city}, ${a.state} · ${idText}</p><p>Ozark Aircraft Wash may provide mobile aircraft washing and appearance care here by appointment when airport, FBO, ramp, hangar, and facility rules permit. Customers arrange aircraft and facility access and confirm an appropriate work area. Travel charges may apply based on location and scheduling.</p><p><strong>Independent mobile service:</strong> Ozark Aircraft Wash is based in Ava, Missouri. It is not represented as being based at, affiliated with, endorsed by, or partnered with ${a.name} or any FBO.</p><div class="button-row"><a class="button" href="tel:+14179890976">Call 417-989-0976</a><a class="button secondary" href="sms:+14179890976">Text for a Quote</a></div></section><section class="card travel-notice"><h2>Planning a ${a.city} Appointment</h2><p>${p.focus}</p><p>${p.schedule}</p><p><strong>Travel context:</strong> ${a.travelTier}</p></section><section class="card"><h2>Appearance-Care Options to Discuss</h2><p>${p.scope}</p><div class="airport-service-grid">${serviceLinks(p, a)}</div><p>${optionNotes[variant]}</p></section><section class="content-split"><article class="card access-notice"><h2>Access and Work-Area Responsibility</h2><p>The customer may need to notify the airport, FBO, hangar operator, or facility; arrange gate, ramp, hangar, aircraft, or security access; meet Ozark Aircraft Wash at the aircraft; and arrange aircraft positioning through appropriately authorized people.</p><p>Do not send gate codes, security credentials, identity documents, or other sensitive access information through the website. Confirm access directly with the responsible facility.</p></article><article class="card"><h2>Products, Equipment, and Water</h2><p>${equipmentNotes[variant]}</p><p>Owners should disclose special coatings, finishes, materials, owner instructions, or manufacturer restrictions. No product or method is represented as universally suitable for every aircraft surface.</p></article></section><section class="card"><h2>Aircraft Categories Considered</h2><p>${categoryIntroductions[variant]} <a href="/aircraft/single-engine-aircraft-washing/">single-engine aircraft</a>, <a href="/aircraft/twin-piston-aircraft-washing/">twin-piston aircraft</a>, <a href="/aircraft/turboprop-aircraft-washing/">turboprops</a>, <a href="/aircraft/very-light-jet-aircraft-washing/">very light jets</a>, and <a href="/aircraft/light-jet-aircraft-washing/">light jets</a>. Listing a category does not mean every aircraft at this airport can be serviced.</p><p>${categoryClosings[variant]} <a href="/aircraft/">Explore all aircraft-category guidance</a> or <a href="/#pricing-section">review current pricing</a>.</p></section><section class="card quote-preparation"><h2>Prepare a Quote Request</h2><ul class="quote-preparation-list"><li>Airport name: ${a.name} (${a.faaIdentifier}${a.icaoIdentifier ? ` / ${a.icaoIdentifier}` : ""}).</li><li>Aircraft category, type, configuration, and general exterior or cabin condition.</li><li>Requested service and whether the aircraft is on a ramp or in a hangar.</li><li>Whether facility permission and aircraft access have been arranged.</li><li>Preferred appointment date and reasonable scheduling flexibility.</li><li>Special coatings, finishes, restrictions, or relevant facility requirements.</li></ul><p>At least 24 hours of advance notice is preferred. Availability may vary with travel, weather, access, and existing commitments. No same-day, emergency, after-hours, or fixed response-time promise is made.</p></section><section class="card related-resources"><h2>Related Planning Resources</h2><div class="related-grid">${resourceLinks(p, a)}</div><p><a href="/services/">Compare all current services</a> and <a href="/#quote">review general quote information</a>.</p></section><section class="card nearby-airports"><h2>Nearby Airport Service Areas</h2><div class="nearby-airport-grid">${nearby}</div><p><a href="/airports/">Return to the complete Airport Service Area</a>.</p></section><section class="card faq-section airport-faq"><h2>${a.name} Service Questions</h2>${faqItems(a,p,variant)}</section><aside class="airport-update-note" aria-label="Airport information update notice"><p><strong>Confirm current information:</strong> Airport names, identifiers, access requirements, and facility rules may change. Confirm current airport and facility requirements directly before scheduling service. This page is service information, not an aviation navigation or operational resource.</p><p class="source-note">Airport identity reviewed August 4, 2026. Verification sources are recorded in the project’s Phase 5 airport registry and report.</p></aside><section class="quote-callout"><div><h2>Discuss Service at ${a.name}</h2><p>${quotePrompts[variant]} Do not send sensitive access credentials.</p></div><div class="button-row"><a class="button" href="tel:+14179890976">Call 417-989-0976</a><a class="button secondary" href="sms:+14179890976">Text for a Quote</a></div></section></div></main>${footer("Airports")}</body></html>`;
}

function airportHub() {
  const groups = [...new Set(airports.map(a => a.regionGroup))];
  const cards = group => airports.filter(a => a.regionGroup === group).map(a => `<article class="airport-card"><div class="identifier-row">${identifiers(a).map(id => `<span class="identifier-badge">${id}</span>`).join("")}</div><h3><a href="/airports/${a.slug}/">${a.name}</a></h3><p>${a.city}, ${a.state}</p><p>${a.travelTier}</p></article>`).join("");
  const canonical = `${canonicalHost}/airports/`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Airport Aircraft Washing Service Area | Ozark Aircraft Wash</title><meta name="description" content="Explore 18 verified Missouri and northern Arkansas airport service areas for mobile aircraft washing, subject to access, travel, facility rules, and scheduling."><link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><meta property="og:site_name" content="Ozark Aircraft Wash"><meta property="og:title" content="Airport Aircraft Washing Service Area"><meta property="og:description" content="Mobile aircraft washing service planning for 18 verified airport areas from Ava, Missouri."><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${canonicalHost}/images/og-aircraft.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Airport Aircraft Washing Service Area"><meta name="twitter:description" content="Explore verified Missouri and northern Arkansas airport service areas."><meta name="twitter:image" content="${canonicalHost}/images/og-aircraft.jpg"><link rel="stylesheet" href="/assets/css/site.css"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","@id":`${canonical}#webpage`,"url":canonical,"name":"Airport Aircraft Washing Service Area","description":"Verified airport service-area information for mobile aircraft washing from Ava, Missouri.","isPartOf":{"@id":`${canonicalHost}/#website`},"publisher":{"@id":`${canonicalHost}/#organization`}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":`${canonicalHost}/`},{"@type":"ListItem","position":2,"name":"Airports","item":canonical}]}]})}</script></head><body>${header()}<main id="main-content" tabindex="-1"><div class="container page-intro"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Airports</li></ol></nav><section class="airport-intro card"><div><span class="eyebrow">Mobile service region</span><h1>Airport Aircraft Washing Service Area</h1><p>Ozark Aircraft Wash is a mobile aircraft washing and appearance-care business based in Ava, Missouri. It is not based at an airport. The initial service region includes 18 verified public-use airport areas in Missouri and northern Arkansas, with each appointment considered individually.</p><p>Service is available by appointment where airport, FBO, ramp, hangar, and facility rules permit. Customers arrange aircraft and facility access. Travel charges may apply based on location and scheduling.</p><div class="button-row"><a class="button" href="tel:+14179890976">Call 417-989-0976</a><a class="button secondary" href="sms:+14179890976">Text for a Quote</a></div></div><picture class="service-photo compact"><source type="image/avif" srcset="/images/yellow-black-aircraft-hangar-side-480.avif 480w, /images/yellow-black-aircraft-hangar-side-768.avif 768w, /images/yellow-black-aircraft-hangar-side-960.avif 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px"><source type="image/webp" srcset="/images/yellow-black-aircraft-hangar-side-480.webp 480w, /images/yellow-black-aircraft-hangar-side-768.webp 768w, /images/yellow-black-aircraft-hangar-side-960.webp 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px"><img src="/images/yellow-black-aircraft-hangar-side.jpg" srcset="/images/yellow-black-aircraft-hangar-side-480.jpg 480w, /images/yellow-black-aircraft-hangar-side-768.jpg 768w, /images/yellow-black-aircraft-hangar-side-960.jpg 960w" sizes="(max-width: 700px) calc(100vw - 84px), 420px" width="960" height="720" loading="lazy" decoding="async" alt="Yellow, black, white, and purple-trim aircraft shown from the side inside a hangar"></picture></section><section class="card access-notice"><h2>How Airport Appointments Work</h2><p>Choose the airport page for verified name and identifier context, then provide the aircraft category, condition, requested work, ramp or hangar status, preferred date, and whether access has been arranged. Ozark Aircraft Wash brings its own RealClean Aviation Products, equipment, and water supply.</p><p>Airport inclusion confirms owner willingness to consider an appointment—not guaranteed access, unrestricted availability, or an airport/FBO relationship. At least 24 hours of advance notice is preferred, and longer trips may require additional coordination.</p></section>${groups.map(group => `<section class="airport-group card"><h2>${group}</h2><div class="airport-grid">${cards(group)}</div></section>`).join("")}<section class="content-split"><article class="card"><h2>Services and Aircraft Categories</h2><p>Compare the <a href="/services/">current Services hub</a> and <a href="/aircraft/">five supported aircraft pricing categories</a>. Suitability depends on the actual aircraft, condition, configuration, facility permission, and requested work.</p></article><article class="card"><h2>Prepare Before Scheduling</h2><p>Use the <a href="/resources/how-to-prepare-an-aircraft-for-mobile-washing/">mobile-wash preparation guide</a>, <a href="/#pricing-section">review current pricing</a>, and <a href="/#gallery">view the approved gallery</a> before calling or texting.</p></article></section><aside class="airport-update-note" aria-label="Airport information update notice"><p><strong>Airport information changes:</strong> Names, identifiers, access requirements, and facility rules may change. Confirm current airport and facility requirements directly before scheduling. These marketing pages are not aviation navigation or operational resources.</p></aside><section class="quote-callout"><div><h2>Plan an Airport Appointment</h2><p>Call or text with the airport, aircraft category, condition, requested service, access status, and preferred date. Do not send gate codes or sensitive access information.</p></div><div class="button-row"><a class="button" href="tel:+14179890976">Call 417-989-0976</a><a class="button secondary" href="sms:+14179890976">Text for a Quote</a></div></section></div></main>${footer("Airports")}</body></html>`;
}

for (const airport of airports) {
  const directory = path.join(root, "airports", airport.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), airportPage(airport));
}
fs.mkdirSync(path.join(root, "airports"), { recursive: true });
fs.writeFileSync(path.join(root, "airports", "index.html"), airportHub());
console.log(`Generated ${airports.length} verified airport pages plus the Airport Service Area hub.`);
