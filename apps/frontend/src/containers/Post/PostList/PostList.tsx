import { useLazyQuery, useQuery } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import ImageHeader from 'src/components/ImageHeader/ImageHeader'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'
import PostCard from '../components/PostCard/PostCard'
import PostCardSkeleton from '../components/PostCardSkeleton/PostCardSkeleton'
import PostListStatus from '../components/PostListStatus/PostLIstStatus'
import TagCloud from '../components/TagCloud/TagCloud'
import Top7PVPosts from '../components/Top7PVPosts/Top7PVPosts'
import { GET_ALL_TAGS, GET_TOP_PV_POSTS, POSTS } from '../typeDefs'
import {
  GetAllTagsQuery,
  GetTopPVPostsQuery,
  GetTopPVPostsVars,
  PostQuery,
  PostVars
} from '../types'
import { PostContent, PostItemContainer } from './styled'

const PostList: FC = () => {
  const {
    query: { tag: searchTag }
  } = useRouter()

  const [page, setPage] = useState(1)

  const [getPosts, { data: posts }] = useLazyQuery<PostQuery, PostVars>(POSTS, {
    notifyOnNetworkStatusChange: true
  })

  const { data: topPVPosts } = useQuery<GetTopPVPostsQuery, GetTopPVPostsVars>(
    GET_TOP_PV_POSTS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        limit: 7
      }
    }
  )

  const { data: tagCloud } = useQuery<GetAllTagsQuery>(GET_ALL_TAGS, {
    notifyOnNetworkStatusChange: true
  })

  const fetchPosts = useCallback(
    (currPage = 1, tag?: string) => {
      getPosts({
        variables: {
          input: {
            page: currPage,
            pageSize: 10,
            tag
          }
        }
      })
    },
    [getPosts]
  )

  // @ts-ignore
  const handlePageChange = (e: ChangeEvent<unknown>, val: number) => {
    setPage(val)
    fetchPosts(val, searchTag as string)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    setPage(1)
    fetchPosts(1, searchTag as string)
  }, [searchTag, fetchPosts])

  return (
    <>
      <ImageHeader title="Tech and Poems." imageUrl="/blog_page_header.jpg" />

      <PostContent>
        <PostItemContainer>
          {searchTag && (
            <PostListStatus
              searchTag={searchTag as string}
              postsLength={posts && posts.posts.items.length}
              fetchPosts={fetchPosts}
            />
          )}

          {!posts ? (
            <SkeletonIterator
              count={5}
              skeletonComponent={<PostCardSkeleton />}
            />
          ) : (
            posts.posts.items.map((post) => (
              <PostCard post={post} key={post._id} />
            ))
          )}

          {posts && posts.posts.items.length !== 0 && (
            <Pagination
              count={
                !posts ? 0 : Math.ceil(posts.posts.total / posts.posts.pageSize)
              }
              color="primary"
              variant="outlined"
              page={page}
              onChange={handlePageChange}
            />
          )}
        </PostItemContainer>

        <div>
          <Top7PVPosts topPVPosts={topPVPosts} />
          <TagCloud tagCloud={tagCloud ? tagCloud.getAllTags.tags : []} />
        </div>
      </PostContent>
    </>
  )
}

export default PostList
