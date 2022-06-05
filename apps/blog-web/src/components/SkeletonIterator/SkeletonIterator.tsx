import { FC, ReactNode, Fragment } from 'react'
import { randomSeries } from 'yancey-js-util'

interface Props {
  count: number
  skeletonComponent: ReactNode
}

const SkeletonIterator: FC<Props> = ({ count, skeletonComponent }) => {
  return (
    <Fragment>
      {Array.from({ length: count }, () => randomSeries(6)).map((val) => (
        <Fragment key={val}>{skeletonComponent}</Fragment>
      ))}
    </Fragment>
  )
}

export default SkeletonIterator
