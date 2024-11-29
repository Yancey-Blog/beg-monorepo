import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { configCORS } from '@repo/utils'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ValidationError } from 'apollo-server-express'
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
        introspection: true,
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
