import { FC, useEffect } from 'react'
import Lottie from 'react-lottie-player'
import authLottieData from 'src/assets/lotties/auth.json'
import useSSO from 'src/hooks/useSSO'

export enum Status {
  IsChecking,
  Fail
}

export interface Props {
  status: Status
}

const SSOStatus: FC<Props> = ({ status }) => {
  const keycloak = useSSO()

  useEffect(() => {
    if (status === Status.Fail) {
      keycloak?.login()
    }
  }, [keycloak, status])
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {status === Status.IsChecking && (
        <Lottie
          loop
          animationData={authLottieData}
          play
          style={{ width: 500, height: 500 }}
        />
      )}
    </div>
  )
}

export default SSOStatus
