import React, { Suspense, useCallback, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import "./css/style.css";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";
import { match } from "path-to-regexp";

import PageNotFound from "./pages/utility/PageNotFound";
import LayoutV1 from "./layout/Layout.admin";
import LayoutV2 from "./layout/Layout.grante";
import { configResponsive } from 'ahooks';

import routes from "./router";
import { Spin } from "antd";

import { WagmiConfig } from "wagmi";
import { watchAccount, getAccount, fetchSigner } from "wagmi/actions"; 
import { Web3Modal } from "@web3modal/react";
import { WalletProvider, SuietWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { wagmiClient, ethereumClient, changeAccountSignIn, logout } from "./utils/web3";

configResponsive({
  pc: 1120,
})

const currentAccount = getAccount()
watchAccount(async (acc) => {
  console.log("account changed:", acc)
  if (currentAccount.address == acc.address) return
  if (!acc.address) {  // disconnect
    logout().then((r) => {location.href = location})
  } else {
    const signer = await fetchSigner()
    changeAccountSignIn(acc.address, signer).then((r) => {location.href = location})
  }
})

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
    <WalletProvider defaultWallets={[SuietWallet]}></WalletProvider>
    </>
  );
}

export default App;
