import classNames from 'classnames'
import { FC, useState } from 'react'
import SSOStatus from 'src/components/SSOStatus'
import useSSO from 'src/hooks/useSSO'
import Drawer from './components/Drawer'
import Footer from './components/Footer'
import Header from './components/Header'
import Mains from './components/Main'
import useStyles from './styles'

const Layouts: FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const keycloak = useSSO()

  const handleDrawerChange = () => {
    setOpen(!open)
  }

  if (!keycloak?.authenticated) {
    return <SSOStatus />
  }

  return (
    <div className={classes.layouts}>
      <Drawer
        open={open}
        isFetching={!keycloak?.authenticated}
        userInfo={keycloak.profile}
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
          isFetching={!keycloak?.authenticated}
          userInfo={keycloak.profile}
          logout={keycloak.logout}
        />
        <Mains />
        <Footer open={open} />
      </section>
    </div>
  )
}

export default Layouts
