/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
