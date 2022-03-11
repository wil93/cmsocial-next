/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://training.olinfo.it/api/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
