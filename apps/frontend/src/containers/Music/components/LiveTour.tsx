import Carousel from 'nuka-carousel'
import { FC } from 'react'
import { formatDate } from 'src/shared/utils'
import styled from 'styled-components'
import { ILiveTour } from '../types'

const LiveTourContent = styled.div`
  position: relative;
  height: 38rem;
`

const LiveTourMeta = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  padding: 2rem 3rem;
  width: 100%;
  height: 10rem;
  background: ${({ theme }) => theme.background.blurCard};
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Date = styled.time`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.pink};
`

const Title = styled.p`
  padding: 1rem 0 0.5rem;
  color: ${({ theme }) => theme.text.header};
  font-size: 1.8rem;
`

interface Props {
  liveTours: ILiveTour[]
}

const LiveTour: FC<Props> = ({ liveTours }) => {
  return (
    // @ts-expect-error TODO:
    <Carousel
      autoplay
      autoplayInterval={2000}
      transitionMode="fade"
      wrapAround
      withoutControls
    >
      {liveTours.map((liveTour) => {
        const { _id, posterUrl, title, showTime } = liveTour
        return (
          <LiveTourContent key={_id}>
            <Img src={posterUrl} alt={title} />

            <LiveTourMeta>
              <Date>{formatDate(showTime)}</Date>
              <Title>{title}</Title>
            </LiveTourMeta>
          </LiveTourContent>
        )
      })}
    </Carousel>
  )
}

export default LiveTour
