/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: false, // Desactiva SWC minifier
  compiler: {
    removeConsole: false, // Evita procesos adicionales
  },
}

export default nextConfig
