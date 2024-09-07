/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co"
      },
      {
        protocol: "https",
        hostname: "www.dcluttr.tech"
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net"
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com"
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com"
      },
      {
        protocol: "https",
        hostname: "s.yimg.com"
      }
    ]
  },
  redirects() {
    return [
      {
        source: "/dashboard/performance",
        destination: "/dashboard/performance/meta-ads",
        permanent: true
      },
      {
        source: "/dashboard/products",
        destination: "/dashboard/products/analytics",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
