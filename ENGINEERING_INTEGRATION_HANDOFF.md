# Engineering Integration Handoff

## Summary

The About page is ready for integration as a standalone route or embedded page section.

## Stack

- React 18
- Vite 6
- Tailwind utilities + scoped custom styles

## Integration Safety

- Page-scoped styling under `.argo-about-page`
- Content is centralized in `src/app/data/about.ts`
- Section components are isolated in `src/app/components/about/`

## Main Files

- `src/app/components/about/AboutPage.tsx`
- `src/app/components/about/AboutHero.tsx`
- `src/app/components/about/AboutStats.tsx`
- `src/app/components/about/AboutFeatures.tsx`
- `src/app/components/about/AboutValues.tsx`
- `src/app/components/about/AboutTimeline.tsx`
- `src/app/components/about/AboutMarquee.tsx`
- `src/app/components/about/AboutFooter.tsx`
- `src/app/data/about.ts`
- `src/styles/theme.css`

## Integration Checklist

1. Mount `<AboutPage />` in the target route/layout.
2. Keep `src/styles/index.css` imported once at app entry.
3. Verify host app does not override `.argo-about-page` typography and spacing.
4. Validate CTA download links in production environment.
5. Validate autoplay policy behavior for hero video on target browsers.

## Validation Command

```bash
npm run build
```

Expected result: successful production build with output in `dist/`.
