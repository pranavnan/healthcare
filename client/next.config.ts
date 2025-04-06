import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  
  // // Allow cross-origin requests from healthcare.dev in development mode
  // experimental: {
  //   allowedDevOrigins: ['healthcare.dev'],
  //   // Enable Turbopack features
  //   turbo: {
  //     rules: {
  //       // Turbopack configuration can go here
  //     }
  //   }
  // },
  
  // Only use webpack config when not using Turbopack
  // webpack: (config, { turbo }) => {
  //   // Skip webpack config if Turbopack is being used
  //   if (turbo) {
  //     return config;
  //   }
    
  //   // Otherwise apply webpack optimization
  //   config.optimization.minimize = false;
  //   return config;
  // }
};

export default nextConfig;