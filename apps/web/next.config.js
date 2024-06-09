/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@ultrastar/ui"],
  experimental: {
    proxyTimeout: 0,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};
