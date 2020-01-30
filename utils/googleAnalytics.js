import ReactGA from 'react-ga'

const initGA = () => {
  ReactGA.initialize(process.env.BOUNCE_GOOGLE_ANALYTICS)
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const setGaPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
}
