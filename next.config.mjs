/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    // url: 'http://178.128.100.23:3001',
    url: 'http://localhost:3001'
  },
  basePath: '',
  // assetPrefix: './',
  trailingSlash: true,
  exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' }
    };
  },
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  }
};

export default nextConfig;
