import ReactGA from 'react-ga4'

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_KEY)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
