import React, { Suspense, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import "./css/style.css";
import "./charts/ChartjsConfig";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";
import { match } from "path-to-regexp";

import PageNotFound from "./pages/utility/PageNotFound";
import LayoutV1 from "./layout/Layout.admin";
import LayoutV2 from "./layout/Layout.grante";

import routes from "./router";
import { Spin } from "antd";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import SignClient from "@walletconnect/sign-client";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { mainnet, bsc } from "wagmi/chains";

const chains = [mainnet, bsc];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "tbook", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const signClient = await SignClient.init({
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  metadata: {
    name: "TBOOK",
    description: "token book",
    url: "",
    icons: ["https://pub-6fe8916c26334830906d2b9ca9d94efa.r2.dev/tbookv2.svg"],
  },
});

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [layoutVersion, setLayoutVersion] = useState("v1");
  const Layout = layoutVersion === "v1" ? LayoutV1 : LayoutV2;

  useLayoutEffect(() => {
    const currentConf = routes.find(v => match(v.path)(location?.pathname))
    setLayoutVersion(currentConf?.layout || 'v1')
  }, [location]);

  useAsyncEffect(async () => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense
                    fallback={
                      <div className="flex flex-col items-center justify-center h-screen">
                        <Spin />
                      </div>
                    }
                  >
                    <route.component />
                  </Suspense>
                }
              />
            );
          })}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </WagmiConfig>

    <Web3Modal
        projectId={import.meta.env.VITE_WC_PROJECT_ID}
        ethereumClient={ethereumClient}
    />
    </>
  );
}

export default App;
