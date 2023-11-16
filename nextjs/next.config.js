/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.tsx');
const nextConfig = withNextIntl({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
})

module.exports = nextConfig
