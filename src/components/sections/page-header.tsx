"use client";

import Link from "next/link";
import ThemeToggler from "@/components/theme/toggler";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

export function PageHeader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <Link href="/" className="font-medium text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors">
          {siteConfig.domain}
        </Link>
      </div>
      <ThemeToggler />
    </div>
  );
}
