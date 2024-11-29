import { FC } from 'react'
import { AfterFireworks, FireworksElement, FireworksWrapper } from './styled'

const Fireworks: FC = () => {
  return (
    <FireworksWrapper>
      <FireworksElement />
      <AfterFireworks />
    </FireworksWrapper>
  )
}

export default Fireworks
