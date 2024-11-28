import classNames from 'classnames'
import { FC, useState } from 'react'
import SSOStatus from 'src/components/SSOStatus/SSOStatus'
import useSSO from 'src/hooks/useSSO'
import Drawer from './components/Drawer/Drawer'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Mains from './components/Main/Main'
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
      <Drawer open={open} isFetching={false} userInfo={keycloak.profile} />
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
