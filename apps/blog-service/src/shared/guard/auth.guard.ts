import { KeycloakConnectModule } from 'nest-keycloak-connect'
import { ConfigModule } from '../../config/config.module'
import { ConfigService } from '../../config/config.service'

export const AuthModule = KeycloakConnectModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const {
      KEY_CLOAK_URL,
      KEY_CLOAK_CLIENT_ID,
      KEY_CLOAK_CLIENT_SECRET,
      KEY_CLOAK_REALM
    } = configService.getKeyCloak()
    return {
      authServerUrl: KEY_CLOAK_URL,
      realm: KEY_CLOAK_REALM,
      clientId: KEY_CLOAK_CLIENT_ID,
      secret: KEY_CLOAK_CLIENT_SECRET,
      bearerOnly: true
    }
  },
  inject: [ConfigService]
})
