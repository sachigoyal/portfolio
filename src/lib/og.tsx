import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

// Open Graph images are rendered at build time (every route that uses this is
// static), so reading fonts from disk is fine. Cloudflare serves the result as
// a static asset and never runs this code.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [regular, medium, mono] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-Medium.ttf")),
    readFile(join(fontDir, "GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

export async function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const long = title.length > 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          backgroundColor: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 24,
            color: "#a3a3a3",
          }}
        >
          {siteConfig.domain}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: long ? 60 : 76,
              fontWeight: 500,
              color: "#0a0a0a",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 32, color: "#737373", letterSpacing: "-0.01em" }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
