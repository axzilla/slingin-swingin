import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import HttpsRedirect from 'react-https-redirect'

import { AuthContextProvider } from './contexts/auth'
import { AlertContextProvider } from './contexts/alert'

ReactDOM.render(
  <HttpsRedirect>
    <AuthContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </AuthContextProvider>
  </HttpsRedirect>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
