import { blogs } from "#site/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/sections/page-header";
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

  const ogUrl = new URL(`${siteConfig.origin}/api/og`);
  ogUrl.searchParams.set("title", blog.title);
  if (blog.author) {
    ogUrl.searchParams.set("author", blog.author);
  }

  return {
    title: `${blog.title} | ${siteConfig.name}`,
    description: blog.excerpt,
    keywords: [...blog.tags, ...siteConfig.keywords, blog.title],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `${siteConfig.origin}/blogs/${blog.slugAsParams}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: {
        url: ogUrl.toString(),
        width: 1200,
        height: 630,
        alt: blog.title,
      },
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
    <main className="flex flex-col items-center pt-12 md:pt-24 lg:pt-32 pb-10 px-3 md:px-0">
      <article className="relative max-w-2xl w-full flex flex-col">
        <PageHeader />

        <div className="absolute h-full w-10 -left-12 top-14">
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
    </main>
  );
}
