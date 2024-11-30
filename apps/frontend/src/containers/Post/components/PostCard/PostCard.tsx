import { PostItemModel } from '@repo/graphql-types/__generated__/graphql'
import Link from 'next/link'
import { FC } from 'react'
import { SVG_SPRITE } from 'src/shared/constants'
import { formatDate } from 'src/shared/utils'
import {
  Meta,
  MetaItem,
  PostCardWrapper,
  PosterImg,
  ReadMoreSVG,
  ReleasedAt,
  Summary,
  SummaryWrapper,
  SVG,
  Title
} from './styled'

interface Props {
  post: PostItemModel
}

const PostCard: FC<Props> = ({ post }) => {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post

  return (
    <PostCardWrapper>
      <Link href={`/post/${_id}`} passHref>
        <PosterImg src={posterUrl} alt={title} />
      </Link>
      <SummaryWrapper>
        <ReleasedAt>
          <SVG className="timesvg">
            <use xlinkHref={SVG_SPRITE.clock} />
          </SVG>
          Released At {formatDate(createdAt)}
        </ReleasedAt>

        <Link href={`/post/${_id}`}>
          <Title>{title}</Title>
        </Link>

        <Meta>
          <MetaItem>
            <SVG>
              <use xlinkHref={SVG_SPRITE.eye} />
            </SVG>
            {pv} PV
          </MetaItem>
          <MetaItem>
            <SVG>
              <use xlinkHref={SVG_SPRITE.like} />
            </SVG>
            {like} Likes
          </MetaItem>
          <MetaItem>
            <SVG>
              <use xlinkHref={SVG_SPRITE.folder} />
            </SVG>
            <Link href={`/post?tag=${tags[0]}`}>{tags[0]}</Link>
          </MetaItem>
        </Meta>

        <Summary>{summary}</Summary>

        <Link href={`/post/${_id}`}>
          <ReadMoreSVG>
            <use xlinkHref={SVG_SPRITE.more} />
          </ReadMoreSVG>
        </Link>
      </SummaryWrapper>
    </PostCardWrapper>
  )
}

export default PostCard
