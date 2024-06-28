/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "www.dcluttr.tech",
            },
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
            },
        ],
    },
};

export default nextConfig;
