import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Optimisations Next.js
  reactStrictMode: true,

  // Configuration des images (si besoin de domaines externes futurs)
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ajoutez vos domaines ici si vous utilisez des images externes
    // domains: ['example.com'],
  },

  // Optimisations de production
  poweredByHeader: false, // Masquer l'en-tête "X-Powered-By: Next.js" pour la sécurité
};

export default nextConfig;
