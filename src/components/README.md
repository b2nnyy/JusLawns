# Components Documentation

This folder contains the reusable building blocks for the current **4-page hybrid funnel**. Most UI remains component-driven, while page assembly now happens in `src/pages/`.

## Current Route Layout

- `Home.jsx` → `Hero`, `Pricing`, `Services`, `TrustStrip`, `CTA`
- `ServicesPricing.jsx` → `PageIntro`, `Pricing`, `Services`, `WhyUs`, `FAQ`
- `ServiceAreaPage.jsx` → `PageIntro`, `ServiceArea`, `CTA`
- `ContactQuote.jsx` → `PageIntro`, `Contact`, `About`

`Navbar`, `Footer`, `QuoteModal`, and `ScrollToTop` are global and render around the routed pages in `App.jsx`.

## Props Pattern

- Receives `openModal`: `Navbar`, `Hero`, `Pricing`, `ServiceArea`, `CTA`, `Referral`, `PageIntro`
- Receives `isOpen` / `onClose`: `QuoteModal`
- No props: `TrustStrip`, `Services`, `About`, `WhyUs`, `FAQ`, `Contact`, `Footer`, `ScrollToTop`

## Core Components

### `Navbar.jsx`
- Global fixed navigation
- Uses `NavLink` route buttons instead of anchor scrolling
- Includes desktop quote CTA, phone CTA, and mobile menu
- Adds box shadow after scrolling

### `Footer.jsx`
- Global footer on every route
- Uses route links to the main pages
- Service links point visitors back to the Services/Pricing route

### `QuoteModal.jsx`
- Global quote form overlay
- Opened from buttons across the site
- Still Formspree-ready with mailto fallback

### `ScrollToTop.jsx`
- Resets scroll position on route changes
- Keeps page navigation feeling like a normal multi-page site

### `PageIntro.jsx`
- Shared header/banner for non-home pages
- Used to keep the page system visually consistent
- Supports a primary quote button and a secondary route button

## Section Components

### `Hero.jsx`
- Home-page hero section
- Primary top-of-funnel conversion area
- Current main CTA: “Get My Free Quote”

### `Pricing.jsx`
- High-priority conversion section
- Tabbed pricing for recurring, one-time, monthly plans, and trash bin sanitation
- Plan CTAs were updated to push quote intent faster

### `Services.jsx`
- 8-card service grid fed by `siteData.js`
- Used on Home and Services/Pricing pages

### `TrustStrip.jsx`
- Lightweight credibility strip
- Kept on Home as a short trust layer after the revenue sections

### `ServiceArea.jsx`
- Real Leaflet map plus text list of supported neighborhoods
- Uses approximate neighborhood-center coordinates from `siteData.js`
- Includes map pins and popups for each service neighborhood

### `Contact.jsx`
- Primary quote capture section
- Left column: business contact details
- Right column: quote form

### `About.jsx`
- Brand trust / company context section
- Moved off the Home page to reduce scroll length

### `WhyUs.jsx`
- Differentiator grid used on the Services/Pricing route

### `FAQ.jsx`
- Objection-handling accordion used on the Services/Pricing route

### `CTA.jsx`
- Reusable conversion section for quote/call prompts

### `Referral.jsx`
- Still exists in the codebase, but it is **not part of the live routed funnel**
- Safe to reuse later if referral growth becomes a priority again

## Removed From Live Funnel

These sections are no longer part of the production experience:

- `Gallery.jsx` was removed to shorten the scroll depth
- `Testimonials.jsx` was removed per the redesign direction

## Styling Approach

Each component keeps its own inline `<style>` block so structure and styles stay together. Shared tokens and utilities still live in `src/index.css`.

Most reused global classes:

- `.container`
- `.section-padding`
- `.section-label`
- `.btn`
- `.btn-gold`
- `.btn-outline`
- `.form-group`
- `.form-row`
