import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  realm: process.env.REACT_APP_KEY_CLOAK_REALM,
  url: process.env.REACT_APP_KEY_CLOAK_URL,
  clientId: process.env.REACT_APP_KEY_CLOAK_CLIENT_ID
})

export default keycloak
