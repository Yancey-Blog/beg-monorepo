import { FC } from 'react'
import ErrorContainer from 'src/containers/Error/Error'
import Layout from 'src/containers/Layout/Layout'

const NotFound: FC = () => {
  return (
    <Layout title="Page Not Found | Yancey Inc.">
      <ErrorContainer statusCode={404} imageUrl="404.png" />
    </Layout>
  )
}

export default NotFound
