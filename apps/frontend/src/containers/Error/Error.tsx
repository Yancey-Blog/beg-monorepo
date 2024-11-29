import Link from 'next/link'
import { FC } from 'react'
import breakpoints from 'src/styled/breakpoints'
import { flexMixin } from 'src/styled/mixins'
import styled from 'styled-components'

interface ColorProps {
  is404Page: boolean
}

const ErrorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.headerHeight};
  min-height: 100vh;

  @media only screen and ${breakpoints.device.laptop} {
    min-height: auto;
    padding-top: ${({ theme }) => theme.headerHeightMobile};
  }
`

const ContentWrapper = styled.div`
  @media only screen and ${breakpoints.device.laptop} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Header = styled.div`
  ${flexMixin()};
  height: calc(50vh - ${({ theme }) => theme.headerHeight});

  @media only screen and ${breakpoints.device.laptop} {
    flex-direction: column;
  }
`

const Title = styled.h1<ColorProps>`
  margin-right: 4rem;
  font-size: 16rem !important;
  color: ${({ is404Page }) => (is404Page ? '#fef1da' : '#e5f8f2')};

  @media only screen and ${breakpoints.device.laptop} {
    margin-right: 0;
    font-size: 10rem !important;
    line-height: 1;
  }
`

const Tips = styled.p<ColorProps>`
  font-size: 3.6rem !important;
  color: ${({ is404Page }) => (is404Page ? '#a89888' : '#88a899')};

  @media only screen and ${breakpoints.device.laptop} {
    font-size: 2rem !important;
  }
`

const SubTips = styled(Tips)<ColorProps>`
  margin: 1.8rem 0;
  font-size: 2rem !important;
  font-weight: 300;

  @media only screen and ${breakpoints.device.laptop} {
    font-size: 1rem !important;
  }
`

const BackToHomeBtn = styled.button<ColorProps>`
  padding: 1rem 1.6rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ is404Page }) => (is404Page ? '#feb641' : '#00ba7c')};
  border: none;
  border-radius: 2rem;
  cursor: pointer;
`

const ErrorImg = styled.img`
  display: block;
  width: 100%;
  height: 50vh;
  object-fit: cover;
`

interface Props {
  statusCode: number
  imageUrl: string
}

const Error: FC<Props> = ({ statusCode, imageUrl }) => {
  const imgUrl = `${process.env.NEXT_PUBLIC_STATIC_FILE_URL}/${imageUrl}`
  const is404Page = statusCode === 404

  return (
    <ErrorWrapper>
      <Header>
        <Title is404Page={is404Page}>{statusCode}</Title>
        <ContentWrapper>
          <Tips is404Page={is404Page}>Oops, You found me!</Tips>
          <SubTips is404Page={is404Page}>
            {statusCode === 404
              ? 'You seem to have found a dead link!'
              : 'An error occurred on server!'}
          </SubTips>
          <Link href="/">
            <BackToHomeBtn is404Page={is404Page}>TAKE ME HOME</BackToHomeBtn>
          </Link>
        </ContentWrapper>
      </Header>
      <ErrorImg src={imgUrl} alt={statusCode.toString()} />
    </ErrorWrapper>
  )
}

export default Error
