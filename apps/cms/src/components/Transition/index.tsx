import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, ReactElement, Ref } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default Transition
