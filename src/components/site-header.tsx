import type { Locale } from "@/lib/content/constants";
import { getSiteHeaderUi } from "@/lib/ui/strings";
import { SiteHeaderBar } from "@/components/site-header-bar";

const headerClass = [
  "sticky top-0 z-50 border-b border-stone-200/80",
  "bg-(--surface)/90 backdrop-blur-md dark:border-stone-700/80",
].join(" ");

export function SiteHeader({ locale }: { locale: Locale }) {
  const ui = getSiteHeaderUi(locale);

  return (
    <header className={headerClass}>
      <SiteHeaderBar locale={locale} ui={ui} />
    </header>
  );
}
