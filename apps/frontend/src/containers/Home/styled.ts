import breakpoints from 'src/styled/breakpoints'
import styled from 'styled-components'

export const HomeContainer = styled.section`
  position: relative;
`

export const MottoSocialMediaBar = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`

export const HomeMain = styled.section`
  margin: 0 auto;
  max-width: 59rem;
  text-align: center;

  @media only screen and ${breakpoints.device.laptop} {
    max-width: 100%;
    margin-top: 1rem;
    padding: 0 1rem;
  }
`

export const CoverWrapper = styled.div`
  position: relative;

  @media only screen and ${breakpoints.device.laptop} {
    display: none;
  }
`

export const Status = styled.p`
  margin-bottom: 1rem;
  height: calc(1.5rem + env(safe-area-inset-bottom));
`
