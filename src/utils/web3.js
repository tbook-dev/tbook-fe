import Web3 from "web3";
import { useCallback, useEffect, useState } from "react";
import { host, getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { mainnet, bsc } from "wagmi/chains";

const chains = [mainnet, bsc];

const wcProvider = walletConnectProvider({ projectId: import.meta.env.VITE_WC_PROJECT_ID })

const { provider } = configureChains(chains, [wcProvider]);

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: "tbook", chains }),
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

export async function signLoginMetaMask(addr, singer) {
  const address = addr.toLowerCase()
  return fetch(
    `${host}/nonce?address=${address}`,
    { credentials: "include" }
  )
    .then((r) => r.text())
    .then((t) =>  singer.signMessage(t))
    .then((s) => {
      const d = new FormData();
      d.append("address", address);
      d.append("sign", s);
      return fetch(`${host}/authenticate`, {
        credentials: "include",
        method: "POST",
        body: d,
      });
    });
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


//export default { wagmiClient: client, ethereumClient: ethClient, web3: new Web3(provider) }

// export const useWeb3 = () => {
//   const [web3, setWeb3] = useState()
//   const [wagmiProvider, setWagmiProvider] = useState()
//   const [wagmiClient, setWagmiClient] = useState()
//   const [ethereumClient, setEthereumClient] = useState()

//   //useEffect(() => {

//     setWagmiClient(client)
//     setEthereumClient(ethClient)
//     setWeb3(new Web3(provider))
//   //}, [])

//   return {
//     wagmiClient,
//     ethereumClient,
//     web3
//   }
// }