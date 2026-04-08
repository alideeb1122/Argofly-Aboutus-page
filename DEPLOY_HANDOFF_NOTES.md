# Deploy Handoff Notes (About Page)

## Scope Included
- About page visual refresh with brand color alignment (`#0474c4`).
- Hero / Who We Are / Features / Values / Timeline / CTA styling updates.
- New CTA block with two download buttons.
- Local image assets added for About sections.

## Key Integration Notes
1. CTA download links are currently set to:
   - `/downloads/company-profile.pdf`
   - `/downloads/user-guide.pdf`
2. Ensure both files exist on the target server/CDN at those exact paths.
3. If paths differ in production, update them in:
   - `src/app/data/about.ts` (`cta.primaryHref`, `cta.secondaryHref`).
4. CTA background image is externally loaded from Pexels in:
   - `src/app/components/about/AboutCTA.tsx` (`SUPPORT_IMAGE`).
   - If production CSP blocks external image domains, switch this to a local image under `src/assets`.

## New Local Assets Added
- `src/assets/hero-plane.jpg`
- `src/assets/why-argo-plane.jpg`
- `src/assets/who-we-are-paper-plane.jpg`

## Files Changed (Functional)
- `src/styles/theme.css`
- `src/app/data/about.ts`
- `src/app/components/about/AboutHero.tsx`
- `src/app/components/about/AboutWhoWeAre.tsx`
- `src/app/components/about/AboutFeatures.tsx`
- `src/app/components/about/AboutValues.tsx`
- `src/app/components/about/AboutMarquee.tsx`
- `src/app/components/about/AboutTimeline.tsx`
- `src/app/components/about/AboutFooter.tsx`
- `src/app/components/about/AboutPage.tsx`
- `src/app/components/about/AboutCTA.tsx`

## Verification
- Last local verification: `npm run build` completed successfully.
