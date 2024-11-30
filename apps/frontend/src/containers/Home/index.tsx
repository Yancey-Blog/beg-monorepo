import { FC } from 'react'
import { Props as HomePageProps } from 'src/pages/index'
import Announcement from './components/Announcement'
import Cover from './components/Cover'
import Motto from './components/Motto'
import OpenSource from './components/OpenSource'
import PostList from './components/PostList'
import Slogan from './components/Slogan'
import {
  CoverWrapper,
  HomeContainer,
  HomeMain,
  MottoSocialMediaBar
} from './styled'

export interface Props {
  data: HomePageProps
}

const Home: FC<Props> = ({ data }) => {
  return (
    <HomeContainer>
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
