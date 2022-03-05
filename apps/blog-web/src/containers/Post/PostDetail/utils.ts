import * as tocbot from 'tocbot'

export const removeEmbededTag = (content: string) =>
  content.replace(/```embeded\s(.*)\s```/gi, '$1')

export const setupTocbot = () => {
  tocbot.init({
    tocSelector: '.postMenu',
    contentSelector: '.postDetailContent',
    headingSelector: 'h1, h2, h3, h4',
    hasInnerContainers: true,
    headingsOffset: 120,
    scrollSmoothOffset: -120
  })
}

export const generatePostUrl = (id: string) =>
  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/post/${id}`
