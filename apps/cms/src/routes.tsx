import { ReactElement } from 'react'
import {
  Dashboard,
  Home,
  Headset,
  PostAdd,
  Settings
} from '@mui/icons-material'
import { Roles } from 'src/types/roles'
import { lazy } from 'react'
import { LazyExoticComponent, FC } from 'react'

export interface Route {
  name: string
  path: string
  icon: ReactElement
  component?: LazyExoticComponent<FC>
  isExternalLink?: boolean
  routes?: RouteChildren[]
  roles?: Roles[]
}

export interface RouteChildren extends Omit<Route, 'icon'> {
  hideInMenu?: boolean
}

export interface MappedRoute {
  path: string
  component?: LazyExoticComponent<FC>
  roles?: Roles[]
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
    component: lazy(() => import('src/containers/Dashboard/Dashboard')),
    roles: [Roles.ADMIN]
  },
  {
    name: 'Home',
    path: '/home',
    icon: <Home />,
    routes: [
      {
        name: 'Announcement',
        path: 'announcement',
        component: lazy(
          () => import('src/containers/Home/Announcement/Announcement')
        ),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Cover',
        path: 'cover',
        component: lazy(() => import('src/containers/Home/Cover/Cover')),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Motto',
        path: 'motto',
        component: lazy(() => import('src/containers/Home/Motto/Motto')),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Open Source',
        path: 'open-source',
        component: lazy(
          () => import('src/containers/Home/OpenSource/OpenSource')
        ),
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Music',
    path: 'music',
    icon: <Headset />,
    routes: [
      {
        name: 'Best Album',
        path: 'best-album',
        component: lazy(
          () => import('src/containers/Music/BestAlbum/BestAlbum')
        ),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Live Tour',
        path: 'live-tour',
        component: lazy(() => import('src/containers/Music/LiveTour/LiveTour')),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Player',
        path: 'player',
        component: lazy(() => import('src/containers/Music/Player/Player')),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Yancey Music',
        path: 'yancey-music',
        component: lazy(
          () => import('src/containers/Music/YanceyMusic/YanceyMusic')
        ),
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Post',
    path: 'post',
    icon: <PostAdd />,
    component: lazy(() => import('src/containers/Post/PostList')),
    roles: [Roles.ADMIN],
    routes: [
      {
        name: 'Post Editor',
        path: 'post/edit',
        component: lazy(() => import('src/containers/Post/PostEditor')),
        hideInMenu: true,
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Settings',
    path: 'settings',
    icon: <Settings />,
    routes: [
      {
        name: 'Profile',
        path: 'settings/profile',
        component: lazy(
          () => import('src/containers/Settings/Profile/Profile')
        ),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Account',
        path: 'settings/account',
        component: lazy(
          () => import('src/containers/Settings/Account/Account')
        ),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Security',
        path: 'settings/security',
        component: lazy(
          () => import('src/containers/Settings/Security/Security')
        ),
        roles: [Roles.ADMIN]
      },
      {
        name: 'Global Config',
        path: 'settings/global-config',
        component: lazy(
          () => import('src/containers/Settings/GlobalConfig/GlobalConfig')
        ),
        roles: [Roles.ADMIN]
      }
    ]
  }
]

export function mapRoutes() {
  const routers: MappedRoute[] = []

  routes.forEach(({ path, component, roles, routes }) => {
    routers.push({
      path,
      component,
      roles
    })

    if (routes) {
      routes.forEach((routeChild) => {
        if (!routeChild.isExternalLink) {
          routers.push({
            path: routeChild.path,
            component: routeChild.component,
            roles: routeChild.roles
          })
        }
      })
    }
  })

  return routers
}

export default routes
