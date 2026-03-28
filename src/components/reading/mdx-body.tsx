"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export function MdxBody({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component />;
}
