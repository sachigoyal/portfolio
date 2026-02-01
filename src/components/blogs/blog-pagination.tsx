import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPaginationProps {
  prevBlog: {
    title: string;
    slugAsParams: string;
  } | null;
  nextBlog: {
    title: string;
    slugAsParams: string;
  } | null;
}

export function BlogPagination({ prevBlog, nextBlog }: BlogPaginationProps) {
  if (!prevBlog && !nextBlog) return null;

  return (
    <nav className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-border">
      {prevBlog ? (
        <Link
          href={`/blogs/${prevBlog.slugAsParams}`}
          className="flex flex-col items-start gap-1 group flex-1 min-w-0"
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
            Previous
          </span>
          <span className="text-sm font-medium truncate w-full group-hover:underline">
            {prevBlog.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      
      {nextBlog ? (
        <Link
          href={`/blogs/${nextBlog.slugAsParams}`}
          className="flex flex-col items-end gap-1 group flex-1 min-w-0"
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            Next
            <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="text-sm font-medium truncate w-full text-right group-hover:underline">
            {nextBlog.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

