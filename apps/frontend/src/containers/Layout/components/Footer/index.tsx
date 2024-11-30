import { GlobalSettingModel } from '@repo/graphql-types/__generated__/graphql'
import Link from 'next/link'
import { FC } from 'react'
import { SOCIAL_MEDIA } from 'src/shared/constants'
import {
  CopyRight,
  Divider,
  Email,
  FooterBottom,
  FooterWrapper,
  InnerLink,
  TechStacks
} from './styled'

interface Props {
  globalSetting: GlobalSettingModel
}

const Footer: FC<Props> = ({ globalSetting }) => {
  const { releasePostId } = globalSetting

  return (
    <FooterWrapper>
      <TechStacks>
        Crafted with{' '}
        <svg>
          <use xlinkHref="#heart" />
        </svg>{' '}
        by Yancey
      </TechStacks>
      <Divider />
      <FooterBottom>
        <CopyRight>
          Copyright &copy; {new Date().getFullYear()} Yancey Inc. and its
          affiliates.
        </CopyRight>
        <nav>
          <Link href={`/post/${releasePostId}`}>
            <InnerLink>Chronicle of Events</InnerLink>
          </Link>
          <Link href="/legal/privacy-policy">
            <InnerLink>Privacy Policy</InnerLink>
          </Link>
          <Email href={SOCIAL_MEDIA.email.url}>Contact Me</Email>
        </nav>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default Footer
