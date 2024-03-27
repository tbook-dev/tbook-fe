import { React } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageFallBack from '@/components/pageFallback';
import { useEventListener } from 'ahooks';
import hostRoutes from '@/router/campaign.host';
import pathRoutes from '@/router/campaign.pathname';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { useQueryClient } from 'react-query';
import { WagmiConfig } from 'wagmi';
import { host } from '@/api/incentive'
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
        <TonConnectUIProvider
          // manifestUrl={`${host}/ton-proof/manifest.json`}
          manifestUrl='https://static.tbook.vip/ton/manifest.json'
          uiPreferences={{ theme: THEME.DARK }}
        >
          <RouterProvider
            router={createBrowserRouter(
              isUsingSubdomain ? hostRoutes : pathRoutes
            )}
            fallbackElement={<PageFallBack />}
          />
        </TonConnectUIProvider>
        {/* all modal move into avator components */}
      </WagmiConfig>
    </>
  );
}

export default App;
