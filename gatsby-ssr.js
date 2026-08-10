import React from "react";

// GATSBY_ANALYTICS_ENABLED is derived from VERCEL_ENV in gatsby-config.ts. Preview/UAT
// deploys and local builds get no analytics markup whatsoever, so their traffic never
// reaches GA4. Both vars are GATSBY_-prefixed so webpack inlines them into this bundle.
const ANALYTICS_ENABLED = process.env.GATSBY_ANALYTICS_ENABLED === "true";
const GA_MEASUREMENT_ID = process.env.GATSBY_GA_ID;

export const onRenderBody = ({ setHeadComponents }) => {
  if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) return;

  setHeadComponents([
    <script
      key="gtag-lib"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />,
    <script
      key="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
      }}
    />,
  ]);
};
