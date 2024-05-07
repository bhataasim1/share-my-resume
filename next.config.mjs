/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    images: {
        domains: ['127.0.0.1', 'res.cloudinary.com'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
