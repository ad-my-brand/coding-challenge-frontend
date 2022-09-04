/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["in.admybrand.com",]
  }
}

module.exports = nextConfig
