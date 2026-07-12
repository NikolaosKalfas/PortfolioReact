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
- Requires a `.env` file with `CONTENTFUL_ACCESSTOKEN`, `CONTENTFUL_SPACEID`, `CONTENTFUL_HOST`.

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
- Favicons and Google Analytics tag are duplicated inline in each template's `<Helmet>` block (masterTemplate, articleTemplate) rather than shared — if editing one, check whether the other needs the same change.

### Components

- `src/components/*` are presentational, each taking a Contentful-shaped `data` prop (see `componentsHelper.tsx` for the exact shape passed to each).
- Rich text fields (Contentful `raw` JSON) are rendered via `@contentful/rich-text-react-renderer`-style `raw` field — check individual components for how `text.raw` / `headerCopy.raw` is parsed.
- Tailwind content globs are limited to `src/pages`, `src/components/**`, `src/templates/**` (see `tailwind.config.js`) — new component directories are automatically covered by these globs.

### Styling

- Tailwind config defines brand-specific colors (`primary-color`, `secondary-color`, etc.) and a few custom font sizes/spacing values — prefer these tokens over ad hoc values for consistency with the rest of the site.
