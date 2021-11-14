import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { randomSeries } from 'yancey-js-util'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { AuthModule } from '../src/auth/auth.module'
import { UserModel } from '../src/users/models/user.model'
import { LoginInput } from '../src/auth/dtos/login.input'
import { RegisterInput } from '../src/auth/dtos/register.input'

describe('AuthController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AuthModule,
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: configService.getMongoURI(),
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
          inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: SCHEMA_GQL_FILE_NAME,
        }),
      ],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  const loginData: LoginInput = {
    email: `${randomSeries(10)}@example.com`,
    password: 'abcd1234,',
    token: '',
  }

  const registerData: RegisterInput = {
    ...loginData,
    username: randomSeries(10),
  }

  const registerDataString = JSON.stringify(registerData).replace(/"([^(")"]+)":/g, '$1:')

  const loginDataString = JSON.stringify(loginData).replace(/"([^(")"]+)":/g, '$1:')

  let id = ''

  // REGISTER
  it('register', async () => {
    const registerTypeDefs = `
    mutation Register {
      register(input: ${registerDataString}) {
        _id
        email
        authorization
        role
        avatarUrl
        username
        isTOTP
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: registerTypeDefs,
      })
      .expect(({ body }) => {
        const testData: UserModel = body.data.register
        id = testData._id
        expect(testData.username).toBe(registerData.username)
        expect(testData.email).toBe(registerData.email)
      })
      .expect(200)
  })

  // LOGIN
  it('login', async () => {
    const loginTypeDefs = `
    query Login {
      login(input: ${loginDataString}) {
        _id
        email
        authorization
        role
        avatarUrl
        username
        isTOTP
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: loginTypeDefs,
      })
      .expect(({ body }) => {
        const testData: UserModel = body.data.login

        expect(testData._id).toBe(id)
        expect(testData.email).toBe(loginData.email)
      })
      .expect(200)
  })
})
