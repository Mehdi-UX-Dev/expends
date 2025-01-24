import withSerwistInit from "@serwist/next";

// Serwist configuration
const withSerwist = withSerwistInit({
  swSrc: "./sw",
  swDest: "public/sw.js",
});

// Base Next.js configuration
const baseNextConfig = {};

// Merge the configurations
const combinedConfig = withSerwist(baseNextConfig);

export default combinedConfig;
