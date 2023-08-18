/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://accounts.google.com/gsi/client/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
