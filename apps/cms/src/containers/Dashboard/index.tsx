import { useQuery } from '@apollo/client'
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  SubTitle,
  Title,
  Tooltip
} from 'chart.js'
import { FC } from 'react'
import {
  GET_ALL_TAGS,
  GET_POST_STATISTICS,
  GET_TOP_LIKE_POSTS,
  GET_TOP_PV_POSTS
} from '../Post/typeDefs'
import PostRankList from './components/PostRankList'
import PostStatistics from './components/PostStatistics'
import TagClouds from './components/TagClouds'
import useStyles from './styles'
import { PostRankListType } from './types'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  Title,
  SubTitle
)

const Dashboard: FC = () => {
  const classes = useStyles()

  const { loading: isFetchingTopPVPosts, data: topPVPosts } = useQuery(
    GET_TOP_PV_POSTS,
    {
      variables: { limit: 5 },
      notifyOnNetworkStatusChange: true
    }
  )

  const { loading: isFetchingTopLikePosts, data: topLikePosts } = useQuery(
    GET_TOP_LIKE_POSTS,
    {
      variables: { limit: 5 },
      notifyOnNetworkStatusChange: true
    }
  )

  const { loading: isFetchingAllTags, data: allTags } = useQuery(GET_ALL_TAGS, {
    notifyOnNetworkStatusChange: true
  })

  const { loading: isFechingPostStatistics, data: postStatistics } = useQuery(
    GET_POST_STATISTICS,
    {
      notifyOnNetworkStatusChange: true
    }
  )

  return (
    <section className={classes.dashboardWrapper}>
      <div className={classes.group}>
        <PostRankList
          type={PostRankListType.PV}
          topPosts={topPVPosts ? topPVPosts.getTopPVPosts : []}
          loading={isFetchingTopPVPosts}
        />

        <PostRankList
          type={PostRankListType.LIKE}
          topPosts={topLikePosts ? topLikePosts.getTopLikePosts : []}
          loading={isFetchingTopLikePosts}
        />

        <TagClouds
          tags={allTags ? allTags.getAllTags.tags : []}
          loading={isFetchingAllTags}
        />
      </div>

      <PostStatistics
        loading={isFechingPostStatistics}
        data={postStatistics ? postStatistics.getPostStatistics : []}
      />
    </section>
  )
}

export default Dashboard
