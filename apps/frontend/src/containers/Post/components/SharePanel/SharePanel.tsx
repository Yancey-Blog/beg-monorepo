import { useMutation } from '@apollo/client'
import Router from 'next/router'
import { FC, useState } from 'react'
import { TwitterShareButton } from 'react-share'
import { UPDATE_LIKE } from 'src/containers/Post/typeDefs'
import { SVG_SPRITE } from 'src/shared/constants'
import breakpoints from 'src/styled/breakpoints'
import { flexMixin } from 'src/styled/mixins'
import styled from 'styled-components'

const SharePanelWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 2rem;

  .postTwitterShareBtn {
    width: 1.8rem;
    height: 1.8rem;
    margin-bottom: 1.2rem;
    cursor: pointer;
  }

  @media only screen and ${breakpoints.device.laptop} {
    display: none;
  }
`

const Svg = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`

const LikeSvg = styled(Svg)`
  margin-right: 0.8rem;
  fill: ${({ theme }) => theme.text.primary};
`

const Like = styled.div`
  ${flexMixin()}
`

interface Props {
  id: string
  title: string
  postUrl: string
  like: number
  handleLikeChange: (newLike: number) => void
}

const SharePanel: FC<Props> = ({
  id,
  title,
  like,
  postUrl,
  handleLikeChange
}) => {
  const [likeStatus, setLikeStatus] = useState(false)

  const [updateLike] = useMutation(UPDATE_LIKE, {
    onError() {
      setLikeStatus(false)
      handleLikeChange(like - 1)
    }
  })

  const onSubmit = () => {
    if (!likeStatus) {
      handleLikeChange(like + 1)
      setLikeStatus(true)
      updateLike({
        variables: { id }
      })
    }
  }

  Router.events.on('routeChangeStart', () => {
    setLikeStatus(false)
  })
  return (
    <SharePanelWrapper>
      <TwitterShareButton
        url={postUrl}
        title={title}
        className="postTwitterShareBtn"
      >
        <Svg>
          <use xlinkHref={SVG_SPRITE.twitter} />
        </Svg>
      </TwitterShareButton>

      <Like>
        <LikeSvg onClick={onSubmit}>
          <use
            xlinkHref={likeStatus ? SVG_SPRITE.heart : SVG_SPRITE.emptyHeart}
          />
        </LikeSvg>
        <span>
          {like} {`Like${like <= 1 ? '' : 's'}`}
        </span>
      </Like>
    </SharePanelWrapper>
  )
}

export default SharePanel
