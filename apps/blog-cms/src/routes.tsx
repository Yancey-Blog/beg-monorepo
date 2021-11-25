import { ReactElement } from 'react'
import {
  Dashboard,
  Home,
  Headset,
  PostAdd,
  Settings
} from '@mui/icons-material'
import { Roles } from 'src/shared/types'

export interface Route {
  name: string
  path: string
  icon: ReactElement
  component?: string
  isExternalLink?: boolean
  routes?: RouteChildren[]
  roles?: Roles[]
}

export interface RouteChildren extends Omit<Route, 'icon'> {
  hideInMenu?: boolean
}

export interface MappedRoute {
  path: string
  component: string
  roles?: Roles[]
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
    component: 'DashBoard/DashBoard',
    roles: [Roles.ADMIN]
  },
  {
    name: 'Home',
    path: '/home',
    icon: <Home />,
    routes: [
      {
        name: 'Announcement',
        path: '/announcement',
        component: 'Home/Announcement/Announcement',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Cover',
        path: '/cover',
        component: 'Home/Cover/Cover',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Motto',
        path: '/motto',
        component: 'Home/Motto/Motto',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Open Source',
        path: '/open-source',
        component: 'Home/OpenSource/OpenSource',
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Music',
    path: '/music',
    icon: <Headset />,
    routes: [
      {
        name: 'Best Album',
        path: '/best-album',
        component: 'Music/BestAlbum/BestAlbum',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Live Tour',
        path: '/live-tour',
        component: 'Music/LiveTour/LiveTour',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Player',
        path: '/player',
        component: 'Music/Player/Player',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Yancey Music',
        path: '/yancey-music',
        component: 'Music/YanceyMusic/YanceyMusic',
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Post',
    path: '/post',
    icon: <PostAdd />,
    component: 'Post/PostList',
    roles: [Roles.ADMIN],
    routes: [
      {
        name: 'Post Editor',
        path: '/post/edit',
        component: 'Post/PostEditor',
        hideInMenu: true,
        roles: [Roles.ADMIN]
      }
    ]
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings />,
    routes: [
      {
        name: 'Profile',
        path: '/settings/profile',
        component: 'Settings/Profile/Profile',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Account',
        path: '/settings/account',
        component: 'Settings/Account/Account',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Security',
        path: '/settings/security',
        component: 'Settings/Security/Security',
        roles: [Roles.ADMIN]
      },
      {
        name: 'Global Config',
        path: '/settings/global-config',
        component: 'Settings/GlobalConfig/GlobalConfig',
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
      component: component as string,
      roles
    })

    if (routes) {
      routes.forEach((routeChild) => {
        if (!routeChild.isExternalLink) {
          routers.push({
            path: routeChild.path,
            component: routeChild.component as string,
            roles: routeChild.roles
          })
        }
      })
    }
  })

  return routers
}

export default routes
