/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Only include Three.js in routes that need it
    config.module.rules.push({
      test: /react-three-fiber/,
      sideEffects: false,
    });
    return config;
  },
};

export default nextConfig;
