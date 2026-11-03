import { siteConfig } from "@/config/site.config";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${siteConfig.name}, ${siteConfig.jobTitle.toLowerCase()} at ${siteConfig.company.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: siteConfig.name,
    subtitle: `${siteConfig.jobTitle} at ${siteConfig.company.name}`,
  });
}
