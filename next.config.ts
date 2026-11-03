import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // A redirect, not a rewrite: on Cloudflare, public/ files are served by the
  // static assets layer, so an internal rewrite to /sachi.pdf 404s.
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/sachi.pdf",
        permanent: false,
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
