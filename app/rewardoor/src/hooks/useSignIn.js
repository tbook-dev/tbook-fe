import  { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { getUserInfo } from "@/api/incentive";
import { useWeb3Modal } from "@web3modal/react";
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
import { useQueryClient } from "react-query";
// import { useResponsive } from "ahooks";

export default function (cb) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);
  // const { pc } = useResponsive();
  // const [openLay, setOpenLay] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { address, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
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
        } else if (isMobileDevice) {
          const host = new URL(window.location).host;
          window.open(`https://metamask.app.link/dapp/${host}`);
          setLoading(false);
          return;
        } else {
          await open("ConnectWallet");
        }
      }
      const walletClient = await getWalletClient();
      await signLoginMetaMask(address, walletClient);
      try {
        await queryClient.refetchQueries('userInfo')
        navigate(searchParams.get("redirect") || "/");
      } catch (error) {
        console.log(error)
      }
      // await queryClient.refetchQueries('userInfo')
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return { loading, open, handleSignIn };
}
