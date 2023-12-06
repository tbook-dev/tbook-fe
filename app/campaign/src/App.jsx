import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ConnectWalletModal from '@/components/connectWallet'
import PageFallBack from '@/components/pageFallback'
import { configResponsive, useEventListener } from 'ahooks'
import routes from './router'
import { useQueryClient } from 'react-query'
import { WagmiConfig } from 'wagmi'
import { watchAccount, getAccount } from 'wagmi/actions'
import { getWalletClient } from '@wagmi/core'
import {
  wagmiConfig,
  changeAccountSignIn,
  logout,
  preGetNonce,
  // signLoginMetaMask,
  isIOS
} from '@/utils/web3'
import { receive } from '@/utils/channel'

configResponsive({
  pc: 1120
})

let currentAddress = getAccount().address
watchAccount(async acc => {
  console.log(
    `account changed, original: ${currentAddress}, new account: ${acc.address}`
  )
  if (currentAddress == acc.address) return
  if (!acc.address) {
    // disconnect
    logout().then(r => {
      location.href = location
    })
  } else if (currentAddress) {
    // account change
    const signer = await getWalletClient()
    changeAccountSignIn(acc.address, signer).then(r => {
      location.href = location
    })
  } else {
    // new account connect
    if (isIOS) {
      preGetNonce(acc.address)
    } else if (!/Mobi/i.test(window.navigator.userAgent)) {
      // const signer = await getWalletClient()
      // signLoginMetaMask(acc.address, signer)
    }
  }
  currentAddress = acc.address
})

function App () {
  const queryClient = useQueryClient()
  useEventListener('storage', ev => {
    receive(ev, msg => {
      queryClient.refetchQueries(msg)
    })
  })

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RouterProvider
          router={createBrowserRouter(routes)}
          fallbackElement={<PageFallBack />}
        />
        <ConnectWalletModal />
      </WagmiConfig>
      {/* <Web3Modal
        projectId={import.meta.env.VITE_WC_PROJECT_ID}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-text-big-bold-font-family': 'Red Hat Display, sans-serif',
          '--w3m-font-family': 'Red Hat Display, sans-serif',
          '--w3m-accent-color': '#fff',
          '--w3m-accent-fill-color': '#666',
          '--w3m-button-border-radius': '20px',
          '--w3m-z-index': 10001
        }}
      /> */}
    </>
  )
}

export default App
