import { KeycloakConnectModule } from 'nest-keycloak-connect'
import { ConfigService } from '@nestjs/config'

export const AuthModule = KeycloakConnectModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    const KEY_CLOAK_URL = configService.get<string>('KEY_CLOAK_URL')
    const KEY_CLOAK_REALM = configService.get<string>('KEY_CLOAK_REALM')
    const KEY_CLOAK_CLIENT_ID = configService.get<string>(
      'KEY_CLOAK_CLIENT_SECRET'
    )
    const KEY_CLOAK_CLIENT_SECRET = configService.get<string>('KEY_CLOAK_URL')
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
