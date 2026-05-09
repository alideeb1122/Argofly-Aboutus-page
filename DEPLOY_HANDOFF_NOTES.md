# Deployment Handoff Notes

## Deployment Type

- Static site build
- Framework: React + Vite

## Build Settings

- Install: `npm install`
- Build: `npm run build`
- Publish folder: `dist`

## Required Runtime Assets

No server runtime is required.

## Required Static Files

Before go-live, confirm these files exist at the expected public paths:

- `/downloads/company-profile.pdf`
- `/downloads/user-guide.pdf`

If your hosting path differs, update:

- `src/app/data/about.ts`
- Keys: `cta.primaryHref`, `cta.secondaryHref`

## External Dependencies

- Google Fonts loaded from `fonts.googleapis.com`
- Airline logos in marquee loaded from `gstatic.com` with local SVG fallback in code

If your environment blocks external domains, either:

1. Allow these domains in CSP/network policy, or
2. Replace external resources with local assets.

## Post-Deploy Checks

1. Open About page and confirm hero video autoplay works on desktop/mobile.
2. Confirm footer contact block alignment and phone numbers.
3. Confirm CTA download buttons return 200 responses.
4. Confirm no horizontal scroll on desktop and mobile widths.
5. Confirm marquee logos render and gracefully fallback if blocked.
