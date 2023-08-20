import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@/css/style.css'

import { configResponsive } from 'ahooks'
import routes from './router'
import { Spin } from 'antd'

import { WagmiConfig } from 'wagmi'
import { watchAccount, getAccount } from 'wagmi/actions'
import { getWalletClient } from '@wagmi/core'
import {
  wagmiConfig,
  ethereumClient,
  changeAccountSignIn,
  logout
} from '@/utils/web3'
import { Web3Modal } from '@web3modal/react'

configResponsive({
  pc: 1120
})

const currentAccount = getAccount()
watchAccount(async acc => {
  console.log('account changed:', acc)
  if (currentAccount.address == acc.address) return
  if (!acc.address) {
    // disconnect
    logout().then(r => {
      location.href = location
    })
  } else {
    const signer = await getWalletClient()
    changeAccountSignIn(acc.address, signer).then(r => {
      location.href = location
    })
  }
})

function App () {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RouterProvider
          router={createBrowserRouter(routes)}
          fallbackElement={
            <div className='flex flex-col items-center justify-center h-[300px]'>
              <Spin />
            </div>
          }
        />
      </WagmiConfig>
      <Web3Modal
        projectId={import.meta.env.VITE_WC_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  )
}

export default App
