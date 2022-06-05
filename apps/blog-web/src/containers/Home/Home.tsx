import { FC, ComponentType, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Props as HomePageProps } from 'src/pages/index'
import { isAnniversary } from 'src/shared/utils'
import {
  HomeContainer,
  MottoSocialMediaBar,
  HomeMain,
  CoverWrapper
} from './styled'
import Announcement from './components/Announcement'
import Motto from './components/Motto'
import OpenSource from './components/OpenSource'
import Cover from './components/Cover'
import PostList from './components/PostList'
import Slogan from './components/Slogan'

export interface Props {
  data: HomePageProps
}

// @ts-ignore
let FireWorksComponent = null

if (isAnniversary()) {
  FireWorksComponent = dynamic(
    () => import('src/components/Activities/Fireworks/Fireworks')
  )
}

const Home: FC<Props> = ({ data }) => {
  return (
    <HomeContainer>
      {
        // @ts-ignore
        FireWorksComponent && <FireWorksComponent />
      }
      <CoverWrapper>
        <Cover data={data.covers} />
        <MottoSocialMediaBar>
          <Slogan />
          <Motto data={data.mottos} />
        </MottoSocialMediaBar>
      </CoverWrapper>
      <HomeMain>
        <Announcement data={data.announcements} />
        <OpenSource data={data.openSources} />
        <PostList data={data.posts} />
      </HomeMain>
    </HomeContainer>
  )
}

export default Home
