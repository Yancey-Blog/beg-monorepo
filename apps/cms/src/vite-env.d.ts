/// <reference types="vite/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    VITE_BEG_SERVICE_DOMAIN: string
    VITE_UPLOADER_SERVICE_DOMAIN: string
    VITE_ALGOLIA_APPLICATION_ID: string
    VITE_ALGOLIA_ADMIN_API_KEY: string
    VITE_ALGOLIA_SEARCH_INDEX: string
    VITE_KEY_CLOAK_REALM: string
    VITE_KEY_CLOAK_URL: string
    VITE_KEY_CLOAK_CLIENT_ID: string
    PUBLIC_URL: string
  }
}

declare interface Window {
  grecaptcha: {
    ready: () => void
    execute: Promise
  }
}
