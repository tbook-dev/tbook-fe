import '@/css/style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Theme from './theme/ThemeProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import queryClient from './query-client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <App />
      </Theme>
    </QueryClientProvider>
  </Provider>
)
