"use client";

import { MDXContentRenderer } from "@/components/mdx/mdx-content-renderer";

interface BlogContentProps {
  code: string;
}

export function BlogContent({ code }: BlogContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXContentRenderer code={code} />
    </div>
  );
}

