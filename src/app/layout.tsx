import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { Providers } from "@/components/providers";
import { WebsiteJsonLd } from "@/components/seo/json-ld";
import { getSiteUrl } from "@/lib/site/url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-reading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Dabar Grammar English",
    template: "%s · Dabar Grammar English",
  },
  description:
    "Gramática e uso avançados do inglês — conteúdo editorial em inglês, português e espanhol (MDX), leitura confortável.",
  openGraph: {
    type: "website",
    siteName: "Dabar Grammar English",
    title: "Dabar Grammar English",
    description:
      "Portal de estudo avançado de gramática inglesa com textos multilíngues e leitura confortável.",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dabar Grammar English",
    description:
      "Portal de estudo avançado de gramática inglesa com textos multilíngues e leitura confortável.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased`}
      >
        <Providers>
          <WebsiteJsonLd />
          <div className="flex min-h-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
