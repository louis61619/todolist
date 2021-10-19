import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProviders } from './context'
import './assets/index.less'

if (process.env.NODE_ENV === 'development') {
  const { startServer } = require('../mock')
  startServer()
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
