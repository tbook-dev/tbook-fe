import React, { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { user } from "@tbook/store";

import {
  useAccount,
  useConnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  useDisconnect,
} from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { getWalletClient } from "@wagmi/core";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useResponsive } from "ahooks";
const { setAuthUser, fetchUserInfo } = user;

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { pc } = useResponsive();
  // const [openLay, setOpenLay] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { address, isDisconnected } = useAccount();
  // const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  //const { setDefaultChain } = useWeb3Modal()
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

  // sui
  // const suiWallet = useWallet();
  // const [showSuiModal, setShowSuiModal] = useState(false);

  // if (chain) {
  //   setDefaultChain(chain)
  // } else if (localStorage.getItem('chainId') == '56') { // bsc
  //   setDefaultChain(bsc)
  // }

  function getChain() {
    if (localStorage.getItem("chainId") == "56") return bsc;
    return mainnet;
  }

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected) {
        if (window.ethereum) {
          await connectAsync({
            connector: connectors.find((c) => c.id == "injected"),
            chainId: getChain().id,
          });
        } else if (isMobileDevice) {
          const host = new URL(window.location).host;
          window.open(`https://metamask.app.link/dapp/${host}`);
          setLoading(false);
          return;
        } else {
          //await open("ConnectWallet");
        }
      }
      const walletClient = await getWalletClient();
      await signLoginMetaMask(address, walletClient);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
      const target = searchParams.get("redirect");
      if (target) {
        navigate(target);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return { loading, open, handleSignIn };
}
