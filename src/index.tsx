import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { HelmetProvider } from 'react-helmet-async'
import * as dotenv from 'dotenv'
import { WebsocketProvider } from './lib/websocket'
import * as Sentry from '@sentry/react'
import { SENTRY_DNS } from './lib/variable'

dotenv.config()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: SENTRY_DNS,
  environment: process.env.NODE_ENV,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HelmetProvider>
            <WebsocketProvider>
              <App />
            </WebsocketProvider>
            <ReactQueryDevtools />
          </HelmetProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
