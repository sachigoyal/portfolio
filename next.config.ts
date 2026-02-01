import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/sachi.pdf",
      },
    ];
  },
};

export default nextConfig;
