import type { NextPage } from 'next'
import Layout from 'src/containers/Layout/Layout'
import HomeContainer from 'src/containers/Home/Home'

const Home: NextPage = () => (
  <Layout>
    <HomeContainer />
  </Layout>
)

export default Home
