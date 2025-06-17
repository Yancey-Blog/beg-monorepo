import Keycloak from 'keycloak-js'
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

export interface AuthContextType {
  keycloak: Keycloak
  isAuthenticated: boolean
  token: string | null
  login: () => void
  logout: () => void
}

const keycloak = new Keycloak({
  realm: import.meta.env.VITE_KEY_CLOAK_REALM,
  url: import.meta.env.VITE_KEY_CLOAK_URL,
  clientId: import.meta.env.VITE_KEY_CLOAK_CLIENT_ID
})

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        enableLogging: true,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false
      })
      .then((auth) => {
        setIsAuthenticated(auth)
        setToken(keycloak.token || null)
        localStorage.setItem('token', keycloak.token ?? '')

        const interval = setInterval(() => {
          keycloak
            .updateToken(60)
            .then((refreshed) => {
              if (refreshed) {
                console.log('[Auth] Token refreshed')
                setToken(keycloak.token || null)
                localStorage.setItem('token', keycloak.token ?? '')
              }
            })
            .catch((err) => {
              console.error('[Auth] Token refresh failed', err)
              localStorage.removeItem('token')
              setToken(null)
              keycloak.logout()
            })
        }, 10_000)

        return () => clearInterval(interval)
      })
  }, [])

  const login = () => keycloak.login()
  const logout = () => keycloak.logout()

  return (
    <AuthContext.Provider
      value={{ keycloak, isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
