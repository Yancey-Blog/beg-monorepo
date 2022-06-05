import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export interface Params<T> {
  id?: string
  data?: T
}

const useOpenModal = <T>() => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = (params?: Params<T>) => {
    if (open) {
      setOpen(false)
      navigate(pathname, { replace: true })
    } else {
      setOpen(true)
      if (params?.id) {
        navigate(pathname + '?id=' + params?.id, {
          state: params?.data || {}
        })
      }
    }
  }

  return { open, handleOpen }
}

export default useOpenModal
