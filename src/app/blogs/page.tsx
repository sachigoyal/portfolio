import { blogs } from "#site/content";
import { PageHeader } from "@/components/sections";
import { BlogsList } from "@/components/blogs";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Blogs | ${siteConfig.name}`,
  description: "Thoughts, ideas, and things I've learned along the way.",
  openGraph: {
    title: `Blogs | ${siteConfig.name}`,
    description: "Thoughts, ideas, and things I've learned along the way.",
    url: `${siteConfig.origin}/blogs`,
  },
};

export default function BlogsPage() {
  const publishedBlogs = blogs.filter((blog) => blog.published);

  return (
    <main className="flex flex-col items-center pt-12 md:pt-24 lg:pt-32 pb-10 px-3 md:px-0">
      <div className="relative max-w-2xl w-full flex flex-col">
        <PageHeader />

        <div className="absolute h-full w-10 -left-12 top-14">
          <Link href="/" className="sticky top-4">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <BlogsList blogs={publishedBlogs} />
      </div>
    </main>
  );
}
