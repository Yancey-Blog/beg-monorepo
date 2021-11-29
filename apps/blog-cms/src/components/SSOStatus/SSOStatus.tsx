import { FC, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'

export enum Status {
  IsChecking,
  Fail
}

export interface Props {
  status: Status
}

const SSOStatus: FC<Props> = ({ status }) => {
  const { keycloak } = useKeycloak()

  useEffect(() => {
    if (status === Status.Fail) {
      keycloak.login()
    }
  }, [keycloak, status])
  return (
    <h1
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'linear-gradient(225deg, #ff5ea7 36.04%, #010fcb 88.83%, #ff6530 220.3%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        fontSize: 48
      }}
    >
      {status === Status.IsChecking && 'Automatically checking authentication.'}
    </h1>
  )
}

export default SSOStatus
