import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/css/style.css';

import { configResponsive } from 'ahooks';
import routes from './router';
import { Spin } from 'antd';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { WagmiConfig } from 'wagmi';
import { watchAccount, getAccount } from 'wagmi/actions';
import { wagmiConfig, changeAccountSignIn, logout } from '@/utils/web3';

configResponsive({
  pc: 1120,
});

const currentAccount = getAccount();
watchAccount(async acc => {
  console.log('account changed:', acc);
  if (currentAccount.address == acc.address) return;
  if (!acc.address) {
    // disconnect
    logout().then(r => {
      location.href = location;
    });
  } else {
    // const signer = await getWalletClient()
    // changeAccountSignIn(acc.address, signer).then(r => {
    //   location.href = location
    // })
  }
});

function App () {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <TonConnectUIProvider
          // manifestUrl={`${host}/ton-proof/manifest.json`}
          manifestUrl='https://pub-871184d7338746be92cfba5f3c362feb.r2.dev/ton/ton_manifest.json'
          uiPreferences={{ theme: THEME.DARK }}
        >
          <RouterProvider
            router={createBrowserRouter(routes)}
            fallbackElement={
              <div className='flex flex-col items-center justify-center h-[300px]'>
                <Spin />
              </div>
            }
          />
        </TonConnectUIProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
