/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    url: 'http://178.128.100.23:3001',
  }
};

export default nextConfig;
