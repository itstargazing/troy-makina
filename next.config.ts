import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force the correct project root to avoid locking onto other lockfiles on the machine.
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
