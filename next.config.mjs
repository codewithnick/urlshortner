/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/:shortUrl',
            destination: '/api/:shortUrl',
          },
        ];
      },
};
export default nextConfig;
