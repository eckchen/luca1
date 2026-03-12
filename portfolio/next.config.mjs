/** @type {import('next').NextConfig} */
const isStaticExport = process.env.EXPORT_STATIC === "1"
const nextConfig = {
  ...(isStaticExport && { output: "export", trailingSlash: true }),
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
