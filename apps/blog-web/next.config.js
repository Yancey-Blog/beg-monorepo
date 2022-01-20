const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const sentryWebpackPluginOptions = {
  org: 'beg',
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
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.yanceyleo.com/beg/graphql',
    NEXT_PUBLIC_DOMAIN_URL: 'https://yanceyleo.com',
    NEXT_PUBLIC_STATIC_FILE_URL: 'https://edge.yancey.app/beg',
    NEXT_PUBLIC_GA_KEY: 'UA-114532340-1',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://2998f0f7a05044969a7859a2596e6977@o265404.ingest.sentry.io/1468725',
    NEXT_PUBLIC_DISCUSSION_KEY: 'yancey-blog',
    NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID: '5Y6Y04WE04',
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: '46f32897c2a83b6495111a68bd1cd8c7',
    NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX_NAME: 'prod_YANCEY_BLOG'
  },
  swcMinify: true,
  styledComponents: true,
  maximumFileSizeToCacheInBytes: 10000000,
  productionBrowserSourceMaps: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/, /\.cur$/],
      use: [
        {
          loader: 'url-loader'
        }
      ]
    })

    return config
  },
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
