import { FC, Fragment, useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar, Skeleton } from '@mui/material'
import { Home, Face } from '@mui/icons-material'
import classNames from 'classnames'
import routes, { Route } from 'src/routes'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'
import ChildItem from './components/ChildItem'
import ParentItem from './components/ParentItem'
import useStyles from './styles'
import { KeycloakProfile } from 'keycloak-js'

interface Props {
  open: boolean
  isFetching: boolean
  userInfo?: KeycloakProfile
}

const Drawer: FC<Props> = ({ open, isFetching, userInfo }) => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [foldName, setfoldName] = useState('')

  const handleFoldNameChange = (name: string) => {
    setfoldName(foldName === name ? '' : name)
  }

  const matchChilren = useCallback(
    (routeList: Route[]) => {
      const currRoute = routeList.find(
        (route) =>
          route.routes &&
          route.routes.find((childRoute) => pathname.includes(childRoute.path))
      )
      currRoute && setfoldName(currRoute.name)
    },
    [pathname]
  )

  useEffect(() => {
    matchChilren(routes)
  }, [matchChilren, pathname])

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

      {isFetching ? (
        <div className={classes.skeletonWrapper}>
          <SkeletonIterator
            count={10}
            skeletonComponent={
              <Skeleton
                className={classNames(classes.skeleton, {
                  [classes.skeletonHidenNotItem]: !open
                })}
                variant="rectangular"
                animation="wave"
                height={48}
              />
            }
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
            <Avatar
              alt="user-avatar"
              // @ts-ignore
              src={userInfo?.attributes?.avatar?.[0] || ''}
              className={classes.avatar}
            />

            <div
              className={classNames(classes.detail, {
                [classes.hideDetail]: !open
              })}
            >
              <span className={classes.userName}>
                {
                  // @ts-ignore
                  userInfo?.attributes?.name?.[0] || ''
                }
              </span>
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
                  end
                  className={({ isActive }) =>
                    classNames(classes.formatArrowTag, {
                      [classes.active]: isActive,
                      [classes.foldActive]: !open
                    })
                  }
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
                        end
                        className={({ isActive }) =>
                          classNames(classes.formatArrowTag, {
                            [classes.active]: isActive,
                            [classes.foldActive]: !open
                          })
                        }
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
