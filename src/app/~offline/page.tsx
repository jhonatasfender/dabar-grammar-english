import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/content/constants";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
        Sem conexão
      </h1>
      <p className="text-stone-600 dark:text-stone-400">
        Não foi possível carregar esta página agora. Se você já visitou o site
        online neste dispositivo, tente voltar a uma página em cache ou
        reconecte-se à internet.
      </p>
      <p className="text-sm text-stone-500 dark:text-stone-500">
        Offline · No connection
      </p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="text-amber-800 underline dark:text-amber-400"
      >
        Ir ao início
      </Link>
    </div>
  );
}
