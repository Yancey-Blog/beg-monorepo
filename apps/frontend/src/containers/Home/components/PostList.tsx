import {
  PostItemModel,
  PostModel
} from '@repo/graphql-types/__generated__/graphql'
import { ASTNode, print } from 'graphql'
import { FC, useState } from 'react'
import InfiniteScroll from 'src/components/InfiniteScroll/InfiniteScroll'
import PostCard from 'src/containers/Post/components/PostCard/PostCard'
import { POSTS } from 'src/containers/Post/typeDefs'
import { SVG_SPRITE } from 'src/shared/constants'
import { Status } from '../styled'
import SubTitle from './SubTitle'

interface Props {
  data: PostModel
}

const PostList: FC<Props> = ({ data: ssrData }) => {
  const [data, setData] = useState<PostItemModel[]>(ssrData.items)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: print(POSTS as ASTNode),
        variables: {
          input: {
            page,
            pageSize: 10
          }
        }
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const { items, total, page: currentPage } = result.data.posts
        setData([...data, ...items])
        if (Math.ceil(total / 10) === currentPage) {
          setHasMore(false)
          return
        }
        setPage(currentPage + 1)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <InfiniteScroll
      hasMoreData={hasMore}
      isLoading={loading}
      onBottomHit={fetchData}
      loadOnMount={false}
    >
      <SubTitle icon={SVG_SPRITE.new} title="The Latest!" />

      <>
        {data.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </>

      <Status>
        {data.length > 0 && hasMore ? '正在加载中...' : '没有更多了...'}
      </Status>
    </InfiniteScroll>
  )
}

export default PostList
