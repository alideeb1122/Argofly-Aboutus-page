# Argo About Page

Production-ready About page built with React + Vite.

## Requirements

- Node.js 18+
- npm 9+

## Local Development

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Project Structure

- `src/app/components/about/`: About page sections
- `src/app/data/about.ts`: Main editable content (headings, stats, addresses, phone numbers)
- `src/styles/`: global and theme styles
- `src/assets/`: local media assets

## Content Updates

For text/content changes, edit only:

- `src/app/data/about.ts`

## Deployment

This project is static and can be deployed to any static host.

- Build command: `npm run build`
- Publish directory: `dist`

Netlify config is already included in `netlify.toml`.

## Delivery Docs

Use these files for handoff:

- `DELIVERY_GUIDE.md`
- `DEPLOY_HANDOFF_NOTES.md`
- `ENGINEERING_INTEGRATION_HANDOFF.md`
