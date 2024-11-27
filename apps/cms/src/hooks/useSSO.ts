import { useEffect, useRef, useState } from 'react'
import Keycloak from 'keycloak-js'

const instance = new Keycloak({
  realm: process.env.REACT_APP_KEY_CLOAK_REALM,
  url: process.env.REACT_APP_KEY_CLOAK_URL,
  clientId: process.env.REACT_APP_KEY_CLOAK_CLIENT_ID
})

const useSSO = () => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const didInit = useRef(false)

  const initial = async () => {
    const isInitial = await instance.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    })

    if (isInitial && instance?.authenticated) {
      const userProfile = await instance.loadUserProfile()
      localStorage.setItem('token', instance?.token || '')
      localStorage.setItem('userProfile', JSON.stringify(userProfile) || '')
      setKeycloak(instance)
    }
  }

  useEffect(() => {
    if (didInit.current) {
      return
    }
    didInit.current = true

    initial()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didInit])

  return keycloak
}

export default useSSO
