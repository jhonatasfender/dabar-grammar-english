import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site/url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const allowAiTraining =
    process.env.ROBOTS_ALLOW_AI_TRAINING === "true" ||
    process.env.NEXT_PUBLIC_ROBOTS_ALLOW_AI_TRAINING === "true";

  const trainingDisallow: MetadataRoute.Robots["rules"] = allowAiTraining
    ? []
    : [
        { userAgent: "GPTBot", disallow: ["/"] },
        { userAgent: "ClaudeBot", disallow: ["/"] },
        { userAgent: "Google-Extended", disallow: ["/"] },
      ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      ...trainingDisallow,
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
