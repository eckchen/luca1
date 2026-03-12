/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /*
     * Optimiert Imports für große Pakete automatisch:
     * Nur tatsächlich genutzte Icons/Komponenten werden gebundelt
     * → kleinere Bundle-Größe, schnellere Ladezeit
     */
    optimizePackageImports: ["lucide-react", "geist"],
  },
}

export default nextConfig
