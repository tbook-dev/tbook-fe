import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Theme from './theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  retry: false,
  refetchOnWindowFocus: false,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Theme>
      <App />
    </Theme>
  </QueryClientProvider>
);
