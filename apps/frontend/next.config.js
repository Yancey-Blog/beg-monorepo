// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withSentryConfig } = require('@sentry/nextjs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const runtimeCaching = require('next-pwa/cache')

const sentryWebpackPluginOptions = {
  org: 'beg',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  project: 'yancey-blog',
  silents: true,
  include: '.next'
}
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  images: {
    domains: ['edge.yancey.app']
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV !== 'production',
    maximumFileSizeToCacheInBytes: 10000000
  },
  images: {
    domains: ['edge.yancey.app']
  },
  swcMinify: true,
  styledComponents: true,
  maximumFileSizeToCacheInBytes: 10000000,
  productionBrowserSourceMaps: true,
  turbopack: {},
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/, /\.cur$/],
  //     use: [
  //       {
  //         loader: 'url-loader'
  //       }
  //     ]
  //   })

  //   return config
  // },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  }
}

module.exports = withBundleAnalyzer(
  withPWA(
    process.env.NODE_ENV === 'production'
      ? withSentryConfig(config, sentryWebpackPluginOptions)
      : config
  )
)