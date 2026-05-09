# Delivery Guide

This guide is the final handoff reference.

## 1) Install and Run

```bash
npm install
npm run dev
```

## 2) Build for Production

```bash
npm run build
```

Output must be generated in `dist/`.

## 3) What to Edit for Content Only

Edit `src/app/data/about.ts`:

- hero text
- stats
- footer locations and phone numbers
- CTA links

No component edits are needed for normal content updates.

## 4) Deployment Inputs

- Build command: `npm run build`
- Publish directory: `dist`

If using Netlify, `netlify.toml` is already configured.

## 5) Mandatory QA Before Sign-off

1. Hero video loads and plays without layout shift.
2. Stats cards are aligned and readable on desktop/mobile.
3. Footer columns are balanced and phone numbers align on one row.
4. CTA downloads open correct files.
5. No horizontal overflow at common breakpoints (360, 768, 1024, 1440).

## 6) Known Integration Notes

- Hero video file: `src/assets/banner(1)22.mp4`
- Footer/address content source: `src/app/data/about.ts`
- Fonts are loaded from Google Fonts.

## 7) Final Handoff Package

Share these files with engineering:

- `README.md`
- `DELIVERY_GUIDE.md`
- `DEPLOY_HANDOFF_NOTES.md`
- `ENGINEERING_INTEGRATION_HANDOFF.md`
