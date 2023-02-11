import Web3 from "web3";
import { host, getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { mainnet, bsc } from "wagmi/chains";

import {ConnectButton, useAccountBalance, useWallet, useCoinBalance, useChain, SuiChainId} from "@suiet/wallet-kit";

const chains = [mainnet, bsc];

const wcProvider = walletConnectProvider({ projectId: import.meta.env.VITE_WC_PROJECT_ID });

const { provider } = configureChains(chains, [wcProvider, publicProvider()]);

const connectors = modalConnectors({ appName: "tbook", chains });

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
});
export const ethereumClient = new EthereumClient(wagmiClient, chains)

export async function loadWeb3() {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use MetaMask/Mist's provider.
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  }
}

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
  return fetch(
    `${host}/nonce?address=${address}`,
    { credentials: "include" }
  )
    .then((r) => r.text())
    .then((t) =>  signer.signMessage(t))
    .then((s) => {
      const d = new FormData();
      d.append("address", address);
      d.append("sign", s);
      d.append("chain", chain);
      if (pubKey) {
        d.append("publicKey", pubKey);
      }
      return fetch(`${host}/authenticate`, {
        credentials: "include",
        method: "POST",
        body: d,
      });
    });
}

export function logout() {
  return fetch(
    `${host}/logout`,
    { credentials: "include" }
  )
}

export async function changeAccountSignIn(addr, signer) {
  return fetch(
    `${host}/logout`,
    { credentials: "include" }
  ).then(() => signLoginMetaMask(addr, signer))
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

export async function signGrantMetaMask(web3, projectId, grantId, userId) {
  try {
    const signList = await getGrantSignInfo(projectId, grantId);
    const signInfo = signList.find((v) => userId === v?.signer?.userId);
    const s1 = await web3.eth.personal.sign(
      web3.utils.fromUtf8(signInfo.grantSign.signInfo),
      web3.currentProvider.selectedAddress
    );

    const res = await postGrantSignInfo(
      projectId,
      grantId,
      signInfo.grantSign.grantSignId,
      s1
    );
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
}
