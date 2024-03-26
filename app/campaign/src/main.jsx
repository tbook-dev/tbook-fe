import '@/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Theme from './theme/ThemeProvider';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import queryClient from './query-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { EnokiFlowProvider } from '@mysten/enoki/react';
import ErrorBoundary from '@/components/errorBoundary';
import GlobalError from '@/components/errorBoundary/GlobalError';
import { configResponsive } from 'ahooks';
import { TelegramProvider } from '@/hooks/useTg';
configResponsive({
  pc: 1200,
});

const enoki_key = import.meta.env.VITE_ENOKI_API_KEY;
const baseUrl = import.meta.env.VITE_API_HOST;
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallbackComponent={<GlobalError />}>
    <Provider store={store}>
      <TelegramProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Theme>
            <EnokiFlowProvider apiKey={enoki_key} apiUrl={`${baseUrl}/zkproxy`}>
              <App />
            </EnokiFlowProvider>
          </Theme>
        </QueryClientProvider>
      </TelegramProvider>
    </Provider>
  </ErrorBoundary>
);
