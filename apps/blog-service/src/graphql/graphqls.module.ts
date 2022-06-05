import { Module } from '@nestjs/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ValidationError } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { configCORS } from '@shared/utils'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        debug: !configService.isEnvProduction,
        playground: false,
        introspection: !configService.isEnvProduction,
        installSubscriptionHandlers: true,
        useGlobalPrefix: true,
        typePaths: ['./**/*.gql'],
        autoSchemaFile: SCHEMA_GQL_FILE_NAME,
        context: ({ req }) => ({ req }),
        formatError(error: ValidationError) {
          const {
            message,
            extensions: { code }
          } = error
          return configService.isEnvProduction
            ? {
                code,
                message,
                timestamp: new Date()
              }
            : error
        },
        plugins: [
          !configService.isEnvProduction &&
            ApolloServerPluginLandingPageLocalDefault()
        ].filter(Boolean),
        cors: configCORS(configService.isEnvProduction)
      }),

      inject: [ConfigService]
    })
  ]
})
export class GraphqlModule {}
