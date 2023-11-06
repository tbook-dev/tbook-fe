import React, { Suspense, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import { useDispatch } from "react-redux";
import { user } from "@tbook/store";
import "@/css/style.css";
import { useTheme } from "@tbook/hooks";

// import PageNotFound from "./pages/utility/PageNotFound";
import Layout from "./layout/Layout";
import { configResponsive } from "ahooks";
import routes from "./router";
import { Spin } from "antd";

import { WagmiConfig } from 'wagmi'
import { watchAccount, getAccount } from 'wagmi/actions'
import { getWalletClient } from '@wagmi/core'
import {
  wagmiConfig,
  changeAccountSignIn,
  logout,
  signLoginMetaMask
} from '@/utils/web3'

const { fetchUserInfo } = user;

configResponsive({
  pc: 1120,
});

const currentAccount = getAccount();
watchAccount(async (acc) => {
  console.log("account changed:", acc);
  if (currentAccount.address == acc.address) return;
  if (!acc.address) {
    // disconnect
    logout().then((r) => {
      location.href = location;
    });
  } else {
    const signer = await fetchSigner();
    changeAccountSignIn(acc.address, signer).then((r) => {
      location.href = location;
    });
  }
});

function App() {
  const dispatch = useDispatch();
  const theme = useTheme();

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useAsyncEffect(async () => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
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

            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </Layout>
      </WagmiConfig>
    </>
  );
}

export default App;
