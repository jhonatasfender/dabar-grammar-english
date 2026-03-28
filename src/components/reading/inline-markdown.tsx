"use client";

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
  variant?: "inline" | "block";
  className?: string;
};

export function InlineMarkdown({
  text,
  variant = "inline",
  className,
}: Props): ReactNode {
  const components =
    variant === "inline"
      ? {
          p: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
        }
      : {
          p: ({ children }: { children?: React.ReactNode }) => (
            <p className={className}>{children}</p>
          ),
        };

  return (
    <ReactMarkdown
      components={{
        ...components,
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em>{children}</em>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
