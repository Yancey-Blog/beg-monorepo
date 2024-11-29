import Link from 'next/link'
import { FC } from 'react'
import { IGlobalSetting } from 'src/containers/GlobalSetting/types'
import { SVG_SPRITE } from 'src/shared/constants'
import { Logo, NavBar, NavBarItem } from './styled'

interface Props {
  globalSetting: IGlobalSetting
}

const Header: FC<Props> = ({ globalSetting }) => {
  const { cvPostId } = globalSetting

  return (
    <NavBar>
      <Link href="/" passHref>
        <Logo />
      </Link>
      <NavBarItem>
        <Link href="/">
          <svg>
            <use xlinkHref={SVG_SPRITE.home} />
          </svg>
          Home
        </Link>
        <Link href="/post">
          <svg>
            <use xlinkHref={SVG_SPRITE.blog} />
          </svg>
          Blog
        </Link>
        <Link href="/archive">
          <svg>
            <use xlinkHref={SVG_SPRITE.archive} />
          </svg>
          Archive
        </Link>
        <Link href="/music">
          <svg>
            <use xlinkHref={SVG_SPRITE.music} />
          </svg>
          Music
        </Link>
        <Link href={`/post/${cvPostId}`}>
          <svg>
            <use xlinkHref={SVG_SPRITE.cv} />
          </svg>
          About
        </Link>
      </NavBarItem>
    </NavBar>
  )
}

export default Header
