import { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  useAccount,
  useConnect,
} from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { getWalletClient } from "@wagmi/core";

import { useQueryClient } from "react-query";

export default function (cb) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { address, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

  function getChain() {
    if (localStorage.getItem("chainId") == "56") return bsc;
    return mainnet;
  }

  async function handleSignIn(wc) {
    setLoading(true);
    try {
      if (isDisconnected) {
        if (wc) {
          await open("ConnectWallet");
        } else if (window.ethereum) {
          await connectAsync({
            connector: connectors.find((c) => c.id == "injected"),
            chainId: getChain().id,
          });
        } 
        /* else if (isMobileDevice) {
          const host = new URL(window.location).host;
          window.open(`https://metamask.app.link/dapp/${host}`);
          setLoading(false);
          return;
        } */
        else {
          await open("ConnectWallet");
        }
        if (isMobileDevice) return;
      }

      const walletClient = await getWalletClient();
      await signLoginMetaMask(address, walletClient);
      await queryClient.refetchQueries("userInfo");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return { loading, open, handleSignIn };
}
