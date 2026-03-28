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

function contentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src 'self' https:${isDev ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy(),
          },
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
