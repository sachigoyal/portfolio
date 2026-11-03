import { blogs } from "#site/content";
import { siteConfig } from "@/config/site.config";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slugAsParams }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slugAsParams === decodeURIComponent(slug));

  return renderOgImage({
    title: blog?.title ?? siteConfig.name,
    subtitle: siteConfig.name,
  });
}
