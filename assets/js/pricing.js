const pricingData = {
  single: {
    name: "Single Engine",
    examples: "Examples: Cessna 172, Piper Cherokee, Cirrus SR20/SR22, Beech Bonanza",
    waterless: "$225",
    wet: "$275",
    full: "$750",
    interior: "$250",
    sprayCeramic: "$350",
    maintenance: "$175/month",
    belly: "$75",
    wax: "$100",
    monthlyInterior: "$150"
  },
  twin: {
    name: "Twin Piston",
    examples: "Examples: Baron, Seneca, Twin Comanche, Cessna 310",
    waterless: "$350",
    wet: "$425",
    full: "$1,200",
    interior: "$400",
    sprayCeramic: "$550",
    maintenance: "$300/month",
    belly: "$125",
    wax: "$175",
    monthlyInterior: "$250"
  },
  turboprop: {
    name: "Turboprop",
    examples: "Examples: King Air, Pilatus PC-12, TBM, Piper Meridian",
    waterless: "$525",
    wet: "$650",
    full: "$2,000",
    interior: "$700",
    sprayCeramic: "$850",
    maintenance: "$500/month",
    belly: "$200",
    wax: "$300",
    monthlyInterior: "$400"
  },
  vlj: {
    name: "Very Light Jet",
    examples: "Examples: Citation Mustang, Phenom 100, HondaJet, Eclipse 500",
    waterless: "$700",
    wet: "$850",
    full: "$3,000",
    interior: "$1,000",
    sprayCeramic: "$1,250",
    maintenance: "$700/month",
    belly: "$300",
    wax: "$450",
    monthlyInterior: "$500"
  },
  lightjet: {
    name: "Light Jet",
    examples: "Examples: Citation CJ series, Lear 31/35, Phenom 300",
    waterless: "$1,000",
    wet: "$1,250",
    full: "$4,500",
    interior: "$1,500",
    sprayCeramic: "$1,800",
    maintenance: "$1,000/month",
    belly: "$450",
    wax: "$600",
    monthlyInterior: "$600"
  }
};

function priceRow(title, description, price) {
  return `
    <div class="price-row">
      <div>
        <div class="service">${title}</div>
        <div class="description">${description}</div>
      </div>
      <div class="price">${price}</div>
    </div>
  `;
}

function updatePrices(category) {
  const item = pricingData[category];
  if (!item) return;

  document.querySelector("#categoryInfo").innerHTML =
    `<strong>${item.name}</strong><br>${item.examples}`;

  document.querySelector("#pricing").innerHTML =
    priceRow(
      "Waterless Wash",
      "Low-water aircraft cleaning for light dust, bugs, regular maintenance, and hangared aircraft.",
      item.waterless
    ) +
    priceRow(
      "Wet Wash",
      "Gentle low-pressure DI water wash, aircraft-cleaning products, bug removal, windows cleaned, and hand dry.",
      item.wet
    ) +
    priceRow(
      "Full Exterior Detail",
      "Wet wash, bug removal, belly degrease, quick wax or sealant, windows, and brightwork touch-up.",
      item.full
    ) +
    priceRow(
      "Interior Cleaning",
      "Vacuum, leather/plastic wipe-down, cabin clean-up, and careful instrument-area cleaning.",
      item.interior
    );

  document.querySelector("#addons").innerHTML =
    priceRow(
      "Spray Ceramic Protection",
      "Approximately 3–6 months of protection depending on aircraft use, storage, and exposure.",
      item.sprayCeramic
    ) +
    priceRow(
      "Belly Degrease",
      "Oil, grease, and exhaust residue removal using careful aircraft-cleaning methods.",
      item.belly
    ) +
    priceRow(
      "Polishing / Brightwork",
      "Metal polishing and brightwork restoration. Quoted by condition.",
      "Quote Required"
    );

  document.querySelector("#maintenance").innerHTML =
    priceRow(
      "Monthly Maintenance",
      "Recurring exterior maintenance wash, bug removal, windows, and wipe-down.",
      item.maintenance
    ) +
    priceRow("Add Belly Degrease", "Monthly plan add-on.", item.belly) +
    priceRow("Add Spray Wax / Sealant", "Monthly plan add-on.", item.wax) +
    priceRow("Add Interior Clean", "Monthly plan add-on.", item.monthlyInterior);
}

const aircraftSelector = document.querySelector("#aircraft");
if (aircraftSelector) {
  aircraftSelector.addEventListener("change", (event) => {
    updatePrices(event.target.value);
  });
}
