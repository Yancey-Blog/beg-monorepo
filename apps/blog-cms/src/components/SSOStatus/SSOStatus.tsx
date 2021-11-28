import { FC, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'

export enum Status {
  IsLoging,
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
        // @ts-ignore
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-webkit-font-smoothing': 'antialiased',
        fontSize: 48
      }}
    >
      {status === Status.IsLoging && 'Automatically login to Blog CMS'}
    </h1>
  )
}

export default SSOStatus
