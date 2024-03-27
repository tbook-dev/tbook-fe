import { React } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageFallBack from "@/components/pageFallback";
import { useEventListener } from "ahooks";
import hostRoutes from "@/router/campaign.host";
import pathRoutes from "@/router/campaign.pathname";

import { useQueryClient } from "react-query";
import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "@/utils/web3";
import { receive } from "@/utils/channel";
import { isUsingSubdomain } from "@/utils/common";
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import { host } from '@/api/incentive'

function App() {
  const queryClient = useQueryClient();
  useEventListener("storage", (ev) => {
    receive(ev, (msg) => {
      queryClient.refetchQueries(msg);
    });
  });

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
      <TonConnectUIProvider
          manifestUrl={`${host}/ton-proof/manifest.json`}
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
