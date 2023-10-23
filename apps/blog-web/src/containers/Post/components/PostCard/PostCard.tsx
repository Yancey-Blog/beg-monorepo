import { FC } from 'react'
import Link from 'next/link'
import { formatDate } from 'src/shared/utils'
import { SVG_SPRITE } from 'src/shared/constants'
import {
  PostCardWrapper,
  PosterImg,
  SummaryWrapper,
  ReleasedAt,
  SVG,
  Title,
  Meta,
  MetaItem,
  Summary,
  ReadMoreSVG
} from './styled'
import { IPostItem } from '../../types'

interface Props {
  post: IPostItem
}

const PostCard: FC<Props> = ({ post }) => {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post

  return (
    <PostCardWrapper>
      <Link href={`/post/${_id}`} passHref>
        <PosterImg src={posterUrl} alt={title}/>
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
