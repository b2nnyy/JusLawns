# Data Documentation — `siteData.js`

All business copy and structured content live in `siteData.js`. The current site relies on this file for pricing, services, FAQs, and the service-area map data.

## Core Exports

### `businessInfo`
Primary business details used across the site.

Used by:
- `Navbar.jsx`
- `Hero.jsx`
- `CTA.jsx`
- `Contact.jsx`
- `Footer.jsx`
- `QuoteModal.jsx`

### `aboutCopy`
Client-approved about copy plus supporting value props.

Schema:

```js
{
  paragraphs: string[],
  values: [{ icon, title, body }]
}
```

Used by:
- `About.jsx`

### `services`
8 service cards shown on Home and Services/Pricing.

Schema:

```js
{ icon, title, description, price }
```

Used by:
- `Services.jsx`

### `recurringPricing`
### `oneTimePricing`
### `binPricing`
Row-based pricing data for the tabbed pricing table.

Schema:

```js
{ label, price }
```

Used by:
- `Pricing.jsx`

### `plans`
Monthly plan card data.

Schema:

```js
{
  name,
  price,
  priceSuffix,
  featured,
  badge?,
  features: string[]
}
```

Used by:
- `Pricing.jsx`

## Service-Area Map Data

### `serviceAreaCenter`
Map center point used by Leaflet.

Schema:

```js
[lat, lng]
```

Used by:
- `ServiceArea.jsx`

### `serviceNeighborhoods`
Structured neighborhood data used for map pins.

Schema:

```js
{
  name: "Mayfair",
  lat: 40.0376,
  lng: -75.0478
}
```

Important:
- These are **approximate neighborhood-center coordinates**
- They are not customer addresses
- They are intended for service-area visualization only

Used by:
- `ServiceArea.jsx`

### `neighborhoods`
Derived string-only list generated from `serviceNeighborhoods`.

Current implementation:

```js
export const neighborhoods = serviceNeighborhoods.map((neighborhood) => neighborhood.name);
```

Used by:
- `ServiceArea.jsx` text list
- Any copy/UI that only needs names, not coordinates

## Supporting Content

### `faqs`
Accordion content for objection-handling and buyer reassurance.

Schema:

```js
{ question, answer }
```

Used by:
- `FAQ.jsx`

### `whyUs`
Differentiator cards used on the Services/Pricing page.

Schema:

```js
{ num, title, body }
```

Used by:
- `WhyUs.jsx`

### `serviceDropdownOptions`
Dropdown choices used by both quote forms.

Used by:
- `Contact.jsx`
- `QuoteModal.jsx`

## Removed Data

The testimonial data export was removed when the testimonials section was removed from the live funnel.

## How To Update Content

1. Open `src/data/siteData.js`
2. Edit the relevant export
3. Save and verify the route where that content appears

Common updates:

- Change a service price: edit `recurringPricing`, `oneTimePricing`, `binPricing`, or `plans`
- Add a new service card: append to `services`
- Add a new FAQ: append to `faqs`
- Update about copy: edit `aboutCopy.paragraphs`
- Add or move a neighborhood pin: edit `serviceNeighborhoods`
