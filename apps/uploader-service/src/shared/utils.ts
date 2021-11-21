import {
  CORS_ORIGINS_PRODUCTION,
  CORS_ORIGINS_UN_PRODUCTION
} from './constants'

export const configCORS = () => {
  const isEnvProduction = process.env.NODE_ENV === 'production'

  return {
    origin: isEnvProduction
      ? CORS_ORIGINS_PRODUCTION
      : CORS_ORIGINS_UN_PRODUCTION,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*'
  }
}
