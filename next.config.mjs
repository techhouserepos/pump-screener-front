/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    USER_LIKE_TOKEN_ID: "_psut_",
    API_KEY: "CNUkt471xMVi7PG9GottpUg8aGz6uNhs4TMVQakmMqbL",
    ORIGIN: "http://localhost:3000"
  },
  async rewrites() {
    return [
      {
        source: '/pumpfun/:path*',
        destination: 'https://frontend-api.pump.fun/:path*',
      },
    ];
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;