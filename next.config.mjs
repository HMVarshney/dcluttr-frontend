/** @type {import('next').NextConfig} */
const nextConfig = {
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
