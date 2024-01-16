import React from 'react'
import ReactDOM from 'react-dom/client'
// import { HashRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store/store'
import { RootCmp } from './RootCmp'
import './assets/styles/main.scss'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  "https://xsjwgpefjvojzodrgato.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzandncGVmanZvanpvZHJnYXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MDk4NDIsImV4cCI6MjAyMDk4NTg0Mn0.C_knKrGIqZKoB8dqEon7mbIBMJojx6ClxUF7p5o4jH4"
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <RootCmp />
      </Router>
    </SessionContextProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register()
