import { gql, TypedDocumentNode } from '@apollo/client'
import {
  GlobalSettingModel,
  UpdateGlobalSettingInput
} from '@repo/graphql-types/__generated__/graphql'
import { GraphQInputWrapper } from 'src/types/common'

const GLOBAL_SETTING_FRAGMENT = gql`
  fragment GlobalSettingFragment on GlobalSettingModel {
    _id
    releasePostId
    cvPostId
    isGrayTheme
  }
`

export const GLOBAL_SETTING: TypedDocumentNode<{
  getGlobalSetting: GlobalSettingModel
}> = gql`
  query GetGlobalSetting {
    getGlobalSetting {
      ...GlobalSettingFragment
    }
  }
  ${GLOBAL_SETTING_FRAGMENT}
`

export const UPDATE_GLOBAL_SETTING_BY_ID: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateGlobalSettingInput>
> = gql`
  mutation UpdateGlobalSettingById($input: UpdateGlobalSettingInput!) {
    updateGlobalSettingById(input: $input) {
      ...GlobalSettingFragment
    }
  }
  ${GLOBAL_SETTING_FRAGMENT}
`
