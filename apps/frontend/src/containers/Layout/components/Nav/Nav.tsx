import Link from 'next/link'
import { FC } from 'react'
import { SVG_SPRITE } from 'src/shared/constants'
import { NavBar, SVG } from './styled'

const Nav: FC = () => {
  return (
    <NavBar>
      <Link href="/" passHref>
        <SVG>
          <use xlinkHref={SVG_SPRITE.home2} />
        </SVG>
      </Link>
      <Link href="/music" passHref>
        <SVG>
          <use xlinkHref={SVG_SPRITE.music2} />
        </SVG>
      </Link>
    </NavBar>
  )
}

export default Nav
