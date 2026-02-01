import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Blog Post";
  const author = searchParams.get("author") ?? "Sachi Goyal";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000",
          padding: "80px",
        }}
      >
        {/* Site name */}
        <span
          style={{
            fontSize: "20px",
            color: "#666",
            fontWeight: 400,
            letterSpacing: "0.05em",
          }}
        >
          sachi.dev
        </span>

        {/* Title and author */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? "64px" : "80px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              maxWidth: "1000px",
              margin: 0,
            }}
          >
            {title}
          </h1>

          <span
            style={{
              fontSize: "20px",
              color: "#666",
              fontWeight: 400,
              letterSpacing: "0.05em",
              textTransform: "lowercase",
            }}
          >
            {author}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
