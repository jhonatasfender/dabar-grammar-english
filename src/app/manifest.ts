import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE } from "@/lib/content/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dabar Grammar English",
    short_name: "Dabar Grammar",
    description:
      "Gramática e uso avançados do inglês — conteúdo em inglês, português e espanhol.",
    start_url: `/${DEFAULT_LOCALE}`,
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#fafaf9",
    theme_color: "#292524",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
