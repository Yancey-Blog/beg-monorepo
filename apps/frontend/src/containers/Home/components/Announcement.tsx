import { FC } from 'react'
import { SVG_SPRITE } from 'src/shared/constants'
import breakpoints from 'src/styled/breakpoints'
import { flexMixin } from 'src/styled/mixins'
import styled from 'styled-components'
import { IAnnouncement } from '../types'

interface Props {
  data: IAnnouncement[]
}

const AnnouncementWrapper = styled.section`
  ${flexMixin('flex-start')}
  padding: 1.8rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text.secondary};
  background: ${({ theme }) => theme.background.secondary};
  border: 1px dashed;
  border-color: ${({ theme }) => theme.border};
  border-radius: 0.8rem;

  @media only screen and ${breakpoints.device.laptop} {
    display: none;
  }
`

const SVG = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
`

const Announcement: FC<Props> = ({ data }) => {
  return (
    <AnnouncementWrapper>
      <SVG>
        <use xlinkHref={SVG_SPRITE.announcement} />
      </SVG>
      {data[0]?.content}
    </AnnouncementWrapper>
  )
}

export default Announcement
