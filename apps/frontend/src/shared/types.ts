export type Dict<T> = Record<string, T>

export interface SocialMedia {
  [x: string]: {
    url: string
    icon: string
  }
}

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
}

export interface PosterProps {
  readonly imageUrl: string
}

export type NextWebVitalsMetrics = {
  id: string
  label: string
  name: string
  startTime: number
  value: number
}

export interface GraphQInputWrapper<T> {
  input: T
}
