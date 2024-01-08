import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Theme from './theme/ThemeProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({ retry: false })

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Theme>
      <App />
    </Theme>
  </QueryClientProvider>
)
