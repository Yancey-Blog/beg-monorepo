import { FC, useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import { scrollToTop } from 'src/shared/utils'
import { BACK_TO_TOP_THRESHOLD } from 'src/shared/constants'
import { Cat } from './styled'

const BackToTop: FC = () => {
  const [showCat, setShowCat] = useState(false)

  const scrollTopCountHandler = throttle(() => {
    const top = document.documentElement.scrollTop || document.body.scrollTop

    if (top >= BACK_TO_TOP_THRESHOLD && !showCat) {
      setShowCat(true)
    }

    if (top < BACK_TO_TOP_THRESHOLD && showCat) {
      setShowCat(false)
    }
  }, 100)

  useEffect(() => {
    document.addEventListener('scroll', scrollTopCountHandler, {
      passive: true
    })

    return () => {
      document.removeEventListener('scroll', scrollTopCountHandler)
    }
  }, [scrollTopCountHandler])

  return <Cat onClick={scrollToTop} className={showCat ? 'showCat' : ''} />
}

export default BackToTop
