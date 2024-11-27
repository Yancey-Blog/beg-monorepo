export interface UploaderResponse {
  name: string
  url: string
}

export interface Props {
  type?: 'avatar' | 'simple'
  variant?: 'elevation' | 'outlined' | undefined
  accept?: string
  defaultFile?: string
  needMarginLeft?: boolean
  multiple?: boolean
  className?: any
  onChange: (file: UploaderResponse) => void
}
