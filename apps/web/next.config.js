/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@ultrastar/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
};
