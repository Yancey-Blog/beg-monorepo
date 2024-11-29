const CORS_ORIGINS_PRODUCTION = [/\.?yanceyleo\.com$/, /\.?yancey\.app$/]

const CORS_ORIGINS_DEVELOPMENT = [
  'http://localhost:3000',
  'http://localhost:3001'
]

export const configCORS = (isEnvProduction: boolean) => ({
  origin: isEnvProduction ? CORS_ORIGINS_PRODUCTION : CORS_ORIGINS_DEVELOPMENT,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: '*'
})
