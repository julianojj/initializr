/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['www.nginx.com', 'www.rabbitmq.com', 'mariadb.com']
  },
  env: {
    BASE_URL_APP: 'http://proxy:80',
    BASE_URL_API: 'http://app.server.local/initializr'
  }
}

module.exports = nextConfig
