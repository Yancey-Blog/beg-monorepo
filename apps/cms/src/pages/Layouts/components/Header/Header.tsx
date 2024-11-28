import {
  AccountBalanceOutlined,
  Dashboard,
  ExitToAppOutlined,
  FaceOutlined,
  LockOutlined,
  MoreVert,
  Notifications,
  PermDataSettingOutlined,
  Person,
  Search,
  ViewList
} from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  Fab,
  Fade,
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import classNames from 'classnames'
import { KeycloakProfile } from 'keycloak-js'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'

interface Props {
  open: boolean
  handleDrawerChange: () => void
  isFetching: boolean
  userInfo?: KeycloakProfile
  logout: () => void
}

const Header: FC<Props> = ({
  open,
  handleDrawerChange,
  isFetching,
  userInfo,
  logout
}) => {
  const classes = useStyles()

  return (
    <AppBar
      position="relative"
      className={classNames(classes.header, { [classes.headerExpand]: !open })}
    >
      <section className={classes.left}>
        <Fab
          size="small"
          aria-label="more"
          onClick={() => handleDrawerChange()}
          className={classNames(classes.fabIcon, classes.marginRight)}
        >
          {open ? <MoreVert /> : <ViewList />}
        </Fab>
        <Typography variant="h6" noWrap className={classes.title}>
          CMS
        </Typography>
      </section>
      <section>
        <Input placeholder="Search..." />
        <Fab
          size="small"
          aria-label="search"
          className={classNames(classes.fabIcon, classes.marginRight)}
        >
          <Search />
        </Fab>
        <Link to="/">
          <IconButton>
            <Dashboard />
          </IconButton>
        </Link>

        <IconButton>
          <Badge showZero badgeContent={0} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        <PopupState variant="popover" popupId="deleteOnePopover">
          {(popupState) => {
            const handleLogout = () => {
              popupState.close()
              logout()
            }
            return (
              <>
                <IconButton
                  style={{ cursor: 'pointer' }}
                  {...bindTrigger(popupState)}
                >
                  {isFetching ? (
                    <Person />
                  ) : (
                    <Avatar
                      alt="user-avatar"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      src={userInfo?.attributes?.avatarUrl?.[0] || ''}
                    />
                  )}
                </IconButton>
                <Menu
                  {...bindMenu(popupState)}
                  TransitionComponent={Fade}
                  className={classes.menu}
                >
                  <Link to="/settings/profile" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <FaceOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/account" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <AccountBalanceOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Account" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/security" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <LockOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Security" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/global-config" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <PermDataSettingOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Global Config" />
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            )
          }}
        </PopupState>
      </section>
    </AppBar>
  )
}

export default Header
