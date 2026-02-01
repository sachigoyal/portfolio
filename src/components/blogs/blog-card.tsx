import Link from "next/link";
import { ListItemCard } from "@/components/ui/list-item-card";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  className?: string;
}

export function BlogCard({ title, excerpt, date, slug, className }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <ListItemCard asChild className={cn("flex-col gap-1", className)}>
      <Link href={`/blogs/${slug}`}>
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="font-medium text-sm">{title}</span>
          <span className="text-xs text-muted-foreground shrink-0">
            {formattedDate}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </Link>
    </ListItemCard>
  );
}
