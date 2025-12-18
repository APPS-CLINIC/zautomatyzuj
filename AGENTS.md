# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/[lang]/` hosts localized Astro routes (pl/en) and `api/contact.ts` for form submissions; `src/layouts` and `src/providers` supply shared shells and context (e.g., PostHog).
- React components live in `src/components/**` (PascalCase filenames grouped by feature such as `contact`, `sections`, `ui`); styles sit in `src/styles` where `brand.css` is generated.
- Localization config and dictionaries are under `src/i18n` with `config.ts` defining supported locales; legal content is in `src/legal-docs` and static assets in `public/` (distilled to `dist/` after builds).
- Utilities belong in `src/utils`, types in `src/types`, and maintenance scripts in `scripts/` (see `scripts/extract-palette.mjs` for regenerating brand colors from SVG logos).

## Build, Test, and Development Commands
- `npm install` to sync dependencies (Node 20+ recommended).
- `npm run dev` launches Astro dev server at `http://localhost:4321`.
- `npm run build` outputs the production bundle to `dist/`.
- `npm run preview` serves the built site locally for smoke checks.
- `npm run astro check` runs Astro/TypeScript diagnostics; add `npm run astro -- add <integration>` for scaffolding when needed.
- `node scripts/extract-palette.mjs` regenerates `src/styles/brand.css` and `src/i18n/locales/brand.json` after updating `public/logo*.svg`.

## Coding Style & Naming Conventions
- Use TypeScript + ESM; prefer 2-space indentation, trailing semicolons, and single quotes in TS/JS. Keep React components as small, typed functions returning JSX.
- Pages and layouts favor kebab-case filenames; React components use PascalCase. Co-locate feature assets within their folders (e.g., `src/components/contact/*`).
- Tailwind utilities coexist with custom CSS variables in `brand.css`; prefer design tokens over hard-coded colors. Keep localization keys in `src/i18n/locales` aligned across `pl` and `en`.

## Testing Guidelines
- No dedicated automated test suite yet; before pushing, run `npm run astro check` and `npm run build`, then manually verify both locales render correctly and navigation works without JavaScript (index redirects gracefully).
- For UI changes, validate animations (framer-motion) and PostHog development mode do not break when env vars are absent.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `refactor:`) as seen in history. Keep messages concise and scoped.
- PRs should describe intent, list major changes, link issues, and note any new env vars. Include before/after screenshots or short clips for visible UI updates and mention manual checks performed.
- Avoid committing `dist/`, `.env`, or analytics keys; prefer small, focused PRs with clear reviewer notes.

## Security & Configuration Tips
- Configure PostHog with `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST` (or `NEXT_PUBLIC_*` aliases) in a local `.env`; never commit secrets. Ensure fallback behavior remains when keys are missing.
- Keep dependencies current via `npm audit` awareness when upgrading; rerun palette and localization updates if brand assets or supported locales change.
