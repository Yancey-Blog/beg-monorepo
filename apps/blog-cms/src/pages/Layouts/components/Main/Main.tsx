import { FC, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { mapRoutes } from 'src/routes'
import NotFound from 'src/components/NotFound/NotFound'
import Loading from 'src/components/Loading/InstagramLoading'
import useStyles from './styles'

const routes = mapRoutes()
const loadableComponents = routes.map((route) => ({
  ...route,
  component: lazy(
    () =>
      import(/* webpackPrefetch: true */ `src/containers/${route.component}`)
  )
}))

const Main: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      <Routes>
        {loadableComponents.map((route) => {
          const Comp = route.component
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <Comp />
                </Suspense>
              }
            />
          )
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default Main
