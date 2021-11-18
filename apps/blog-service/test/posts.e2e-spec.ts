import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { PostsModule } from '../src/posts/posts.module'
import { PostModel } from '../src/posts/models/posts.model'
import { PostItemModel } from '../src/posts/models/post.model'
import { CreatePostInput } from '../src/posts/dtos/create-post.input'
import { UpdatePostInput } from '../src/posts/dtos/update-post.input'
import { PaginationInput } from '../src/posts/dtos/pagination.input'
import { BatchDeleteModel } from '../src/database/models/batch-delete.model'

describe('PostsController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        PostsModule,
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

  const createdData: CreatePostInput = {
    title: 'post title',
    content: 'post content',
    summary: 'post summary',
    posterUrl: 'https://www.yanceyleo.com/',
    tags: ['javascript'],
    lastModifiedDate: new Date(),
  }

  let id = ''

  const updatedData: UpdatePostInput = {
    id,
    content: 'update content',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createPost', async () => {
    const createOneTypeDefs = `
    mutation CreatePost {
      createPost(input: ${createDataString}) {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.createPost
        id = testData._id
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  const fetchData: PaginationInput = {
    page: 1,
    pageSize: 10,
  }

  const fetchDataString = JSON.stringify(fetchData).replace(/"([^(")"]+)":/g, '$1:')

  // READ_ALL
  it('getPosts', async () => {
    const getAllTypeDefs = `
    query GetPosts {
      getPosts(input: ${fetchDataString}) {
        total
        page
        pageSize
        items {
          _id
          content
        }
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostModel = body.data.getPosts

        const firstData = testData.items[0]

        expect(firstData._id).toBe(id)
        expect(firstData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // READ_ONE
  it('getPostById', async () => {
    const getOneByIdTypeDefs = `
    query GetPostById {
      getPostById(id: "${id}") {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.getPostById

        expect(testData._id).toBe(id)
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updatePostById', async () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdatePostById {
      updatePostById(input: ${updateDataString}) {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.updatePostById
        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
  })

  // UPDATE_PV
  it('updatePV', async () => {
    const updatePVTypeDefs = `
    mutation UpdatePV {
      updatePV(id: "${id}") {
        pv
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updatePVTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.updatePV
        expect(testData.pv).toBe(1)
      })
      .expect(200)
  })

  // UPDATE_LIKE
  it('updateLike', async () => {
    const updateLikeTypeDefs = `
    mutation UpdateLike {
      updateLike(id: "${id}") {
        like
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateLikeTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.updateLike
        expect(testData.like).toBe(1)
      })
      .expect(200)
  })

  // GET_TOP_PV_POSTS
  it('getTopPVPosts', async () => {
    const getTopPVPostsTypeDefs = `
      query GetTopPVPosts {
        getTopPVPosts(limit: 1) {
          _id
        }
      }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getTopPVPostsTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel[] = body.data.getTopPVPosts
        const firstData = testData[0]
        expect(firstData._id).toBe(id)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deletePostById', async () => {
    const deleteOneByIdTypeDefs = `
    mutation DeletePostById {
      deletePostById(id: "${id}") {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostItemModel = body.data.deletePostById

        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
  })

  // BATCH_DELETE
  it('deletePosts', async () => {
    const batchDeleteTypeDefs = `
    mutation DeletePosts {
      deletePosts(ids: ["${id}"]) {
        ok
        n
        deletedCount
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: batchDeleteTypeDefs,
      })
      .expect(({ body }) => {
        const testData: BatchDeleteModel = body.data.deletePosts
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
