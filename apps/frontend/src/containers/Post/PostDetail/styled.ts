import breakpoints from 'src/styled/breakpoints'
import { flexMixin } from 'src/styled/mixins'
import styled from 'styled-components'

export const PostDetailWrapper = styled.article`
  position: relative;
  margin: 10rem auto 0;

  @media only screen and ${breakpoints.device.laptop} {
    margin: 1rem;
  }
`

export const Poster = styled.img`
  ${flexMixin()}
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow:
    0 10px 15px -3px ${({ theme }) => theme.colors.oneOpcityBlack},
    0 4px 6px -2px ${({ theme }) => theme.colors.oneOpcityBlack};
`

export const Title = styled.h1`
  margin: 2rem 0;
  font-size: 2.4rem;
  line-height: 1.6;
  text-align: center;
`

export const Summary = styled.blockquote`
  margin: 2rem 0;
  padding: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text.base};
  background: ${({ theme }) => theme.background.summaryBg};
  border-left: 0.3rem solid ${({ theme }) => theme.colors.summaryBar};
  border-radius: 0.5rem;
`

export const Content = styled.article`
  max-width: 58rem;
  margin: 0 auto;

  h2 {
    margin: 2.5rem 0 1.25rem;
    font-size: 2rem;
  }

  h3 {
    margin: 1.875rem 0 1.25rem;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.65;

    code {
      background: ${({ theme }) => theme.background.inlineCode};
      font-size: 90%;
      border-radius: 0.4rem;
      padding: 0.2rem 0.4rem;
    }
  }

  pre {
    font-size: 90%;
    margin: 2rem 0;
    border-radius: 0.4rem;
    padding: 1rem !important;
    line-height: 1.5;
    background-color: rgb(40, 44, 52) !important;
  }

  img {
    display: block;
    margin: 0 auto 1rem;
  }

  iframe {
    margin: 2rem 0;
    height: 35rem;
  }

  table {
    display: inline-block;
    border-collapse: collapse;
    overflow: auto;
  }

  tr {
    &:nth-of-type(2n) {
      background-color: ${({ theme }) => theme.background.secondary};
    }
  }

  td,
  th {
    line-height: 1.4;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.8rem;

    @media only screen and ${breakpoints.device.laptop} {
      min-width: 6rem;
    }
  }

  th {
    font-weight: 700;
  }

  a {
    position: relative;
    color: ${({ theme }) => theme.colors.linkBase};

    &:hover {
      text-decoration: underline ${({ theme }) => theme.colors.linkBase};
    }
  }

  ul {
    padding-left: 2rem;
  }

  li {
    line-height: 1.6;
  }
`

export const ImageGroup = styled.figure`
  position: relative;
  display: block;
  margin: 3.5rem 0;
  text-align: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ImageAlt = styled.figcaption`
  display: inline-block;
  padding-bottom: 0.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text.secondary};
  border-bottom: 1px dashed ${({ theme }) => theme.text.secondary};
`

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto;
`
