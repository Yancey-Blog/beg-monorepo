import { ApolloProvider } from '@apollo/client'
import 'aplayer/dist/APlayer.min.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'normalize.css'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from 'src/components/Toast/Toast'
import ToggleTheme from 'src/components/ToggleTheme/ToggleTheme'
import { createApolloClient } from 'src/graphql/apolloClient'
import { ThemeMode, useDarkMode } from 'src/hooks/useDarkMode'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_AUTO_HIDE_DURATION,
  SNACKBAR_MAX_NUM
} from 'src/shared/constants'
import { NextWebVitalsMetrics } from 'src/shared/types'
import { devToolsWarning } from 'src/shared/utils'
import GlobalStyle from 'src/styled/globalStyles'
import 'src/styled/nprogress.css'
import { darkTheme, lightTheme } from 'src/styled/theme'
import { ThemeProvider } from 'styled-components'

interface Props extends AppProps {
  err: any
}

export const reportWebVitals = ({
  id,
  name,
  label,
  value
}: NextWebVitalsMetrics) => {
  if (window?.ga) {
    window.ga('send', 'event', {
      eventCategory: `Next.js ${label} metric`,
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
      eventLabel: id,
      nonInteraction: true
    })
  }
}

devToolsWarning()

const Player = dynamic(import('src/containers/Music/components/Player'), {
  ssr: false
})

const App = ({ Component, pageProps, err }: Props) => {
  const apolloClient = createApolloClient()
  const { theme, toggleTheme } = useDarkMode()
  const themeMode = theme === ThemeMode.LIGHT ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ApolloProvider client={apolloClient}>
        <SnackbarProvider
          maxSnack={SNACKBAR_MAX_NUM}
          anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
          autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        >
          <SnackbarUtilsConfigurator />
          <Component {...pageProps} err={err} />
          <Player />
          <ToggleTheme theme={theme} onToggle={toggleTheme} />
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
