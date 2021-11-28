import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { useKeycloak } from '@react-keycloak/web'
import { UserInfo } from 'src/types/userInfo'
import useStyles from './styles'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Mains from './components/Mains/Mains'
import Footer from './components/Footer/Footer'

const Layouts: FC = () => {
  const classes = useStyles()
  const { initialized, keycloak } = useKeycloak()
  const [open, setOpen] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false)

  const handleDrawerChange = () => {
    setOpen(!open)
  }

  const getUserInfo = async () => {
    if (initialized && keycloak.authenticated) {
      setIsFetchingUserInfo(true)
      try {
        const userInfo = (await keycloak.loadUserInfo()) as UserInfo
        setUserInfo(userInfo)
      } finally {
        setIsFetchingUserInfo(false)
      }
    }
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, keycloak.authenticated])

  return (
    <div className={classes.layouts}>
      <Drawer
        open={open}
        isFetching={
          isFetchingUserInfo || !initialized || !keycloak.authenticated
        }
        userInfo={userInfo}
      />
      <section
        className={classNames(
          classes.mainWrapper,
          open ? classes.expand : classes.shrink
        )}
      >
        <Header
          open={open}
          handleDrawerChange={handleDrawerChange}
          isFetching={
            isFetchingUserInfo || !initialized || !keycloak.authenticated
          }
          userInfo={userInfo}
          logout={keycloak.logout}
        />
        <Mains />
        <Footer />
      </section>
    </div>
  )
}

export default Layouts
