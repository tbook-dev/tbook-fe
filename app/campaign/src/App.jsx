import { React } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageFallBack from '@/components/pageFallback';
import { useEventListener } from 'ahooks';
import hostRoutes from '@/router/campaign.host';
import pathRoutes from '@/router/campaign.pathname';

import { useQueryClient } from 'react-query';
import { WagmiConfig } from 'wagmi';

import { wagmiConfig } from '@/utils/web3';
import { receive } from '@/utils/channel';
import { isUsingSubdomain } from '@/utils/common';
// import { useTelegram } from '@/hooks/useTg';

function App () {
  const queryClient = useQueryClient();
  useEventListener('storage', ev => {
    receive(ev, msg => {
      queryClient.refetchQueries(msg);
    });
  });
  // const { user, webApp, isTMA } = useTelegram();
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RouterProvider
          router={createBrowserRouter(
            isUsingSubdomain ? hostRoutes : pathRoutes
          )}
          fallbackElement={<PageFallBack />}
        />
        {/* all modal move into avator components */}
      </WagmiConfig>
    </>
  );
}

export default App;
