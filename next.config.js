/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/users',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
