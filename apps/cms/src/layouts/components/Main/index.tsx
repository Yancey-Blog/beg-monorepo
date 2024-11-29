import { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from 'src/components/Loading/InstagramLoading'
import NotFound from 'src/components/NotFound'
import { mapRoutes } from 'src/routes'
import useStyles from './styles'

const routes = mapRoutes()

const Main: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      <Routes>
        {routes.map((route) => {
          const { component: LazyComponent } = route
          if (!LazyComponent) return

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <LazyComponent />
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
