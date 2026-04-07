# JusLawns — Website

Revenue-first website for **JusLawns**, built with React + Vite for GitHub Pages. The site includes a **multi-page funnel** with online booking, smart quote routing, and a calendar-based scheduling system.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Plain CSS with CSS variables |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Routing | `react-router-dom` with `HashRouter` for GitHub Pages compatibility |
| Maps | `leaflet` + `react-leaflet` with OpenStreetMap tiles |
| Calendar | `react-calendar` for date selection in booking flow |
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

### Run inside Cursor / VS Code (Dev Container)

If your machine doesn’t have Node installed—or you want a consistent environment—use the included Dev Container:

1. Install Docker Desktop and the **Dev Containers** extension in Cursor/VS Code.
2. Command Palette → **Dev Containers: Reopen in Container** (open the `JusLawns` folder first).
3. After the container builds and `npm install` finishes, in the integrated terminal run:
   ```bash
   npm run dev
   ```
4. Open the forwarded URL (port **5173**), e.g. `http://localhost:5173/#/`.

The repo includes [`.nvmrc`](.nvmrc) (Node 22) if you use **nvm** / **fnm** on the host instead.

## Current Site Structure

The app is no longer a single landing page. It now uses route-based pages:

- `/` — Home
- `/services-pricing` — Redirects to `/book` (services, pricing badges, and booking in one flow)
- `/book` — Read-only service catalog (all services with price badges), then the booking wizard (4 steps). No payment on the site; data posts to Google Apps Script (Sheet + Calendar).
- `/service-area` — Service area map and neighborhood coverage
- `/contact-quote` — Contact and quote capture
- `/terms` — Terms & Conditions
- `/privacy` — Privacy Policy

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

- `App.jsx` owns the global modal state (supports pre-selected service for smart routing)
- `Navbar` and `Footer` are global and render on every route
- Page-level composition happens inside `src/pages/`
- Content stays centralized in `src/data/siteData.js`
- The service-area page uses a real Leaflet map with approximate neighborhood-center pins

## Booking backend (Google Apps Script)

Bookings are submitted from [`src/pages/BookService.jsx`](src/pages/BookService.jsx) to a deployed **Google Apps Script** web app (`APPS_SCRIPT_URL`). The script is **not** stored in this repository.

After a booking row is appended successfully, add client confirmation email in the script’s `doPost` handler using `GmailApp.sendEmail()` (see the sample in your internal `cursor-prompt.md` or deployment notes). Requirements:

- Run the script as a Google account that can send as **info@juslawns.com** (Gmail “Send mail as” alias or primary inbox).
- First-time runs will prompt for Gmail authorization.

No frontend change is required for email; the payload already includes `email`, `firstName`, `service`, and `date`.

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

## Future Features (TODO)

Search for `TODO:` comments in the codebase. Planned features include:

| Feature | Status | Notes |
|---------|--------|-------|
| Payment processor (Square/Stripe) | Not on website | Payment arranged with customer offline (cash, card, etc.) |
| Google Calendar integration | Scaffolded | Event format defined in BookService.jsx |
| Slot persistence backend | Scaffolded | Local state only; needs Firebase/Supabase |
| Email confirmations | Apps Script | Add `GmailApp.sendEmail` in deployed script after row append |
| Zip-code-to-day routing | Planned | Restrict booking days by customer zip |
| Returning customer re-booking | Planned | May require account system in v2 |
| NFC tap-to-review bands | Planned | Separate integration, not part of website |
| Mobile upsell technician flow | Planned | Tablet/mobile on-site payment view |
| Terms & Conditions content | Live | `src/pages/Terms.jsx` |
| Privacy Policy content | Live | `src/pages/Privacy.jsx` |

## Placeholder Items To Replace

Search for `REPLACE:` comments in the codebase. Current live placeholders include:

| What | Where | Notes |
|------|-------|-------|
| Hero background photo | `src/components/Hero.jsx` | Replace the Unsplash image with a real lawn photo |
| About photo | `src/components/About.jsx` | Add a team or property photo |
| Social profile links | `src/components/Footer.jsx` | Replace `#` hrefs |

## Design Tokens

Global design tokens live in `src/index.css` under `:root`:

- Colors: `--green-dark`, `--green-mid`, `--green-accent`, `--green-bright`, `--cream`, `--gold`, `--gold-light`, `--charcoal`
- Typography: `--font-display`, `--font-body`
- Layout: `--nav-height`, `--radius`, `--radius-lg`
- Effects: `--shadow`, `--shadow-lg`
