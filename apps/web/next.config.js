/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@ultrastar/ui"],
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};
