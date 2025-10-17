/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 14
  // No need for experimental.appDir
  
  async redirects() {
    return [
      { source: '/my-flow', destination: '/my-work', permanent: true },
      { source: '/alignment', destination: '/plan', permanent: true },
      { source: '/ai-team', destination: '/ai', permanent: true },
      { source: '/team-pulse', destination: '/team', permanent: true },
      { source: '/culture', destination: '/kudos', permanent: true },
    ];
  },
}

module.exports = nextConfig
