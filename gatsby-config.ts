import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env`,
});

const SITE_URL = "https://nikoswebvision.com";

// Vercel sets VERCEL_ENV to "production" | "preview" | "development" on every build.
// Preview/UAT deploys and local builds must not report analytics or be crawlable.
const IS_PRODUCTION_DEPLOY = process.env.VERCEL_ENV === "production";

// Gatsby's DefinePlugin only inlines GATSBY_*-prefixed vars into the browser and SSR
// bundles, so re-export the flag under a prefixed name for gatsby-ssr / gatsby-browser.
process.env.GATSBY_ANALYTICS_ENABLED = String(IS_PRODUCTION_DEPLOY);

// Fail loudly rather than silently shipping production without analytics.
if (IS_PRODUCTION_DEPLOY && !process.env.GATSBY_GA_ID) {
  console.warn(
    "[analytics] Production deploy but GATSBY_GA_ID is not set — GA4 will NOT be injected."
  );
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio React`,
    siteUrl: SITE_URL,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
        spaceId: process.env.CONTENTFUL_SPACEID,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: "gatsby-plugin-schema-snapshot",
      options: {
        path: "schema.gql",
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        resolveSiteUrl: () => SITE_URL,
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }`,
        resolvePages: ({ allSitePage }: any) => {
          // not necessary but keeping here for clarity and possible extension
          let allPages = allSitePage.nodes; // : Array<string>
          return allPages.map((page: any) => {
            return { ...page };
          });
        },
        serialize: ({ path }: any) => {
          // each page is serialized, formatted from the resolvePages function
          // trailing slashes are stripped to match the canonical (no trailing
          // slash) form enforced at the edge by vercel.json, so the sitemap
          // never lists a URL that redirects
          return {
            url: path === "/" ? path : path.replace(/\/$/, ""),
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: '', // leave empty if you want to disable the tracker - Left to avoid duplicate page_view events as we added the gtag in Helmet.
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: SITE_URL,
        sitemap: `${SITE_URL}/sitemap-index.xml`,
        // NB: the plugin's own `env` option keys off NODE_ENV, which is "production" on
        // preview deploys too — so the branch has to be on VERCEL_ENV instead.
        policy: IS_PRODUCTION_DEPLOY
          ? [{ userAgent: '*', allow: '/' }]
          : [{ userAgent: '*', disallow: '/' }]
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-next-seo",
    "gatsby-plugin-react-helmet"
  ],
};

export default config;
