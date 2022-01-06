import { FC, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'
import { initGA, logPageView } from 'src/shared/analytics'
import { BACK_TO_TOP_THRESHOLD } from 'src/shared/constants'
import SVGSprite from 'src/components/SVGSprite/SVGSprite'
import AlgoliaSearchBox from 'src/containers/Post/components/AlgoliaSearchBox/AlgoliaSearchBox'
import { GET_GLOBAL_SETTING } from 'src/containers/GlobalSetting/typeDefs'
import { GlobalSettingQuery } from 'src/containers/GlobalSetting/types'
import Head from 'src/components/Head/Head'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Nav from './components/Nav/Nav'
import BackToTop from './components/BackToTop/BackToTop'
import { Layouts, Main } from './styled'

const initialGlobalSetting = {
  cvPostId: '',
  releasePostId: '',
  isGrayTheme: false
}

interface Props {
  title?: string
}

const Player = dynamic(import('src/containers/Music/components/Player'), {
  ssr: false
})

const Layout: FC<Props> = ({ title, children }) => {
  const router = useRouter()
  const { data } = useQuery<GlobalSettingQuery>(GET_GLOBAL_SETTING)
  const [scrollTopCount, setScrollTopCount] = useState(0)

  const scrollTopCountHandler = throttle(() => {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    setScrollTopCount(top)
  }, 100)

  useEffect(() => {
    document.addEventListener('scroll', scrollTopCountHandler, {
      passive: true
    })

    return () => {
      document.removeEventListener('scroll', scrollTopCountHandler)
    }
  }, [scrollTopCountHandler])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window !== undefined) {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      } else {
        logPageView()
      }
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      NProgress.start()
    })
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [router.events])

  return (
    <Layouts>
      <Head title={title} />
      <Header
        globalSetting={data ? data.getGlobalSetting : initialGlobalSetting}
      />
      <Main>{children}</Main>
      <Footer
        globalSetting={data ? data.getGlobalSetting : initialGlobalSetting}
      />
      <Nav />
      <SVGSprite />
      <BackToTop isShowCat={scrollTopCount >= BACK_TO_TOP_THRESHOLD} />
      <Player />
      <AlgoliaSearchBox />
    </Layouts>
  )
}

export default Layout
