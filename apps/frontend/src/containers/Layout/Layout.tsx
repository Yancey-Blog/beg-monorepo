import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { FC, useEffect } from 'react'
import Head from 'src/components/Head/Head'
import SVGSprite from 'src/components/SVGSprite/SVGSprite'
import { GET_GLOBAL_SETTING } from 'src/containers/GlobalSetting/typeDefs'
import { GlobalSettingQuery } from 'src/containers/GlobalSetting/types'
import AlgoliaSearchBox from 'src/containers/Post/components/AlgoliaSearchBox/AlgoliaSearchBox'
import { initGA, logPageView } from 'src/shared/analytics'
import BackToTop from './components/BackToTop/BackToTop'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import { Layouts, Main } from './styled'

const initialGlobalSetting = {
  cvPostId: '',
  releasePostId: '',
  isGrayTheme: false
}

interface Props {
  title?: string
  children?: any // TODO: fix this
}

const Layout: FC<Props> = ({ title, children }) => {
  const router = useRouter()
  const { data } = useQuery<GlobalSettingQuery>(GET_GLOBAL_SETTING)

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

  useEffect(() => {
    if (data?.getGlobalSetting?.isGrayTheme) {
      document.body.style.cssText = 'filter: grayscale(1); overflow-x: hidden'
    }
  }, [data?.getGlobalSetting?.isGrayTheme])

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
      <BackToTop />
      <AlgoliaSearchBox />
    </Layouts>
  )
}

export default Layout
