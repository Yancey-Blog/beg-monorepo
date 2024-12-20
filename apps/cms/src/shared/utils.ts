import qs from 'query-string'

interface Dict {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map((val: string) => val[0])
    .join('')

export const getType = <T>(type: T) =>
  Object.prototype.toString.call(type).slice(8, -1).toLowerCase()

export const goBack = () => window.history.back()

export const parseSearch = (search: string) =>
  qs.parse(search, { parseBooleans: true })

export const stringifySearch = (searchObj: Dict) => qs.stringify(searchObj)

export const noop = () => {}

export const isNumber = <T>(type: T) => getType(type) === 'number'

export const isString = <T>(type: T) => getType(type) === 'string'

export const isBoolean = <T>(type: T) => getType(type) === 'boolean'

export const isArray = <T>(type: T) => Array.isArray(type)

export const getURLPathName = (url: string) =>
  decodeURI(new URL(url).pathname.slice(1))

export const generateFile = (data: string, type = 'text/plain') => {
  return URL.createObjectURL(new Blob([data], { type }))
}
