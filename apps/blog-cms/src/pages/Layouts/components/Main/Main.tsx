import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import { useKeycloak } from '@react-keycloak/web'
import { mapRoutes } from 'src/routes'
import NotFound from 'src/components/NotFound/NotFound'
import Loading from 'src/components/Loading/InstagramLoading'
import SSOStatus, { Status } from 'src/components/SSOStatus/SSOStatus'
import { Roles } from 'src/types/roles'
import useStyles from './styles'

const routeList = mapRoutes()

const Main: FC = () => {
  const classes = useStyles()

  const { initialized, keycloak } = useKeycloak()
  if (!initialized) {
    return <SSOStatus status={Status.IsChecking} />
  }

  const isAutherized = (roles?: Roles[]) => {
    const needAuth = Array.isArray(roles) && roles.length !== 0
    if (!needAuth) return true
    return roles.some((role) => {
      const realm = keycloak.hasRealmRole(role)
      const resource = keycloak.hasResourceRole(role)
      return realm || resource
    })
  }

  return (
    <main className={classes.main}>
      <Routes>
        {routeList.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            children={
              isAutherized(route.roles)
                ? loadable(
                    () =>
                      import(
                        /* webpackPrefetch: true */ `src/containers/${route.component}`
                      ),
                    {
                      fallback: <Loading />
                    }
                  )
                : () => <SSOStatus status={Status.Fail} />
            }
          />
        ))}
        <Route path="*">
          <NotFound />
        </Route>
      </Routes>
    </main>
  )
}

export default Main
