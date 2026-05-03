import { blogs } from "#site/content";
import { BlogCard } from "@/components/blogs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LIMIT = 3;

export function RecentBlogs() {
  const recentBlogs = blogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, LIMIT);

  if (recentBlogs.length === 0) return null;

  return (
    <div className="mt-5 text-sm">
      <p className="font-semibold text-lg">Recent posts</p>
      <div className="flex flex-col -mx-2">
        {recentBlogs.map((blog) => (
          <BlogCard
            key={blog.slug}
            title={blog.title}
            excerpt={blog.excerpt}
            date={blog.date}
            slug={blog.slugAsParams}
          />
        ))}
      </div>
      {recentBlogs.length > LIMIT && (
        <div className="flex justify-end mt-3 -mr-2">
          <Link
            href="/blogs"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors"
          >
            See more
            <ArrowRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
