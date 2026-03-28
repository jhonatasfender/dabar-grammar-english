"use client";

import { ChevronDown } from "lucide-react";
import {
  type ReactNode,
  useState,
  useCallback,
  type SyntheticEvent,
} from "react";

type HomeSubthemeDetailsProps = {
  defaultOpen: boolean;
  summary: ReactNode;
  children: ReactNode;
};

export function HomeSubthemeDetails({
  defaultOpen,
  summary,
  children,
}: HomeSubthemeDetailsProps) {
  const [open, setOpen] = useState(defaultOpen);

  const onToggle = useCallback((e: SyntheticEvent<HTMLDetailsElement>) => {
    setOpen(e.currentTarget.open);
  }, []);

  return (
    <details
      className="group rounded-xl border border-stone-200 bg-(--surface) dark:border-stone-700"
      open={open}
      onToggle={onToggle}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-sans text-xs font-medium tracking-wide text-stone-600 uppercase marker:hidden dark:text-stone-400 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 text-pretty">{summary}</span>
        <ChevronDown
          className="size-4 shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180 dark:text-stone-500"
          aria-hidden
        />
      </summary>
      {children}
    </details>
  );
}
