# About Page PRD / Handoff

## Project Context

- Project path: `D:\argo-main\argo-main`
- Page type: standalone `About Us` page prepared to be integrated later into a larger main website
- Main host site observed from production:
  - `Next.js`
  - Tailwind-like utility styling
  - Existing visual language uses soft blue gradients and clean enterprise aviation aesthetics

## Main Goal

Preserve the premium look and motion of the page while making it:

- safer to integrate into a larger site
- visually richer and less plain-white
- closer to aviation / B2B travel / airline-distribution branding
- consistent enough that future edits in a new chat do not drift stylistically

## Non-Negotiables

- Do not redesign the page from scratch unless explicitly requested
- Keep animations elegant, soft, and premium
- Avoid loud, game-like, or overly flashy motion
- Keep the page integration-safe
- Prefer aviation-relevant imagery and meaning-driven motion
- The user strongly prefers minimal random experimentation

## Integration Safety Work Already Done

These changes were made to reduce risk when the page is embedded into a larger site:

- Scoped the page theme and base rules under `.argo-about-page`
- Removed broad global influence on `html`, `body`, and generic typography outside the page wrapper
- Renamed injected CSS classes in hero/marquee to page-specific names
- Kept the page visually the same while isolating style bleed

Key files:

- `src/styles/theme.css`
- `src/app/components/about/AboutPage.tsx`
- `src/app/components/about/AboutHero.tsx`
- `src/app/components/about/AboutMarquee.tsx`

## Visual Direction Approved So Far

### Global Background

- A soft full-page atmospheric gradient was introduced to reduce the harsh plain-white feel
- The direction is:
  - subtle blue-tinted white
  - very light radial glows
  - gentle top-to-bottom journey rather than a flat single background
- This should remain soft and elegant, not patterned or noisy

Key file:

- `src/app/components/about/AboutPage.tsx`

### Footer

Footer direction currently aims for:

- richer aviation mood
- blue gradient background
- soft image integration
- better text contrast
- more premium finish than the original plain gradient

The user liked the direction after iterations, especially once the footer became lighter and more refined.

Key file:

- `src/app/components/about/AboutFooter.tsx`

### Timeline

Timeline cards were upgraded from flat white boxes to more premium cards:

- subtle aviation-related imagery per card
- hover lift and depth
- card-specific backgrounds instead of identical flat surfaces
- different images per milestone card

Important:

- The user wanted visible background treatment, not an almost-invisible texture
- The timeline should feel alive but still calm

Key file:

- `src/app/components/about/AboutTimeline.tsx`

### Airline Logos Marquee

This section changed significantly and the user liked the newer direction:

- keep marquee motion
- replace plain text-like airline marks with more realistic airline logos
- use real airline logo images when available
- keep fallback behavior if a logo fails
- present logos in consistent logo tiles

Current implementation:

- uses airline logos from Google Flights static assets where available
- keeps the same horizontal marquee behavior

Key file:

- `src/app/components/about/AboutMarquee.tsx`

### Feature Radar Motion

The left-side radar element in the features section now follows this rule:

- keep the original pulse-ring style
- add outer blip points
- those outer points should feel like they are being detected by the pulse
- do not use the fully rotating radar-sweep version; user rejected it as feeling pasted-on

Key file:

- `src/app/components/about/AboutFeatures.tsx`

## About Values Section: Important Current State

This is the most sensitive section and caused the most dissatisfaction.

### What the user wanted

- card imagery must clearly support the meaning of each card
- images must feel integrated, not glued on
- icons should be elegant and centered
- icon hover motion should come from the icon meaning:
  - `Mission`: purposeful directional/targeting behavior
  - `Vision`: eye tracking / intelligent gaze behavior
  - `Values`: elegant star motion, rotation/glow/orbit is acceptable

### Problems the user explicitly called out

- images were sometimes too faint, then later too broken/misaligned
- icons became too large at one point
- icon placement was not centered properly
- image treatment looked pasted together
- the whole section felt poor and inconsistent across iterations

### Latest technical fix applied

The section was repaired structurally so it no longer uses the broken image hack:

- image URLs are now plain direct URLs, not malformed CSS `url(...)` strings
- the broken `Vision` image URL was replaced after it was confirmed to return `404`
- card image is rendered as a real `<img>` in a top media area
- the floating icon badge was moved out of the clipped media layer and centered properly at the media/content boundary

Key file:

- `src/app/components/about/AboutValues.tsx`

### Design status of this section

Technical breakage was fixed, but aesthetically this section is still the weakest/high-risk area.

If continuing in a future chat, treat `AboutValues` as:

- stable enough to edit safely
- not yet fully trustworthy as final design

### Recommended next move for `AboutValues`

Do **not** keep micro-tweaking tiny details forever.

Instead, do one clean pass with these rules:

1. Keep a clean premium 3-card layout
2. Use a unified top media band of equal height in all 3 cards
3. Ensure all 3 images are valid, relevant, and visually balanced
4. Keep the icon badge centered at the media/content seam
5. Use smaller, more refined icons
6. Avoid any look that feels collage-like or pasted on

Recommended image meanings:

- `Mission`: network / route / connection / aviation infrastructure
- `Vision`: horizon / cockpit / control / strategic overview
- `Values`: handshake / trust / partnership / professional collaboration

Recommended icon behavior:

- `Mission`: directional arrow or route-path toward a target
- `Vision`: eye/pupil that subtly tracks pointer
- `Values`: elegant star rotation or orbital glint

## Files Most Heavily Involved

- `src/app/components/about/AboutPage.tsx`
- `src/app/components/about/AboutHero.tsx`
- `src/app/components/about/AboutFeatures.tsx`
- `src/app/components/about/AboutFooter.tsx`
- `src/app/components/about/AboutTimeline.tsx`
- `src/app/components/about/AboutMarquee.tsx`
- `src/app/components/about/AboutValues.tsx`
- `src/styles/theme.css`

## Workflow Expectations For Future Chat

If work continues in a new conversation:

- read this file first
- preserve current approved directions
- avoid re-opening already approved sections unless the user asks
- treat `AboutValues` as the main section that may still need one proper redesign pass
- avoid excessive experimentation without showing a coherent direction
- keep changes targeted and premium

## Current Build Status

At the end of the current work, the project was repeatedly verified with:

- `npm run build`

Build was passing after the latest edits.
