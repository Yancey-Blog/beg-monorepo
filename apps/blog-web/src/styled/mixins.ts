import { css, Keyframes } from 'styled-components'

export const flexMixin = (
  justifyContent = 'center',
  alignItem = 'center',
) => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItem};
`

export const backgroundMixin = () => css`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`

export const onePixel = (color = '#000000', zIndex = -1) => css`
  position: relative;

  &::after {
    position: absolute;
    content: '';
    top: -50%;
    bottom: -50%;
    left: -50%;
    right: -50%;
    transform: scale(0.5);
    border-top: 1px solid ${color};
    z-index: ${zIndex};
  }
`

export const transitionMixin = (
  property: string,
  delay = 300,
  timingFunction = 'ease',
) => css`
  transition: ${property} ${delay}ms ${timingFunction};
`

export const animationMixin = (
  name: Keyframes,
  delay: number,
  timingFunction: string,
  iterationCount: string,
) =>
  css`
    animation: ${name} ${delay}ms ${timingFunction} ${iterationCount};
  `

export const noUserSelectMixin = () =>
  css`
    user-select: none;
  `

export const singleLineEllipsisMixins = () => css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
