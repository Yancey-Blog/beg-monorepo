import { FC } from 'react'
import Head from 'next/head'
import { useTheme } from 'styled-components'

interface Props {
  title?: string
  useTwitterCard?: boolean
  postTitle?: string
  postSummary?: string
  postPosterUrl?: string
  postUrl?: string
}

const MetaHead: FC<Props> = ({
  title = 'Yancey Official Blog | Yancey Inc.',
  useTwitterCard = false,
  postTitle,
  postSummary,
  postPosterUrl,
  postUrl
}) => {
  const theme = useTheme()

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,shrink-to-fit=no"
      />
      <meta name="theme-color" content={theme.background.primary} />
      <meta name="keywords" content="Yancey,Blog,Technology,Music" />
      <meta
        name="description"
        content="Technology, Music and Poems. | Yancey Official Blog | Yancey Inc."
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Yancey Blog" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/icon-512x512.png"
        media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-icon.png" />

      {useTwitterCard && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@YanceyOfficial" />
          <meta name="twitter:creator" content="@YanceyOfficial" />
          <meta name="twitter:title" content={postTitle} />
          <meta name="twitter:description" content={postSummary} />
          <meta name="twitter:image" content={postPosterUrl} />
          <meta name="twitter:image:alt" content={postTitle} />
          <meta name="twitter:url" content={postUrl} />
        </>
      )}
    </Head>
  )
}

export default MetaHead
