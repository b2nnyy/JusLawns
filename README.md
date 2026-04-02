# JusLawns — Website

Revenue-first static website for **JusLawns**, built with React + Vite for GitHub Pages. The current build is a **hybrid 4-page funnel** designed to get visitors to pricing, service coverage, and quote actions faster than the original long-scroll homepage.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Plain CSS with CSS variables |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Routing | `react-router-dom` with `HashRouter` for GitHub Pages compatibility |
| Maps | `leaflet` + `react-leaflet` with OpenStreetMap tiles |
| Forms | Formspree-ready forms with mailto fallback |
| Icons | `react-icons` |
| Hosting | GitHub Pages |

## Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Current Site Structure

The app is no longer a single landing page. It now uses route-based pages:

- `/` — Home
- `/services-pricing` — Services and pricing details
- `/service-area` — Service area map and neighborhood coverage
- `/contact-quote` — Contact and quote capture

Because the site deploys to GitHub Pages, routing uses `HashRouter` so deep links work without server rewrites.

## Conversion Strategy

The site was restructured to reduce friction and move buying information closer to the top:

- Home page now leads with **Hero → Pricing → Services → TrustStrip → CTA**
- The old **Gallery** and **Testimonials** sections were removed from the live funnel
- Navigation now uses page buttons instead of long-scroll anchor links
- Pricing and quote actions are surfaced earlier and more often

## Project Structure

```
├── public/images/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── TrustStrip.jsx
│   │   ├── Services.jsx
│   │   ├── Pricing.jsx
│   │   ├── About.jsx
│   │   ├── WhyUs.jsx
│   │   ├── ServiceArea.jsx
│   │   ├── Referral.jsx
│   │   ├── FAQ.jsx
│   │   ├── CTA.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── QuoteModal.jsx
│   │   ├── PageIntro.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ServicesPricing.jsx
│   │   ├── ServiceAreaPage.jsx
│   │   └── ContactQuote.jsx
│   ├── data/
│   │   └── siteData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Architecture Notes

- `App.jsx` owns the global `modalOpen` state for the quote modal
- `Navbar` and `Footer` are global and render on every route
- Page-level composition happens inside `src/pages/`
- Content stays centralized in `src/data/siteData.js`
- The service-area page uses a real Leaflet map with approximate neighborhood-center pins

## Service Area Map

The map uses OpenStreetMap tiles via Leaflet. Pin data lives in `src/data/siteData.js` as structured objects with:

```js
{ name, lat, lng }
```

These coordinates are **approximate neighborhood center points**, not customer property addresses.

## Deployment Notes

1. Keep the `base` in `vite.config.js` aligned with the repo name (`/JusLawns/`)
2. Run `npm run build`
3. Deploy `dist/` to GitHub Pages

If you later switch to a custom domain and a server that supports SPA rewrites, you can move from `HashRouter` to `BrowserRouter`.

## Placeholder Items To Replace

Search for `REPLACE:` comments in the codebase. Current live placeholders include:

| What | Where | Notes |
|------|-------|-------|
| Hero background photo | `src/components/Hero.jsx` | Replace the Unsplash image with a real lawn photo |
| About photo | `src/components/About.jsx` | Add a team or property photo |
| Formspree form ID | `src/components/Contact.jsx`, `src/components/QuoteModal.jsx` | Replace `YOUR_FORM_ID` |
| Social profile links | `src/components/Footer.jsx` | Replace `#` hrefs |
| Logo image | `src/components/Navbar.jsx`, `src/components/Footer.jsx` | Add logo asset if provided |

## Design Tokens

Global design tokens live in `src/index.css` under `:root`:

- Colors: `--green-dark`, `--green-mid`, `--green-accent`, `--green-bright`, `--cream`, `--gold`, `--gold-light`, `--charcoal`
- Typography: `--font-display`, `--font-body`
- Layout: `--nav-height`, `--radius`, `--radius-lg`
- Effects: `--shadow`, `--shadow-lg`
