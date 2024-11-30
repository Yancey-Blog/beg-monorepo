import { gql, TypedDocumentNode } from '@apollo/client'
import {
  ArchiveModel,
  MutationUpdateLikeArgs,
  MutationUpdatePvArgs,
  PaginationInput,
  PostItemModel,
  PostModel,
  QueryGetPostByIdArgs,
  QueryGetTopPvPostsArgs,
  TagsModel
} from '@repo/graphql-types/__generated__/graphql'
import { GraphQInputWrapper } from 'src/shared/types'

const POST_ITEM_FRAGMENT = gql`
  fragment PostItemFragment on PostItemModel {
    _id
    posterUrl
    title
    summary
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`

export const POSTS: TypedDocumentNode<
  { posts: PostModel },
  GraphQInputWrapper<PaginationInput>
> = gql`
  query Posts($input: PaginationInput!) {
    posts(input: $input) {
      total
      page
      pageSize
      items {
        ...PostItemFragment
      }
    }
  }
  ${POST_ITEM_FRAGMENT}
`

export const GET_POST_BY_ID: TypedDocumentNode<
  { getPostById: PostModel },
  QueryGetPostByIdArgs
> = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      content
      ...PostItemFragment
      prev {
        _id
        posterUrl
        title
      }

      next {
        _id
        posterUrl
        title
      }
    }
  }
  ${POST_ITEM_FRAGMENT}
`

export const GET_TOP_PV_POSTS: TypedDocumentNode<
  { getTopPVPosts: PostItemModel[] },
  QueryGetTopPvPostsArgs
> = gql`
  query GetTopPVPosts($limit: Int!) {
    getTopPVPosts(limit: $limit) {
      _id
      title
      posterUrl
    }
  }
`

export const GET_ALL_TAGS: TypedDocumentNode<{ getAllTags: TagsModel }> = gql`
  query GetAllTags {
    getAllTags {
      tags
    }
  }
`

export const UPDATE_LIKE: TypedDocumentNode<unknown, MutationUpdateLikeArgs> =
  gql`
    mutation UpdateLike($id: ID!) {
      updateLike(id: $id) {
        _id
        like
      }
    }
  `

export const UPDATE_PV: TypedDocumentNode<unknown, MutationUpdatePvArgs> = gql`
  mutation UpdatePV($id: ID!) {
    updatePV(id: $id) {
      _id
      pv
    }
  }
`

export const ARCHIVE: TypedDocumentNode<{ archive: ArchiveModel[] }> = gql`
  query Archive {
    archive {
      _id
      months {
        month
        days {
          id
          title
          pv
          createdAt
        }
      }
    }
  }
`
