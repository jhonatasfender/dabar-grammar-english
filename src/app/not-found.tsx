import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/content/constants";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
        Página não encontrada
      </h1>
      <p className="text-stone-600 dark:text-stone-400">
        O artigo ou rota pode não existir neste idioma.
      </p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="text-amber-800 underline dark:text-amber-400"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
