import { FC, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import Lottie from 'react-lottie';
import authLottieData from 'src/assets/lotties/auth.json';

export enum Status {
  IsChecking,
  Fail
}

export interface Props {
  status: Status
}

const lottieData = {
  loop: true,
  autoplay: true,
  animationData: authLottieData,
};

const SSOStatus: FC<Props> = ({ status }) => {
  const { keycloak } = useKeycloak()

  useEffect(() => {
    if (status === Status.Fail) {
      keycloak.login()
    }
  }, [keycloak, status])
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {status === Status.IsChecking &&
        <Lottie
          options={lottieData}
          width={500}
        />
      }
    </div>
  )
}

export default SSOStatus
