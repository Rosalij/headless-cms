// This is the Next.js configuration file for the application.
// It defines settings for the Next.js framework, such as image optimization and remote patterns for loading images from external sources.
// In this case, it allows loading images from the "studenter.miun.se" domain, which is where the media items from WordPress are hosted.

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