import { blogs } from "#site/content";
import { BlogsList } from "@/components/blogs";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Thoughts, ideas, and things I've learned along the way.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: `Blogs · ${siteConfig.name}`,
    description: "Thoughts, ideas, and things I've learned along the way.",
    url: "/blogs",
    images: "/opengraph-image",
  },
};

export default function BlogsPage() {
  const publishedBlogs = blogs.filter((blog) => blog.published);

  return (
    <div className="relative">
      <div className="absolute h-full w-10 -left-12 top-8">
        <Link href="/" className="sticky top-4">
          <ArrowLeft className="size-4" />
        </Link>
      </div>

      <BlogsList blogs={publishedBlogs} />
    </div>
  );
}
