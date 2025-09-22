/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*", // cho phép load tất cả file từ utfs.io/f/*
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh", // nếu sau này link từ ufs.sh
      },
    ],
  },
};

export default nextConfig;
