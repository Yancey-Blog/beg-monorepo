import { useLazyQuery, useQuery } from '@apollo/client'
import { FC } from 'react'
import Loading from 'src/components/Loading'
import { POSTS } from 'src/containers/Post/typeDefs'
import { Query as PostsQuery } from 'src/containers/Post/types'
import SettingWrapper from '../components/SettingWrapper'
import SettingsHeader from '../components/SettingsHeader'
import CVPicker from './components/CVPicker'
import GrayTheme from './components/GrayTheme'
import ReleasePicker from './components/ReleasePicker'
import { GLOBAL_SETTING } from './typeDefs'

const GlobalConfig: FC = () => {
  const [fetchPostsByPage, { loading: isFetchingPosts, data: postsData }] =
    useLazyQuery<PostsQuery>(POSTS, {
      notifyOnNetworkStatusChange: true
    })

  const fetchPosts = (title: string) => {
    fetchPostsByPage({
      variables: {
        input: {
          page: 1,
          pageSize: 10,
          title
        }
      }
    })
  }

  const { loading: isFetching, data } = useQuery(GLOBAL_SETTING, {
    notifyOnNetworkStatusChange: true
  })

  return (
    <SettingWrapper>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <SettingsHeader
            title="Global Config"
            subTitle="Global configuration for Yancey Blog PC and Mobile"
          />

          <ReleasePicker
            id={data ? data.getGlobalSetting._id : ''}
            releasePostId={data ? data.getGlobalSetting.releasePostId : ''}
            isFetching={isFetchingPosts}
            fetchPosts={fetchPosts}
            posts={postsData ? postsData.getPostsForCMS.items : []}
          />
          <CVPicker
            id={data ? data.getGlobalSetting._id : ''}
            cvPostId={data ? data.getGlobalSetting.cvPostId : ''}
            isFetching={isFetchingPosts}
            fetchPosts={fetchPosts}
            posts={postsData ? postsData.getPostsForCMS.items : []}
          />
          <GrayTheme globalSettings={data?.getGlobalSetting} />
        </>
      )}
    </SettingWrapper>
  )
}

export default GlobalConfig
