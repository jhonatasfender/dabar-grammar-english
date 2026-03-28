import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { LocaleHtmlLang } from "@/components/locale-html-lang";
import { isLocale } from "@/lib/content/constants";
import type { Locale } from "@/lib/content/constants";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <SiteHeader locale={locale} />
      <main className="flex-1">{children}</main>
    </>
  );
}
