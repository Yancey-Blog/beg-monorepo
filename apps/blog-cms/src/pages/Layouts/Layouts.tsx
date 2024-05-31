import { FC, useState } from 'react'
import classNames from 'classnames'
import useStyles from './styles'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Mains from './components/Main/Main'
import Footer from './components/Footer/Footer'
import useSSO from 'src/hooks/useSSO'
import { UserInfo } from 'src/types/userInfo'

const Layouts: FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const keycloak = useSSO()

  const handleDrawerChange = () => {
    setOpen(!open)
  }

  if (!keycloak?.authenticated) {
    return null
  }

  return (
    <div className={classes.layouts}>
      <Drawer
        open={open}
        isFetching={false}
        userInfo={keycloak.userInfo as UserInfo}
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
          isFetching={false}
          userInfo={keycloak.userInfo as UserInfo}
          logout={keycloak.logout}
        />
        <Mains />
        <Footer />
      </section>
    </div>
  )
}

export default Layouts
