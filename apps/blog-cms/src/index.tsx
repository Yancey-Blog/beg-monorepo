import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import DateAdapter from '@mui/lab/AdapterLuxon'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { SnackbarProvider } from 'notistack'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Layouts from './pages/Layouts/Layouts'
import client from './graphql/apolloClient'
import reportWebVitals from './reportWebVitals'
import history from './shared/history'
import keycloak from './shared/configKeyCloak'
import { tableTheme } from './shared/globalStyles'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_MAX_NUM,
  SNACKBAR_AUTO_HIDE_DURATION
} from './shared/constants'
import './assets/global.scss'

ReactDOM.render(
  <StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={tableTheme()}>
            <SnackbarProvider
              maxSnack={SNACKBAR_MAX_NUM}
              anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
              autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
              preventDuplicate
            >
              <LocalizationProvider dateAdapter={DateAdapter}>
                <SnackbarUtilsConfigurator />
                <CssBaseline />
                <Router history={history}>
                  <Layouts />
                </Router>
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </ReactKeycloakProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
