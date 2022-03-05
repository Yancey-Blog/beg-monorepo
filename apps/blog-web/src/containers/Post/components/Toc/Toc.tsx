import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'src/containers/Post/PostDetail/styled'
import {
  initialTocbot,
  refreshTocbot,
  destroyTocbot
} from 'src/containers/Post/PostDetail/utils'

const Toc: FC = () => {
  const router = useRouter()

  useEffect(() => {
    initialTocbot()
    refreshTocbot()

    return () => {
      destroyTocbot()
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => refreshTocbot())
  }, [router.events])

  return <Menu className="postMenu" />
}

export default Toc
