const CORS_ORIGINS_PRODUCTION = [/\.?yanceyleo\.com$/, /\.?yancey\.app$/]

const CORS_ORIGINS_UN_PRODUCTION = [
  'http://localhost:3000',
  'http://localhost:3001'
]

export default {
  origin:
    process.env.NODE_ENV === 'production'
      ? CORS_ORIGINS_PRODUCTION
      : CORS_ORIGINS_UN_PRODUCTION,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: '*'
}