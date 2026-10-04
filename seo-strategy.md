# Mees AI — SEO & Content Strategy

Working doc for meesai.net metadata, keyword targets, structured data, and
content enhancements. Status: most of this is **already implemented** —
checkboxes mark what remains.

## 1. Core Metadata & Global Tags (`<head>`)

### Homepage (`index.html`) — implemented
- Title: `Mees AI — Independent Developer Tools`
- Meta description: privacy-first, local-first positioning
- OG/Twitter cards: `summary_large_image` + `og:image`
- Canonical: `https://meesai.net/`
- JSON-LD: `Organization` (github.com/saidevac + x.com/saidev40916204 in
  `sameAs`), `WebSite`, `ItemList` of all 5 SoftwareApplication entries

## 2. Product-Specific Keyword Targets

### A. SVGMotion (flagship, web)
- `AI SVG animation generator`, `interactive SVG studio`,
  `self-contained svg animation export`, `no-runtime svg animator`,
  `local first svg tool`, `animate SVG without Lottie or Rive`
- H1: product name + descriptor; FAQ section added targeting the
  Lottie/Rive-alternative long tail + `FAQPage` JSON-LD
- Compare pages live on the app domain: `/compare`, `/rive-alternative`,
  `/lottie-alternative`

### B. Payoff Turbo (Android)
- `Australian mortgage payoff calculator`, `extra repayment calculator
  Australia`, `offset account calculator app`, `home loan accelerator`

### C. Yieldy (Android)
- `dividend income tracker app Android`, `portfolio visualization tool`,
  `passive income planner offline`

### D. Read On (Android)
- `send web articles to Kindle app`, `EPUB to Kindle converter Android`,
  `distraction free reading app`, `save webpage to Kindle`

### E. Bitcoin keyHunt (web)
- `bitcoin key space explorer`, `wallet key search tool`

## 3. Structured Data — implemented

- `Organization` + `WebSite` + `ItemList` on homepage
- `SoftwareApplication` on all 4 product pages (Read On, Yieldy,
  Payoff Turbo, SVGMotion)
- `FAQPage` on `/svgmotion/` (5 Q&A)
- OG/Twitter meta on all 9 pages incl. press kits

## 4. Technical SEO Checklist

- [x] `sitemap.xml` — all pages incl. press kits, kept current
- [x] `robots.txt` — allows indexing, points at sitemap
- [x] Canonical tags on all index files
- [x] Alt text audit — all images/screenshots carry descriptive `alt`
- [x] Card preview images downsized to 640px + `loading="lazy"` (LCP)
- [x] Touch targets ≥44px (filter tabs, nav)
- [ ] Monitor LCP/CLS on hero + gallery embeds (lazy-mount already in place)
- [ ] Re-run Search Console coverage report after next deploy

## 5. Content / Backlink Levers

- Directory submissions: see `directory-submissions.md` in the svgmotion
  repo (per-app paste-ready fields + tracker)
- AlternativeTo: add SVGMotion as an alternative on Rive/Lottie/SVGator
  entries
- Awesome-list PRs: awesome-svg, awesome-animation, awesome-rive
- One dev.to tutorial embedding the 3 studio shorts
