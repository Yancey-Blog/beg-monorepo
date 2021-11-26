import { FC, Fragment, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar, Skeleton } from '@mui/material'
import { Home, Face } from '@mui/icons-material'
import { useKeycloak } from '@react-keycloak/web'
import classNames from 'classnames'
import routes, { Route } from 'src/routes'
import { UserInfo } from 'src/types/userInfo'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'
import ChildItem from './components/ChildItem'
import ParentItem from './components/ParentItem'
import useStyles from './styles'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const classes = useStyles()
  const { initialized, keycloak } = useKeycloak()
  const { pathname } = useLocation()
  const [foldName, setfoldName] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false)

  const handleFoldNameChange = (name: string) => {
    setfoldName(foldName === name ? '' : name)
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

  const matchChilren = (routeList: Route[]) => {
    const currRoute = routeList.find(
      (route) =>
        route.routes &&
        route.routes.find((childRoute) => pathname.includes(childRoute.path))
    )
    currRoute && setfoldName(currRoute.name)
  }

  useEffect(() => {
    matchChilren(routes)
  }, [pathname])

  useEffect(() => {
    getUserInfo()
  }, [initialized, keycloak.authenticated])

  return (
    <menu
      className={classNames(
        classes.menu,
        open ? classes.expand : classes.shrink
      )}
    >
      <div
        className={classNames(classes.drawerTitle, {
          [classes.hidenItem]: !open,
          [classes.hidenNotItem]: !open
        })}
      >
        <Home className={classes.logo} />

        <div
          className={classNames(classes.detail, {
            [classes.hideDetail]: !open
          })}
        >
          <span className={classes.title}>BLOG CMS</span>
        </div>
      </div>

      {!initialized || !keycloak.authenticated || isFetchingUserInfo ? (
        <div className={classes.skeletonWrapper}>
          <SkeletonIterator
            count={10}
            skeletonComponent={() => (
              <Skeleton
                className={classes.skeleton}
                variant="rectangular"
                animation="wave"
                height={48}
              />
            )}
          />
        </div>
      ) : (
        <>
          <div
            className={classNames(classes.drawerUser, {
              [classes.hidenItem]: !open,
              [classes.hidenNotItem]: !open
            })}
          >
            {userInfo?.profile ? (
              <Avatar
                alt="user-avatar"
                src={userInfo?.profile}
                className={classes.avatar}
              />
            ) : (
              <Avatar className={classes.avatar}>
                <Face />
              </Avatar>
            )}

            <div
              className={classNames(classes.detail, {
                [classes.hideDetail]: !open
              })}
            >
              <span className={classes.userName}>{userInfo?.name}</span>
              <span className={classes.arrow} />
            </div>
          </div>

          {routes.map((route) => (
            <Fragment key={route.name}>
              {route.routes &&
              !route.routes.some(
                (childRoute) => childRoute.hideInMenu === true
              ) ? (
                <ParentItem
                  open={open}
                  route={route}
                  handleFoldNameChange={handleFoldNameChange}
                />
              ) : (
                <NavLink
                  exact
                  activeClassName={classNames(classes.active, {
                    [classes.foldActive]: !open
                  })}
                  className={classes.formatArrowTag}
                  to={route.path}
                >
                  <ParentItem open={open} route={route} />
                </NavLink>
              )}

              <div
                className={classNames(classes.childrenGroup, {
                  [classes.unfoldChildren]: foldName === route.name
                })}
                style={{
                  maxHeight: `${
                    foldName === route.name
                      ? route.routes && 60 * route.routes.length
                      : 0
                  }px`
                }}
              >
                {route.routes &&
                  !route.routes.some(
                    (childRoute) => childRoute.hideInMenu === true
                  ) &&
                  route.routes.map((childRoute) =>
                    childRoute.isExternalLink ? (
                      <a
                        className={classes.formatArrowTag}
                        href={childRoute.path}
                        key={childRoute.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ChildItem open={open} childRoute={childRoute} />
                      </a>
                    ) : (
                      <NavLink
                        exact
                        activeClassName={classNames(classes.active, {
                          [classes.foldActive]: !open
                        })}
                        className={classes.formatArrowTag}
                        to={childRoute.path}
                        key={childRoute.name}
                      >
                        <ChildItem open={open} childRoute={childRoute} />
                      </NavLink>
                    )
                  )}
              </div>
            </Fragment>
          ))}
        </>
      )}
    </menu>
  )
}

export default Drawer
