import { FC } from 'react'
import { ThemeMode } from 'src/hooks/useDarkMode'
import { SVG_SPRITE } from 'src/shared/constants'
import breakpoints from 'src/styled/breakpoints'
import { flexMixin, transitionMixin } from 'src/styled/mixins'
import styled from 'styled-components'

interface Props {
  theme: string
  onToggle: () => void
}

interface ButtonProps {
  readonly $lightTheme: boolean
}

const ToggleContainer = styled.button`
  position: fixed;
  top: 0.75rem;
  right: 2.4rem;
  ${flexMixin('space-between')}
  width: 8rem;
  height: 3rem;
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 3rem;
  cursor: pointer;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.fixed};

  @media only screen and ${breakpoints.device.laptop} {
    display: none;
  }
`

const SVG = styled.svg<ButtonProps>`
  width: 2rem;
  ${transitionMixin('all', 300, 'linear')}

  &:first-child {
    transform: ${({ $lightTheme }) =>
      !$lightTheme ? 'translateY(-55px)' : 'translateY(0)'};
  }

  &:nth-child(2) {
    transform: ${({ $lightTheme }) =>
      !$lightTheme ? 'translateY(0)' : 'translateY(-55px)'};
  }
`

export const ToggleContainerForMobile = styled.div`
  display: none;

  @media only screen and ${breakpoints.device.laptop} {
    display: block;
    position: fixed;
    left: calc(50% - 1rem);
    bottom: 3.3rem;
    text-align: center;
    z-index: ${({ theme }) => theme.zIndex.overlay};
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`

const ToggleTheme: FC<Props> = ({ theme, onToggle }) => {
  return (
    <>
      <ToggleContainer onClick={() => onToggle()}>
        <SVG $lightTheme={theme === 'light'}>
          <use xlinkHref={SVG_SPRITE.sun} />
        </SVG>
        <SVG $lightTheme={theme === 'light'}>
          <use xlinkHref={SVG_SPRITE.moon} />
        </SVG>
      </ToggleContainer>

      <ToggleContainerForMobile onClick={() => onToggle()}>
        <svg>
          <use
            xlinkHref={
              theme === ThemeMode.LIGHT ? SVG_SPRITE.sun2 : SVG_SPRITE.moon2
            }
          />
        </svg>
      </ToggleContainerForMobile>
    </>
  )
}

export default ToggleTheme
