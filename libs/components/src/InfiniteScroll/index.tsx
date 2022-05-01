import React, { FC, useState, useRef, useEffect, RefObject, ReactNode } from 'react'
import throttle from 'lodash.throttle'

interface Props {
  onBottomHit: () => void
  isLoading: boolean
  hasMoreData: boolean
  loadOnMount: boolean
  children: ReactNode
}

function isBottom(ref: RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight
}

const InfiniteScroll: FC<Props> = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  loadOnMount,
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollHandler = throttle(() => {
    if (!isLoading && hasMoreData && isBottom(contentRef)) {
      onBottomHit()
    }
  }, 100)

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit()
      setInitialLoad(false)
    }
  }, [onBottomHit, loadOnMount, initialLoad])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler, {
      passive: true
    })

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [onBottomHit, isLoading, hasMoreData, scrollHandler])

  return <div ref={contentRef}>{children}</div>
}

export default InfiniteScroll
