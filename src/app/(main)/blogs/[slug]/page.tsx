import { blogs } from "#site/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import {
  BlogHeader,
  BlogContent,
  BlogPagination,
} from "@/components/blogs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BlogPageParams = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlogFromParam(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const blog = blogs.find((blog) => blog.slugAsParams === decodeURIComponent(slug));

  if (!blog) {
    return null;
  }

  return blog;
}

export async function generateMetadata({
  params,
}: BlogPageParams): Promise<Metadata> {
  const blog = await getBlogFromParam(params);

  if (!blog) {
    return {};
  }

  const url = `/blogs/${blog.slugAsParams}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [...blog.tags, blog.title, ...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url,
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author ?? siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return blogs.map((blog) => ({
    slug: blog.slugAsParams,
  }));
}

export default async function BlogPost({ params }: BlogPageParams) {
  const blog = await getBlogFromParam(params);

  if (!blog) {
    notFound();
  }

  const sortedBlogs = [...blogs]
    .filter((b) => b.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = sortedBlogs.findIndex(
    (b) => b.slugAsParams === blog.slugAsParams
  );

  const prevBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex >= 0 && currentIndex < sortedBlogs.length - 1
      ? sortedBlogs[currentIndex + 1]
      : null;

  return (
    <article className="relative">
      <div className="absolute h-full w-10 -left-12 top-8">
        <Link href="/blogs" className="sticky top-4">
          <ArrowLeft className="size-4" />
        </Link>
      </div>

      <BlogHeader
        title={blog.title}
        date={blog.date}
        author={blog.author}
        category={blog.category}
        tags={blog.tags}
      />

      <BlogContent code={blog.body} />

      <BlogPagination prevBlog={prevBlog} nextBlog={nextBlog} />
    </article>
  );
}
