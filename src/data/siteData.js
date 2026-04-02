export const businessInfo = {
  name: "JusLawns",
  slogan: "Let us do your dirty work.",
  contactName: "Amirah Roney",
  phone: "267-855-7550",
  email: "info@juslawns.com",
  serviceArea: "Philadelphia, PA and surrounding neighborhoods",
  hours: "Mon–Sat: 8:00 AM – 6:00 PM",
  sundayHours: "Sunday: By appointment only",
  primaryCTA: "Get a Free Quote",
  secondaryCTA: "Book Lawn Service",
};

export const aboutCopy = {
  paragraphs: [
    "JusLawns provides reliable lawn care services designed to make property maintenance simple and stress-free for homeowners.",
    "We focus on consistency, detail, and professional results so your yard always looks clean and well maintained.",
    "Our goal is dependable service, clear communication, and strong curb appeal results every visit.",
  ],
  values: [
    { icon: "🔁", title: "Consistency", body: "Same crew, same schedule, same quality — every single visit." },
    { icon: "🔍", title: "Attention to Detail", body: "Edges trimmed, beds clean, nothing overlooked." },
    { icon: "💬", title: "Clear Communication", body: "Know when we're coming, what we're doing, and what it costs." },
    { icon: "📍", title: "Local & Trusted", body: "Proudly serving Philadelphia neighborhoods with care." },
  ],
};

export const services = [
  {
    icon: "🌿",
    title: "Lawn Mowing",
    description: "Clean, precise cuts every visit. Includes mow, edge, trim, and blow cleanup so your property always looks sharp.",
    price: "From $40/visit",
  },
  {
    icon: "✂️",
    title: "Edging & Trimming",
    description: "Crisp, defined borders along sidewalks, driveways, and beds. The detail work that separates good from great.",
    price: "Included with mowing",
  },
  {
    icon: "🌳",
    title: "Hedge Trimming",
    description: "Neatly shaped hedges and shrubs that enhance your property's curb appeal year-round.",
    price: "From $50",
  },
  {
    icon: "🍂",
    title: "Mulching",
    description: "Fresh mulch installation to protect plant beds, lock in moisture, and give your landscaping a polished finish.",
    price: "From $140",
  },
  {
    icon: "🍁",
    title: "Seasonal Cleanup",
    description: "Spring and fall cleanups that clear debris, leaves, and overgrowth to start or end the season right.",
    price: "From $150",
  },
  {
    icon: "🏠",
    title: "Gutter Cleaning",
    description: "Clear clogged gutters before they become a bigger problem. Protect your home from water damage.",
    price: "From $100",
  },
  {
    icon: "💦",
    title: "Power Washing",
    description: "Blast away grime, mildew, and stains from walkways, driveways, patios, and more.",
    price: "From $150",
  },
  {
    icon: "🗑️",
    title: "Trash Bin Sanitation",
    description: "Full rinse, deodorizing, and bacteria removal for your bins. A clean home starts at the curb.",
    price: "From $25/bin",
  },
];

export const recurringPricing = [
  { label: "Small Rowhome (<2,000 sq ft)", price: "$40 weekly / $55 biweekly" },
  { label: "Standard City Yard (2,000–4,000 sq ft)", price: "$50 weekly / $70 biweekly" },
  { label: "Medium Yard (4,000–8,000 sq ft)", price: "$60 weekly / $85 biweekly" },
  { label: "Large Yard (8,000–12,000 sq ft)", price: "$75 weekly / $95 biweekly" },
  { label: "Extra-Large Yard", price: "Custom Quote" },
];

export const oneTimePricing = [
  { label: "One-Time Lawn Cut", price: "$65–$140" },
  { label: "Overgrown Lawn Recovery", price: "$95–$180" },
  { label: "Hedge Trimming", price: "$50–$140" },
  { label: "Leaf Cleanup", price: "$150–$400" },
  { label: "Flower Bed Cleanup", price: "$75–$200" },
  { label: "Mulch Installation", price: "$140–$450" },
  { label: "Gutter Cleaning", price: "$100–$200" },
  { label: "Walkway/Driveway Pressure Washing", price: "$150–$375" },
];

export const binPricing = [
  { label: "1 Bin", price: "$25" },
  { label: "2 Bins", price: "$45" },
  { label: "3 Bins", price: "$60" },
  { label: "Add-On with Mowing Visit", price: "$20 per bin" },
  { label: "Monthly Plan (2 bins)", price: "$40/month" },
];

