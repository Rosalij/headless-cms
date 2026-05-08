/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "studenter.miun.se",
      },
    ],
  },
};

export default nextConfig;