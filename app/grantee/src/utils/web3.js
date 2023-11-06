import { host, getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { arbitrum, mainnet, polygon, optimism, polygonMumbai, optimismGoerli, localhost } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, optimism, polygonMumbai, optimismGoerli, localhost]
const projectId = import.meta.env.VITE_WC_PROJECT_ID

import { user } from '@tbook/store'

const { reset } = user

const metadata = {
  name: 'TBook',
  description: 'TBook',
  url: 'https://tbook.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
export const web3modal = createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  chains,
  themeVariables: {
    '--w3m-text-big-bold-font-family': 'Red Hat Display, sans-serif',
    '--w3m-font-family': 'Red Hat Display, sans-serif',
    '--w3m-accent-color': '#fff',
    '--w3m-accent-fill-color': '#666',
    '--w3m-button-border-radius': '20px',
    '--w3m-z-index': 10001
  }
})


export async function fetchLoginNonce(address) {
  return fetch(
    `${host}/nonce?address=${address}`,
    { credentials: "include" }
  ).then(r => r.text())
}

export async function loginWithSign(address, sign) {
  const d = new FormData();
  d.append("address", address);
  d.append("sign", sign);
  return fetch(`${host}/authenticate`, {
    credentials: "include",
    method: "POST",
    body: d,
  });
}

async function signLogin(addr, signer, chain, pubKey) {
  if(!addr) return;
  const address = addr.toLowerCase()
  const r = await fetch(
    `${host}/nonce?address=${address}`,
    { credentials: "include" }
  )
  const nonce = await r.text()
  const sign = await signer.signMessage({message: nonce})
  const d = new FormData();
  d.append("address", address);
  d.append("sign", sign);
  d.append("chain", chain);
  if (pubKey) {
    d.append("publicKey", pubKey);
  }
  const authResult = await fetch(`${host}/authenticate`, {
        credentials: "include",
        method: "POST",
        body: d,
      });
  return authResult;
}

export function logout() {
  reset()
  return fetch(
    `${host}/signout`,
    { credentials: "include" }
  )
}

export async function changeAccountSignIn(addr, signer) {
  return logout().then(() => signLoginMetaMask(addr, signer))
}

export async function signLoginMetaMask(addr, signer) {
  return signLogin(addr, signer, "Ethereum")
}

export async function loginSui(wallet) {
  const signer = {
    signMessage: (message) => 
      wallet.signMessage({
        message: new TextEncoder().encode(message)
      })
  }
  return signLogin(wallet.account.address, signer, "Sui", wallet.account.publicKey.toString('hex'))
}
