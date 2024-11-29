import { wrench } from 'src/styled/animations'
import breakpoints from 'src/styled/breakpoints'
import {
  animationMixin,
  backgroundMixin,
  flexMixin,
  transitionMixin
} from 'src/styled/mixins'
import styled from 'styled-components'

export const NavBar = styled.nav`
  box-sizing: border-box;
  position: fixed;
  ${flexMixin('space-between')}
  width:100%;
  padding: 0 2.4rem;
  background: ${({ theme }) => theme.background.primary};
  box-shadow: 0 1px 40px -8px ${({ theme }) => theme.colors.fiveOpcityBlack};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  opacity: 0.9;
  ${transitionMixin('background', 250, 'linear')};

  @media only screen and ${breakpoints.device.laptop} {
    display: none;
  }
`

export const NavBarItem = styled.div`
  ${flexMixin('flex-start')}
  margin-right: 28.5rem;

  a {
    position: relative;
    ${flexMixin()}
    margin-left: 1.6rem;
    padding: 0 0.2rem;
    height: ${({ theme }) => theme.headerHeight};
    font-size: 1rem;
    color: ${({ theme }) => theme.text.primary};
    ${transitionMixin('color')}

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 0;
      height: 0.4rem;
      background: ${({ theme }) => theme.colors.orange};
      ${transitionMixin('width')}
    }

    svg {
      margin-right: 0.5rem;
      width: 1.1rem;
      height: 1.1rem;
      fill: ${({ theme }) => theme.text.primary};
      ${transitionMixin('fill')}
    }

    &:hover {
      color: ${({ theme }) => theme.colors.orange};
      ${transitionMixin('color')}

      &::after {
        width: 100%;
      }

      svg {
        fill: ${({ theme }) => theme.colors.orange};
        ${transitionMixin('fill')}
        ${animationMixin(wrench, 2000, 'ease', 'infinite')}
      }
    }
  }
`

export const Logo = styled.span`
  display: inline-block;
  width: 14.67rem;
  height: 2.93rem;
  background: url(${({ theme }) => theme.logo});
  cursor: pointer;
  ${backgroundMixin()}
`
