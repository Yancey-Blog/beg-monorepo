import { useQuery } from '@apollo/client'
import { Link } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import classNames from 'classnames'
import { FC } from 'react'
import { GLOBAL_SETTING } from 'src/containers/Settings/GlobalConfig/typeDefs'
import {
  YANCEY_BLOG_URL,
  YANCEY_EMAIL_URL,
  YANCEY_GITHUB_URL
} from 'src/shared/constants'

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      padding: 16,
      fontSize: '14px',
      textAlign: 'right',
      color: '#3c4858',
      position: 'fixed',
      right: 0,
      bottom: 0,
      zIndex: 0,
      width: 'calc(100% - 260px)',
      background: '#fff',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.6, 1)',
      boxShadow:
        '0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    },

    footerExpand: {
      width: 'calc(100% - 80px)',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.6, 1)'
    },

    footerList: {
      padding: 0,
      listStyle: 'none'
    },

    footerItem: {
      display: 'inline-block',
      marginRight: 16,
      fontSize: '12px',
      fontWeight: 500,
      color: '#3c4858'
    }
  })
)

interface Props {
  open: boolean
}

const Footer: FC<Props> = ({ open }) => {
  const classes = useStyles()

  const { data } = useQuery(GLOBAL_SETTING, {
    notifyOnNetworkStatusChange: true
  })

  return (
    <footer
      className={classNames(classes.footer, { [classes.footerExpand]: !open })}
    >
      <ul className={classes.footerList}>
        <li className={classes.footerItem}>
          <Link
            href={YANCEY_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            BLOG
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`${YANCEY_BLOG_URL}/p/${
              data ? data.getGlobalSetting.cvPostId : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT ME
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`${YANCEY_BLOG_URL}/p/${
              data ? data.getGlobalSetting.releasePostId : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            RELEASE LOG
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`mailto:${YANCEY_EMAIL_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            EMAIL
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={YANCEY_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </Link>
        </li>
      </ul>
      <p>
        {`Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.`}
      </p>
    </footer>
  )
}

export default Footer
