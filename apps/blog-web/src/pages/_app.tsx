import { SnackbarProvider } from 'notistack'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import ToggleTheme from 'src/components/ToggleTheme/ToggleTheme'
import { SnackbarUtilsConfigurator } from 'src/components/Toast/Toast'
import { createApolloClient } from 'src/graphql/apolloClient'
import { lightTheme, darkTheme } from 'src/styled/theme'
import GlobalStyle from 'src/styled/globalStyles'
import { useDarkMode, ThemeMode } from 'src/hooks/useDarkMode'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_MAX_NUM,
  SNACKBAR_AUTO_HIDE_DURATION
} from 'src/shared/constants'
import { devToolsWarning } from 'src/shared/utils'
import { NextWebVitalsMetrics } from 'src/shared/types'
import 'normalize.css'
import 'aplayer/dist/APlayer.min.css'
import 'tocbot/dist/tocbot.css'
import 'src/styled/nprogress.css'

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
          <ToggleTheme theme={theme} onToggle={toggleTheme} />
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
