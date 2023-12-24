/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["social-media-ap-southeast-1.s3.ap-southeast-1.amazonaws.com"],
  },
  transpilePackages: ["usehooks-ts", "@uniswap/widgets", "ccxt"],
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      };
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

module.exports = nextConfig;
