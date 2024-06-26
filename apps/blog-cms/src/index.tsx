import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { SnackbarProvider } from 'notistack'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import Layouts from './pages/Layouts/Layouts'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import client from './graphql/apolloClient'
import reportWebVitals from './reportWebVitals'
import { theme } from './shared/globalStyles'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_MAX_NUM,
  SNACKBAR_AUTO_HIDE_DURATION
} from './shared/constants'
import './assets/global.scss'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={SNACKBAR_MAX_NUM}
          anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
          autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
          preventDuplicate
        >
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <SnackbarUtilsConfigurator />
            <CssBaseline />
            <BrowserRouter>
              <Layouts />
            </BrowserRouter>
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </ApolloProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
