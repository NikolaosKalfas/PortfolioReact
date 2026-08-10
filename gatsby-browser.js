import "./src/styles/global.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Gated on VERCEL_ENV via gatsby-config.ts, so preview/UAT deploys and local builds do not
// report. onClientEntry runs once per session rather than on every template mount.
export const onClientEntry = () => {
  if (process.env.GATSBY_ANALYTICS_ENABLED !== "true") return;

  inject();
  injectSpeedInsights();
};
