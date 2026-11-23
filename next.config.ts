import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tooles/converter-tooles/:path*",
        destination: "/tools/converter-tools/:path*",
        permanent: true,
      },
      {
        source: "/tooles/pdf-tooles/:path*",
        destination: "/tools/pdf-tools/:path*",
        permanent: true,
      },
      {
        source: "/tooles/image-tooles/:path*",
        destination: "/tools/image-tools/:path*",
        permanent: true,
      },
      {
        source: "/tooles/json-tooles/:path*",
        destination: "/tools/json-tools/:path*",
        permanent: true,
      },
      {
        source: "/tooles/coding-tooles/:path*",
        destination: "/tools/coding-tools/:path*",
        permanent: true,
      },
      {
        source: "/tooles",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tooles/:path*",
        destination: "/tools/:path*",
        permanent: true,
      },
      {
        source: "/api/image-tooles/:path*",
        destination: "/api/image-tools/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
