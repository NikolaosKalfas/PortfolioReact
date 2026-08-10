# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run develop` / `npm start` — start Gatsby dev server
- `npm run build` — production build
- `npm run serve` — serve the production build locally
- `npm run typecheck` — run `tsc --noEmit`
- `npm run clean` — clear Gatsby cache (`.cache`, `public`)
- `npm run cleanstart` — clean + develop, useful when Contentful schema/content types change and Gatsby's GraphQL schema needs to be rebuilt
- No test suite or lint script is configured.
- Requires a `.env` file with `CONTENTFUL_ACCESSTOKEN`, `CONTENTFUL_SPACEID`, `CONTENTFUL_HOST`, `GATSBY_GA_ID`, `GATSBY_RECAPTCHA_KEY`.
- Analytics are off in local builds by design (see below). To exercise them locally, build with `VERCEL_ENV=production npm run build && npm run serve`.

## Architecture

This is a Gatsby site where nearly all page content comes from Contentful, not from source files. Understanding the content pipeline is the key to working productively here.

### Content pipeline (gatsby-node.js)

- Contentful content types are extended/typed in `createSchemaCustomization` (e.g. `ContentfulArticle`, `ContentfulPage`, `ContentfulSecondaryHeader`).
- `createPages` queries Contentful via GraphQL and generates three kinds of pages:
  - Every `ContentfulPage` node → `src/templates/masterTemplate.tsx`, at its own slug.
  - Every `ContentfulArticle` node → `src/templates/articleTemplate.tsx`, at `/${type}/${slug}` (`type` is `"blogs"` or `"case-studies"`).
  - Paginated listing pages (10 per page) → `src/templates/blogsListingTemplate.tsx`, at `/blogs`, `/blogs/2`, ... and `/case-studies`, `/case-studies/2`, ...
- `schema.gql` is a checked-in Gatsby GraphQL schema snapshot (via `gatsby-plugin-schema-snapshot`). If a page/build fails with schema mismatches after a Contentful content model change, this file may need regenerating (`gatsby clean && gatsby develop`, or set `GATSBY_UPDATE_SCHEMA_SNAPSHOT`).

### Dynamic component rendering (masterTemplate + componentsHelper)

- `masterTemplate.tsx` queries a fixed, known set of possible page sections from Contentful (header, secondaryHeader, titleAndText, projectsGrid, freeConsultancyForm, skills, productCardsSlider, testimonialsCarousel, faQs, contactForm) and pushes whichever are present into an array.
- `src/helpers/componentsHelper.tsx` maps each Contentful `__typename` (e.g. `ContentfulHomepageHeader`, `ContentfulSecondaryHeader`) to the React component that renders it. This is the single place to register a new content-driven section — add the Contentful type to the GraphQL query in the relevant template, then add a `__typename` → component mapping here.
- `articleTemplate.tsx` follows a similar but separate pattern for article body blocks (`bodyBlocks`), switching on `__typename` inline rather than via `componentsHelper`.

### SEO / structured data

- `src/helpers/tools.tsx` → `generatePageSchemas(pageData, url)` builds JSON-LD schema.org objects (Article, CollectionPage, ProfessionalService/Service, FAQPage) based on heuristics over the page data shape (`publishedDate` present → article, `isListingPage` flag → collection, slug `home` → professional service, otherwise generic service). This is called from each template's exported `Head` component.
- Per-page SEO (title/description/OG/Twitter/noindex/nofollow) comes from the `seo` Contentful field and is rendered via `gatsby-plugin-next-seo`'s `GatsbySeo` in the default export of each template (not in `Head`).
- Favicons are duplicated inline in the `<Helmet>` block of all five page-rendering files (masterTemplate, articleTemplate, blogsListingTemplate, `src/pages/404.tsx`, `src/pages/sitemap.tsx`) rather than shared — if editing one, check whether the others need the same change.

### Analytics & environment gating

All analytics are gated on being a **production Vercel deploy**, so preview/UAT deploys and local builds never report:

- `gatsby-config.ts` derives `IS_PRODUCTION_DEPLOY` from Vercel's `VERCEL_ENV` (`production` | `preview` | `development`) and re-exports it as `process.env.GATSBY_ANALYTICS_ENABLED`. The `GATSBY_` prefix is required — Gatsby's webpack `DefinePlugin` only inlines prefixed vars into the browser and SSR bundles, so a bare `process.env.VERCEL_ENV` read from `gatsby-ssr.js` / `gatsby-browser.js` will not work.
- `gatsby-ssr.js` → `onRenderBody` is the single injection point for the GA4 `gtag.js` snippet (ID from `GATSBY_GA_ID`). Non-production builds emit no analytics markup at all. Do not re-add the snippet to templates.
- `gatsby-browser.js` → `onClientEntry` injects Vercel Analytics and Speed Insights once per session, behind the same flag.
- `gatsby-plugin-robots-txt` serves `Disallow: /` on non-production deploys so previews are not crawled and indexed. Note its built-in `env` option keys off `NODE_ENV`, which is `production` on previews too — that is why the branch is on `VERCEL_ENV`.
- `ContactForm.tsx` fires a custom `manual_event_SUBMIT_LEAD_FORM` event, guarded by `typeof window.gtag !== 'undefined'`, so it no-ops cleanly wherever GA is absent.
- This relies on Vercel's *Automatically expose System Environment Variables* project setting being enabled.

### Components

- `src/components/*` are presentational, each taking a Contentful-shaped `data` prop (see `componentsHelper.tsx` for the exact shape passed to each).
- Rich text fields (Contentful `raw` JSON) are rendered via `@contentful/rich-text-react-renderer`-style `raw` field — check individual components for how `text.raw` / `headerCopy.raw` is parsed.
- Tailwind content globs are limited to `src/pages`, `src/components/**`, `src/templates/**` (see `tailwind.config.js`) — new component directories are automatically covered by these globs.

### Styling

- Tailwind config defines brand-specific colors (`primary-color`, `secondary-color`, etc.) and a few custom font sizes/spacing values — prefer these tokens over ad hoc values for consistency with the rest of the site.
