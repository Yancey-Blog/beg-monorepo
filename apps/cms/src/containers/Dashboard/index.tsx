import { useQuery } from '@apollo/client'
import { Paper } from '@mui/material'
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
        <Paper className={classes.serverStatusWrapper}>
          <iframe
            className={classes.serverStatusItem}
            src="https://grafana.yanceyleo.com/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1752663542242&to=1752749942242&timezone=browser&var-DS_PROMETHEUS=ceqp24hd2d1q8c&var-job=node_exporter&var-nodename=548b83124228&var-node=node_exporter:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=light&panelId=323&__feature.dashboardSceneSolo"
            width="100%"
            height="200"
          />
        </Paper>
        <Paper className={classes.serverStatusWrapper}>
          <iframe
            className={classes.serverStatusItem}
            src="https://grafana.yanceyleo.com/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1752663602266&to=1752750002266&timezone=browser&var-DS_PROMETHEUS=ceqp24hd2d1q8c&var-job=node_exporter&var-nodename=548b83124228&var-node=node_exporter:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=light&panelId=20&__feature.dashboardSceneSolo"
            width="100%"
            height="200"
          />
        </Paper>
        <Paper className={classes.serverStatusWrapper}>
          <iframe
            className={classes.serverStatusItem}
            src="https://grafana.yanceyleo.com/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1752663602266&to=1752750002266&timezone=browser&var-DS_PROMETHEUS=ceqp24hd2d1q8c&var-job=node_exporter&var-nodename=548b83124228&var-node=node_exporter:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=light&panelId=155&__feature.dashboardSceneSolo"
            width="100%"
            height="200"
          />
        </Paper>
        <Paper className={classes.serverStatusWrapper}>
          <iframe
            className={classes.serverStatusItem}
            src="https://grafana.yanceyleo.com/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1752663602266&to=1752750002266&timezone=browser&var-DS_PROMETHEUS=ceqp24hd2d1q8c&var-job=node_exporter&var-nodename=548b83124228&var-node=node_exporter:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=light&panelId=16&__feature.dashboardSceneSolo"
            width="100%"
            height="200"
          />
        </Paper>
      </div>
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