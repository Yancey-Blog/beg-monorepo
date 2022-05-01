import React, { FC, HTMLAttributes, ReactNode } from 'react'
import InfiniteScroll from './InfiniteScroll'
import SkeletonIterator from './SkeletonIterator'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactNode
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = ({ children }) => {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>
}

export { InfiniteScroll, SkeletonIterator }
