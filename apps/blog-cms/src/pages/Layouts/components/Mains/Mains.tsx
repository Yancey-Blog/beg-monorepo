import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { useKeycloak } from '@react-keycloak/web'
import { mapRoutes } from 'src/routes'
import NotFound from 'src/components/NotFound/NotFound'
import Loading from 'src/components/Loading/InstagramLoading'
import { Roles } from 'src/types/roles'
import useStyles from './styles'

const routeList = mapRoutes()

const Mains: FC = () => {
  const classes = useStyles()

  const { initialized, keycloak } = useKeycloak()
  if (!initialized) {
    return (
      <h1
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        正在校验是否已登录中...
      </h1>
    )
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

  const Tips = () => (
    <h1
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      未登录, 滚去登录
    </h1>
  )

  // @ts-ignore
  window.keycloak = keycloak

  return (
    <main className={classes.main}>
      <Switch>
        {routeList.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={
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
                : () => Tips()
            }
          />
        ))}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  )
}

export default Mains
