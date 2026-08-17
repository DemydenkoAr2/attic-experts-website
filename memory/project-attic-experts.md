---
name: project-attic-experts
description: Full overview of the Attic Experts website — structure, pages, CSS variables, conventions, known issues
metadata:
  type: project
---

## Project
Vanilla HTML/CSS/JS website for "Attic Experts" — attic insulation company in Bay Area, CA.
**Path:** `/Users/artemdemidenko/Desktop/attic-experts-website/`

**Why:** Client-ready marketing site, no framework/bundler — pure files.
**How to apply:** Always edit files directly. No build step needed.

---

## File Structure
```
index.html          — Main page
about.html          — About Us
contact.html        — Contact + form
services.html       — All services overview (hero blocks)
spray-foam.html     — Spray Foam Insulation service page
blown-in.html       — Blown-In Insulation service page
insulation-removal.html
rodent-proofing.html
attic-cleaning.html
crawl-space.html
css/
  fonts.css         — @font-face: Inter, Inter Tight (variable fonts from /fonts/)
  reset.css         — Modern CSS reset (grid trick, prefers-reduced-motion, etc.)
  style.css         — All styles (~1200+ lines)
js/
  main.js           — FAQ accordion, testimonial slider, text reveal, contact form
fonts/
  Inter/            — Inter-VariableFont_opsz,wght.woff2
  Inter_Tight/      — InterTight-VariableFont_wght.woff2
img/
  LogoS.png
  leader.jpg        — placeholder used everywhere
Reviews.md          — 123 real Yelp reviews (used for testimonials)
Service Pages.md    — Copy for all service pages
```

---

## CSS Variables (`:root` in style.css)
```css
--white: #ffffff
--soft-green: #e9ece2
--green: #088161          /* primary brand green */
--green-hovered: #054d3a
--primary-green: #49ad6f  /* lighter green, used for cards/accents */
--dark-green: #1d3421
--yellow: #deff85
--yellow-hovered: #eefd62
--black: #181818
--grey: #636363
--bg: #f2f2f2             /* section backgrounds */
--forest: #065c46         /* dark green for cards */
--lime: #e4f63c           /* lime yellow for cards */
```

---

## CSS Architecture
- **Fonts:** `Inter, sans-serif` and `"Inter Tight", sans-serif`
- **Container:** `.container` → `max-width: 1440px; margin-inline: auto`
- **Background on sections** (not containers) — important: background always goes on `.section-*`, never `.container-*` (learned from CTA bug)
- **Buttons:** `.btn` base + `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.btn-link`
- **Service page layout reused:** `.section-sf-hero`, `.container-sf-hero`, `.sf-hero__content`, `.sf-hero__img`, `.section-sf-what`, `.section-sf-when`, `.section-sf-how`

---

## JS (main.js)
1. **Text reveal** — `.js-text-reveal` splits text into chars, reveals on scroll via IntersectionObserver (12ms per char)
2. **FAQ accordion** — grid-template-rows animation, sequential open/close transitions
3. **Testimonial slider** — 8 cards, 2 per view, 4 slides, dots + arrows
4. **Contact form** — `novalidate` + `.submitted` class + `:invalid` CSS for red borders

---

## Navigation (all pages)
- Home → `index.html`
- About us → `about.html`
- Services → `services.html`
- Contact us → `contact.html`
- Active state: `.nav-header__link--active` (black + 2px green bottom border)
- Hover: `::after` border slides left→right

---

## Footer (all pages)
4 columns: Navigation | Services | More (FAQ↗, Service Areas↗) | Contact
Bottom: logo + email subscribe form
`©2026 Attic Experts. All rights reserved.`

Service links in footer:
- Insulation → blown-in.html
- Spray Foam → spray-foam.html
- Insulation Removal → insulation-removal.html
- Rodent Proofing → rodent-proofing.html
- Radiant Barrier → # (page not created yet)
- Crawl Space → crawl-space.html
- Attic Cleaning → attic-cleaning.html

---

## Key Sections on index.html
1. Header (sticky)
2. Hero (section-subheader) — soft-green bg left, photo right
3. About section — text reveal animation on `<span class="js-text-reveal">`
4. Services section (section-service) — dark green bg, 4 service cards 2×2 grid
5. FAQ section — accordion with animated open/close
6. Testimonials — slider 2 cards/view, real Yelp reviews
7. CTA (section-main__sub) — yellow bg, full width
8. Footer — primary-green bg

---

## Known Issues / TODO
- `<title>Document</title>` on index.html — needs real title
- No meta descriptions on any page
- No schema.org markup
- Radiant Barrier has no page yet
- All images use `leader.jpg` placeholder — real photos needed
- FAQ ↗ and Service Areas ↗ in footer still link to `#`

---

## Conventions Established
- CSS variables always lowercase kebab-case (--primary-green not --PrimaryGreen)
- `font-style: normal` and `font-weight: 400` are NOT written (browser defaults)
- Background always on `.section-*` element, never `.container-*`
- SVG arrows use `stroke="currentColor"` (not hardcoded hex)
- Logo text: `<span>Attic Experts</span>` (not h1/h2)
- Service pages all share same template structure (sf-hero → sf-what → sf-when → sf-how → faq → cta)
