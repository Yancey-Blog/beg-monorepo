import { NestApplication } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { UpdateGlobalSettingInput } from '../src/global-setting/dtos/update-global-setting.input'
import { GlobalSettingModule } from '../src/global-setting/global-setting.module'
import { GlobalSettingModel } from '../src/global-setting/models/global-setting.model'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'

describe('GlobalSettingController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        GlobalSettingModule,
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: configService.getMongoURI(),
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
          }),
          inject: [ConfigService]
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: SCHEMA_GQL_FILE_NAME
        })
      ]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  let id = ''

  // READ_ALL
  it('getGlobalSetting', async () => {
    const getAllTypeDefs = `
    query GetGlobalSetting {
      getGlobalSetting {
        _id
        releasePostId
        cvPostId
        isGrayTheme
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs
      })
      .expect(({ body }) => {
        const testData: GlobalSettingModel = body.data.getGlobalSetting
        id = testData._id

        expect(testData._id).toBe(id)
      })
      .expect(200)
  })

  const updatedData: UpdateGlobalSettingInput = {
    id,
    releasePostId: '36f27dc5-9adc-4ded-918f-d1bf9dc1ad4a',
    cvPostId: '36f27dc5-9adc-4ded-918f-d1bf9dc1ad4b',
    isGrayTheme: true
  }

  // CREATE_ONE
  it('updateGlobalSettingById', async () => {
    const updateOneTypeDefs = `
    mutation UpdateGlobalSettingById {
      updateGlobalSettingById(input: ${JSON.stringify({
        ...updatedData,
        id
      }).replace(/"([^(")"]+)":/g, '$1:')}) {
        _id
        releasePostId
        cvPostId
        isGrayTheme
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneTypeDefs
      })
      .expect(({ body }) => {
        const testData: GlobalSettingModel = body.data.updateGlobalSettingById
        expect(testData.releasePostId).toBe(updatedData.releasePostId)
        expect(testData.cvPostId).toBe(updatedData.cvPostId)
        expect(testData.isGrayTheme).toBeTruthy()
      })
      .expect(200)
  })
})
