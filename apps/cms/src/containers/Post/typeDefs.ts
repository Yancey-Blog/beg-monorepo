import { gql, TypedDocumentNode } from '@apollo/client'
import {
  BatchDeleteModel,
  CreatePostInput,
  MutationDeletePostByIdArgs,
  MutationDeletePostsArgs,
  PaginationInput,
  PostItemModel,
  PostModel,
  UpdatePostInput
} from 'backend/src/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const POST_FRAGMENT = gql`
  fragment PostFragment on PostItemModel {
    _id
    posterUrl
    title
    summary
    content
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_POST: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreatePostInput>
> = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const UPDATE_ONE_POST: TypedDocumentNode<
  { updatePostById: PostItemModel },
  GraphQInputWrapper<UpdatePostInput>
> = gql`
  mutation UpdatePostById($input: UpdatePostInput!) {
    updatePostById(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const POSTS: TypedDocumentNode<
  { getPostsForCMS: PostModel },
  GraphQInputWrapper<PaginationInput>
> = gql`
  query GetPostsForCMS($input: PaginationInput!) {
    getPostsForCMS(input: $input) {
      total
      page
      pageSize
      items {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`

export const GET_POST_BY_ID: TypedDocumentNode<
  PostModel,
  GraphQInputWrapper<{ id: string }>
> = gql`
  query GetPostByIdForCMS($id: ID!) {
    getPostByIdForCMS(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const DELETE_ONE_POST: TypedDocumentNode<
  { deletePostById: PostItemModel },
  MutationDeletePostByIdArgs
> = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const BATCH_DELETE_POSTS: TypedDocumentNode<
  { deletePosts: BatchDeleteModel },
  MutationDeletePostsArgs
> = gql`
  mutation DeletePosts($ids: [ID!]!) {
    deletePosts(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`

export const GET_TOP_PV_POSTS = gql`
  query GetTopPVPosts($limit: Int!) {
    getTopPVPosts(limit: $limit) {
      _id
      title
      posterUrl
      pv
    }
  }
`

export const GET_TOP_LIKE_POSTS = gql`
  query GetTopLikePosts($limit: Int!) {
    getTopLikePosts(limit: $limit) {
      _id
      title
      posterUrl
      like
    }
  }
`

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      tags
    }
  }
`

export const GET_POST_STATISTICS = gql`
  query GetPostStatistics {
    getPostStatistics {
      _id
      count
      items {
        postId
        postName
        scenes
        operatedAt
      }
    }
  }
`

export const CREATE_POST_STATISTICS = gql`
  mutation CreatePostStatistics($input: CreatePostStatisticsInput!) {
    createPostStatistics(input: $input) {
      _id
      postId
      postName
      scenes
      createdAt
      updatedAt
    }
  }
`
