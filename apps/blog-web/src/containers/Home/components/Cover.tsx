import { FC } from 'react'
import styled from 'styled-components'
import LazyLoadImage from 'src/components/LazyLoadImage/LazyLoadImage'
import { ICover } from '../types'

const Covers = styled.figure`
  position: relative;
  margin-bottom: 3.2rem;
  width: 100vw;
  height: 100vh;
  background: url(${(props: { coverUrl: string }) => props.coverUrl}) center
    center no-repeat;
  background-size: cover;
  background-attachment: fixed;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('images/dot.png');
    background-repeat: repeat;
    opacity: 0.5;
  }
`

interface Props {
  data: ICover[]
}

const Cover: FC<Props> = ({ data }) => (
  <Covers coverUrl={data && data[0]?.coverUrl} />
)

export default Cover
