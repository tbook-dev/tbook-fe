import { host } from '@/api/incentive'

import { publicProvider } from 'wagmi/providers/public'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, optimism, optimismGoerli, localhost } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, optimism, optimismGoerli, localhost]
const projectId = import.meta.env.VITE_WC_PROJECT_ID

import { user } from '@tbook/store'

const { reset } = user

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
export const ethereumClient = new EthereumClient(wagmiConfig, chains)

// const connectors = modalConnectors({
//   appName: "tbook",
//   projectId: import.meta.env.VITE_WC_PROJECT_ID,
//   chains,
//   version: '2'
// });

export async function fetchLoginNonce (address) {
  return fetch(`${host}/nonce?address=${address}`, {
    credentials: 'include'
  }).then(r => r.text())
}

export async function loginWithSign (address, sign) {
  const d = new FormData()
  d.append('address', address)
  d.append('sign', sign)
  return fetch(`${host}/authenticate`, {
    credentials: 'include',
    method: 'POST',
    body: d
  })
}

async function signLogin (addr, signer, chain, pubKey) {
  if (!addr) return
  const address = addr.toLowerCase()
  const r = await fetch(`${host}/nonce?address=${address}`, {
    credentials: 'include'
  })
  const nonce = await r.text()
  const sign = await signer.signMessage({message: nonce})
  const d = new URLSearchParams()
  d.append('address', address)
  d.append('sign', sign)
  d.append('chain', chain)
  if (pubKey) {
    d.append('publicKey', pubKey)
  }
  const authResult = await fetch(`${host}/authenticate`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: d
  })
  return authResult
}

export function logout () {
  reset()
  return fetch(`${host}/signout`, { credentials: 'include' })
}

export async function changeAccountSignIn (addr, signer) {
  return logout().then(() => signLoginMetaMask(addr, signer))
}

export async function signLoginMetaMask (addr, signer) {
  return signLogin(addr, signer, 'Ethereum')
}

export async function loginSui (wallet) {
  const signer = {
    signMessage: message =>
      wallet.signMessage({
        message: new TextEncoder().encode(message)
      })
  }
  return signLogin(
    wallet.account.address,
    signer,
    'Sui',
    wallet.account.publicKey.toString('hex')
  )
}
