import Keycloak, { KeycloakInstance } from 'keycloak-js'

// @ts-ignore
const keycloak: KeycloakInstance = new Keycloak({
  realm: 'beg',
  url: 'https://sso.yanceyleo.com/auth',
  clientId: 'blog-cms'
})

export default keycloak
