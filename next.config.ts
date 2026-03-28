import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const __filename = fileURLToPath(import.meta.url);
const require = createRequire(__filename);

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const nextPolyfillPath =
        require.resolve("next/dist/build/polyfills/polyfill-module.js");
      config.resolve.alias = {
        ...config.resolve.alias,
        [nextPolyfillPath]: path.join(
          path.dirname(__filename),
          "next-polyfill-minimal.js",
        ),
      };
    }
    return config;
  },
};

export default withContentlayer(nextConfig);
