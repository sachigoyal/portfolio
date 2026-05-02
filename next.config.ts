import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/sachi.pdf",
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ]
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
