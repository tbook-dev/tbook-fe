import React, { useLayoutEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAsyncEffect } from 'ahooks'
import { useDispatch } from 'react-redux'
import { user } from '@tbook/store'
import '@/css/style.css'
import { useTheme } from '@tbook/hooks'

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
  logout,
  preGetNonce,
  signLoginMetaMask,
  isIOS
} from '@/utils/web3'
import { Web3Modal } from '@web3modal/react'
const { fetchUserInfo } = user

configResponsive({
  pc: 1120
})

let currentAddress = getAccount().address
watchAccount(async acc => {
  console.log(`account changed, original: ${currentAddress}, new account: ${acc.address}`)
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
    } else {
      const signer = await getWalletClient()
      signLoginMetaMask(acc.address, signer)
    }
  }
  currentAddress = acc.address
})

function App () {
  const dispatch = useDispatch()
  const theme = useTheme()
  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useAsyncEffect(async () => {
    dispatch(fetchUserInfo())
  }, [])

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
        themeVariables={{
          '--w3m-text-big-bold-font-family': 'Red Hat Display, sans-serif',
          '--w3m-font-family': 'Red Hat Display, sans-serif',
          '--w3m-accent-color': '#121212',
          '--w3m-button-border-radius': '20px'
        }}
      />
    </>
  )
}

export default App