export const plans = [
  {
    name: "Basic Plan",
    price: "$160",
    priceSuffix: "–$200/mo",
    featured: false,
    features: [
      "Weekly lawn mowing",
      "Edge & trim included",
      "Blow cleanup after each visit",
      "Free estimates",
    ],
  },
  {
    name: "Standard Plan",
    price: "$220",
    priceSuffix: "–$260/mo",
    featured: true,
    badge: "Most Popular",
    features: [
      "Weekly mowing",
      "Edging on every visit",
      "Weed control",
      "Blow cleanup",
      "Priority scheduling",
    ],
  },
  {
    name: "Premium Plan",
    price: "$300",
    priceSuffix: "–$400/mo",
    featured: false,
    features: [
      "Weekly mowing & edging",
      "Hedge trimming",
      "Seasonal cleanup",
      "Weed control",
      "Priority scheduling",
    ],
  },
];

export const serviceAreaCenter = [40.042, -75.108];

export const serviceNeighborhoods = [
  { name: "Mayfair", lat: 40.0376, lng: -75.0478 },
  { name: "Tacony", lat: 40.0284, lng: -75.0421 },
  { name: "Lawncrest", lat: 40.0463, lng: -75.0918 },
  { name: "Castor Gardens", lat: 40.0339, lng: -75.0843 },
  { name: "Juniata", lat: 40.0155, lng: -75.1012 },
  { name: "Holmesburg", lat: 40.0439, lng: -75.0125 },
  { name: "Rhawnhurst", lat: 40.0621, lng: -75.0613 },
  { name: "Bustleton", lat: 40.0716, lng: -75.0507 },
  { name: "Somerton", lat: 40.1182, lng: -75.0181 },
  { name: "West Oak Lane", lat: 40.0696, lng: -75.1558 },
  { name: "East Oak Lane", lat: 40.0654, lng: -75.1448 },
  { name: "Mt. Airy", lat: 40.0605, lng: -75.1891 },
  { name: "Fox Chase", lat: 40.0788, lng: -75.0824 },
  { name: "Torresdale", lat: 40.0475, lng: -74.9962 },
  { name: "Frankford", lat: 40.0218, lng: -75.0674 },
  { name: "Feltonville", lat: 40.0298, lng: -75.1267 },
  { name: "Olney", lat: 40.0377, lng: -75.1219 },
  { name: "Logan", lat: 40.0378, lng: -75.1365 },
  { name: "Port Richmond", lat: 39.9815, lng: -75.0941 },
  { name: "Andorra", lat: 40.0771, lng: -75.2244 },
  { name: "Chestnut Hill", lat: 40.0782, lng: -75.2089 },
];

export const neighborhoods = serviceNeighborhoods.map((neighborhood) => neighborhood.name);

export const faqs = [
  {
    question: "Do you offer free estimates?",
    answer: "Yes. Estimates are always free with no obligation. Contact us by phone, email, or through the quote form and we'll get back to you promptly.",
  },
  {
    question: "Do I need to be home during service?",
    answer: "No. Service can be completed as long as we have yard access. You don't need to be present — we'll get the job done and you'll come home to a clean property.",
  },
  {
    question: "Do you offer recurring service plans?",
    answer: "Yes. We offer weekly and biweekly maintenance plans designed around your property size and needs. Monthly care plans are also available with bundled services.",
  },
  {
    question: "How can I pay?",
    answer: "Secure online payment options are available. You can pay conveniently through our online booking system from your phone or computer.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve Philadelphia and surrounding neighborhoods including Mayfair, Tacony, Lawncrest, Olney, Mt. Airy, Chestnut Hill, Bustleton, Fox Chase, and many more.",
  },
  {
    question: "How does the neighborhood discount work?",
    answer: "When 3 or more homes on the same block sign up for recurring weekly service, everyone saves. $5 off per property with 3 homes, $7 off with 5 homes, and custom rates for 8 or more.",
  },
];

export const whyUs = [
  { num: "01", title: "Always On Time", body: "We respect your time and your schedule. When we say we're coming, we show up — rain or shine, week after week." },
  { num: "02", title: "No Contract Required", body: "Flexible recurring plans with no long-term commitment needed. Stay because you love the results, not because you're locked in." },
  { num: "03", title: "You Don't Need to Be Home", body: "As long as we have yard access, we'll get the job done. No interruptions to your day, just a perfect lawn when you get back." },
  { num: "04", title: "Secure Online Booking & Payment", body: "Request quotes, book services, and pay securely online — all from your phone. Easy, modern, and built around your convenience." },
  { num: "05", title: "Neighborhood Savings", body: "The more neighbors that join, the more everyone saves. Our block discount rewards communities that trust us together." },
  { num: "06", title: "Free Estimates, Always", body: "No guessing, no surprises. Every quote is free and transparent so you know exactly what you're getting before we start." },
];

export const serviceDropdownOptions = [
  "Recurring Lawn Mowing",
  "One-Time Lawn Cut",
  "Hedge Trimming",
  "Mulching",
  "Seasonal Cleanup",
  "Gutter Cleaning",
  "Power Washing",
  "Trash Bin Sanitation",
  "Monthly Care Plan",
  "Other / Not Sure",
];

