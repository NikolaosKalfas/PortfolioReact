import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env`,
});

const SITE_URL = "https://nikolaoskalfas.com";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio React`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
        spaceId: process.env.CONTENTFUL_SPACEID,
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
          return {
            url: path,
          };
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-next-seo",
  ],
};

export default config;
