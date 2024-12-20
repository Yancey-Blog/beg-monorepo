import { SnackbarOrigin, SocialMedia } from './types'

export const SNACKBAR_ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center'
}

export const SNACKBAR_MAX_NUM = 1

export const SNACKBAR_AUTO_HIDE_DURATION = 3000

export const BACK_TO_TOP_THRESHOLD = 800

export const SVG_SPRITE = {
  soundcloud: '#soundcloud',
  twitter: '#twitter',
  paypal: '#paypal',
  github: '#github',
  email: '#email',
  telegram: '#telegram',
  wechat: '#wechat',
  linkedin: '#linkedin',
  facebook: '#facebook',
  instagram: '#instagram',
  fire: '#flame',
  new: '#new',
  heart: '#heart',
  emptyHeart: '#passion',
  tag: '#price-tag',
  topRank: '#popularity',
  moon: '#moon',
  sun: '#sun',
  moon2: '#moon-2',
  sun2: '#sun-2',
  announcement: '#megaphone',
  home: '#home',
  home2: '#home-2',
  blog: '#pencil',
  music: '#music',
  music2: '#music-2',
  cv: '#resume-and-cv',
  search: '#magnifying-glass',
  clock: '#clock',
  eye: '#eye',
  like: '#like',
  folder: '#closed-container',
  archive: '#archive',
  more: '#menu'
}

export const SOCIAL_MEDIA: SocialMedia = {
  github: {
    url: 'https://github.com/YanceyOfficial/',
    icon: SVG_SPRITE.github
  },
  twitter: {
    url: 'https://twitter.com/YanceyOfficial/',
    icon: SVG_SPRITE.twitter
  },
  instagram: {
    url: 'https://www.instagram.com/YanceyOfficial/',
    icon: SVG_SPRITE.instagram
  },
  soundCloud: {
    url: 'https://soundcloud.com/yancey-leo/',
    icon: SVG_SPRITE.soundcloud
  },
  telegram: {
    url: 'https://t.me/YanceyOfficial',
    icon: SVG_SPRITE.telegram
  },
  paypal: {
    url: 'https://www.paypal.me/yanceyofficial/10usd',
    icon: SVG_SPRITE.paypal
  },
  wechat: {
    url: '/',
    icon: SVG_SPRITE.wechat
  },
  email: {
    url: 'mailto:developer@yanceyleo.com',
    icon: SVG_SPRITE.email
  }
}

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const APLAYER_CDN =
  'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'

export const DOMAIN = 'https://yanceyleo.com'

export const RSS = `${DOMAIN}/rss.xml`
