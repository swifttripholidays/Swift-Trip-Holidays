# Swift Trip Holidays — React + Vite

This project uses React and Vite. Existing page content has been converted into page-level JSX components under `src/pages/`, while the original CSS, assets, animation libraries, and behavior scripts are retained to protect the site's established UI/UX.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Routes

- `/` and `/index.html`
- `/about.html`
- `/services.html`
- `/contact.html`
- `/countries.html`
- `/register.html`
- `/success-stories.html`
- `/terms.html`
- `/thankyou.html`
- `/links/allaccounts.html`

The source `migration-reference/` folder is retained as a reference snapshot only; React page components render the JSX versions in `src/pages/`.


## Christmas homepage campaign
The homepage now includes a playful snowy Christmas hero, animated CSS snow/garland, four festive experience cards, and a free-consultation offer CTA. Styling is isolated in `public/css/christmas.css`. All offer language is for a free consultation; no discount amount or expiry timer is fabricated.

## Services page styling and viewport hero
The Services page uses `src/pages/ServicesPage.jsx` and the dedicated stylesheet `public/css/services-page.css`. This stylesheet is linked in `index.html` after the legacy styles so the new card-grid classes receive their intended responsive styles. The homepage hero uses viewport-height overrides at the end of `public/css/christmas.css`.

The Services page includes a mobile-accessible navigation drawer, card-grid breakpoints, a branded CTA, and the existing site footer. CSS-only animations respect `prefers-reduced-motion`.


### Global Christmas decorations

A shared, pointer-events-free snowfall layer and animated Santa corner stickers are mounted by the React app on every route. The shared stylesheet is served from `public/css/sitewide-christmas-effects.css`. Snow is disabled when the visitor requests reduced motion.

### PostCSS build configuration

This project currently uses plain CSS and does not require Tailwind CSS. The Vite config declares an empty inline PostCSS plugin list so a parent-level `D:\postcss.config.mjs` cannot break the build by requiring `@tailwindcss/postcss`. A local `postcss.config.mjs` is included for other tooling.

If you intentionally add Tailwind CSS later, install its matching dependencies and update the project-local config rather than relying on a PostCSS config in a parent directory.
