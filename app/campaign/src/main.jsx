import '@/css/style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Theme from './theme/ThemeProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import queryClient from './query-client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { EnokiFlowProvider } from '@mysten/enoki/react';

const enoki_key = import.meta.env.VITE_ENOKI_API_KEY
const baseUrl = import.meta.env.VITE_API_HOST
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Theme>
        <EnokiFlowProvider apiKey={enoki_key} apiUrl={`${baseUrl}/zkproxy`}>
        <App />
        </EnokiFlowProvider>
      </Theme>
    </QueryClientProvider>
  </Provider>
)
