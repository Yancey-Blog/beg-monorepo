export const removeEmbededTag = (content: string) =>
  content.replace(/```embeded\s(.*)\s```/gi, '$1')

export const generatePostUrl = (id: string) =>
  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/post/${id}`

export const combineStr = (str: string) =>
  str
    .trim()
    .replace(
      /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?/\，/\。/\；/\：/\“/\”/\》/\《/\|/\{/\}/\、/\!/\~/\`]/g,
      ''
    )
    .replace(/\s+/g, '-')
