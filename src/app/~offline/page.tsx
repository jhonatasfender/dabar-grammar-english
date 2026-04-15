import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import { LocaleHtmlLang } from "@/components/locale-html-lang";
import { OfflineRetryActions } from "@/components/offline-retry-actions";
import { SiteHeader } from "@/components/site-header";
import { DEFAULT_LOCALE } from "@/lib/content/constants";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Sem conexão",
};

export default function OfflinePage() {
  const home = `/${DEFAULT_LOCALE}`;

  return (
    <>
      <LocaleHtmlLang locale={DEFAULT_LOCALE} />
      <SiteHeader locale={DEFAULT_LOCALE} />
      <main className="flex flex-1 flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-14 sm:py-20">
          <div
            className={cn(
              "w-full max-w-md rounded-2xl border border-stone-200/90 bg-(--surface) p-8 text-center shadow-sm",
              "dark:border-stone-700/90 dark:shadow-none",
            )}
          >
            <div
              className={cn(
                "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl",
                "bg-stone-100 text-stone-500 dark:bg-stone-800/80 dark:text-stone-400",
              )}
              aria-hidden
            >
              <WifiOff className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              Sem conexão
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
              Não foi possível carregar esta página agora. Se você já visitou o
              site online neste dispositivo, tente recarregar, voltar a uma
              página em cache ou reconecte-se à internet.
            </p>
            <p className="mt-4 text-xs text-stone-500 dark:text-stone-500">
              <span className="text-stone-400 dark:text-stone-600">EN</span>{" "}
              This page couldn&apos;t load.{" "}
              <span className="text-stone-400 dark:text-stone-600">·</span>{" "}
              <span className="text-stone-400 dark:text-stone-600">ES</span> No
              se pudo cargar esta página.
            </p>
            <OfflineRetryActions homeHref={home} />
            <p className="mt-8 border-t border-stone-200/80 pt-6 text-xs leading-relaxed text-stone-500 dark:border-stone-700/80 dark:text-stone-500">
              Dica: páginas que você já abriu online neste aparelho podem abrir
              do cache mesmo sem rede.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
