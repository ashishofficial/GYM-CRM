/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Tree-shake heavy barrel imports in both dev + prod.
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "react-hook-form"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Keep dev pages in memory longer so navigating back doesn't recompile.
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 8,
  },

  // Skip type-checking during builds (handled separately by editor / CI).
  // Disabled here to avoid blocking iterative builds. Flip to true if CI runs lint/types.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
