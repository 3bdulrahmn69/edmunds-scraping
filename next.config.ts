import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'static.ed.edmunds-media.com',
      },
    ],
  },
};

export default nextConfig;
