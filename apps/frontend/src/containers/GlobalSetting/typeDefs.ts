import { gql, TypedDocumentNode } from '@apollo/client'
import { GlobalSettingModel } from '@repo/graphql-types/__generated__/graphql'

export const GET_GLOBAL_SETTING: TypedDocumentNode<{
  getGlobalSetting: GlobalSettingModel
}> = gql`
  query GetGlobalSetting {
    getGlobalSetting {
      releasePostId
      cvPostId
      isGrayTheme
    }
  }
`
