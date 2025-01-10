/** @type {import('next').NextConfig} */

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Custom Three.js optimization
    config.module.rules.push({
      test: /react-three-fiber/,
      sideEffects: false,
    });

    // Add Webpack Bundle Analyzer for client-side only
    if (!isServer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static', // Generates a static report
          reportFilename: 'bundle-report.html', // Save the report in the project's output directory
          openAnalyzer: false, // Prevent auto-opening the report (optional)
        })
      );

      // Client-side optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxInitialRequests: 25,
          cacheGroups: {
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return (
                  module.size() > 50000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            threeVendor: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three-vendor',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
