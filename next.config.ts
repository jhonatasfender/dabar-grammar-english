import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import { withContentlayer } from "next-contentlayer2";

const __filename = fileURLToPath(import.meta.url);
const require = createRequire(__filename);

const isDev = process.env.NODE_ENV === "development";

const swRevision =
  spawnSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf-8",
  }).stdout?.trim() || randomUUID();

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: isDev,
  additionalPrecacheEntries: [{ url: "/~offline", revision: swRevision }],
});

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
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

export default withSerwist(withContentlayer(nextConfig));
