import { IPostItem } from 'src/containers/Post/types'

export interface PostFilterProps {
  id: string
  isFetching: boolean
  posts: IPostItem[]
  fetchPosts: (title: string) => void
}

export interface IGlobalSetting {
  _id: string
  releasePostId: string
  cvPostId: string
  isGrayTheme: boolean
  createdAt: string
  updatedAt: string
}
