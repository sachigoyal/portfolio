import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogNavigation({ className }: { className?: string }) {
  return (
    <nav className={cn("", className)}>
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to blogs</span>
      </Link>
    </nav>
  );
}

