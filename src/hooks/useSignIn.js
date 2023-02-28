import React, { useCallback, useState } from "react";
import { fetchLoginNonce, loginWithSign, signLoginMetaMask } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { chains } from "@/utils/const";
import { useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  useConnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { fetchSigner, signMessage } from "wagmi/actions";
import {
  useAccountBalance,
  useWallet,
  useCoinBalance,
  useChain,
  SuiChainId,
  ConnectModal,
} from "@suiet/wallet-kit";

import { useResponsive } from "ahooks";
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);
  //status: 'idle' | 'signing' | 'verifying';
  const [{ status, nonce, sign, errorMessage }, setState] = React.useState({
    status: 'idle',
    errorMessage: '',
    nonce: '',
    sign: ''
  });

  const { address, isDisconnected } = useAccount({onConnect : () => {
    console.log('connected')
  }, onDisconnect: () => {
    console.log('disconnected')
  }})
  const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { setDefaultChain } = useWeb3Modal()
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();
  // sui
  const suiWallet = useWallet();
  const [showSuiModal, setShowSuiModal] = useState(false);

  if (chain) {
    setDefaultChain(chain)
  } else if (localStorage.getItem('chainId') == '56') { // bsc
    setDefaultChain(bsc)
  }

  // const [onceRef, setOnceRef] = useState(false)
  // React.useEffect(() => {
  //   if (onceRef) return;
  //   setOnceRef(true);

  //   getNonce();
  // }, [getNonce])

  const [clicked, setClicked] = useState(false)

  React.useEffect(() => {
    async function inner() {
      if (isDisconnected || !clicked || !address) return
      const signer = await fetchSigner();
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
      setClicked(false);
      // if (status === 'signing') {
      //   const nonce = await fetchLoginNonce(address)
      //   const signer = await fetchSigner();
      //   const sign = await signer.signMessage(nonce)
      //   setState(x => ({...x, status: 'verifying', sign}))
      // }
    }
    inner().catch(console.error);
  }, [clicked, isDisconnected, address])

  // React.useEffect(() => {
  //   async function inner() {
  //     if (status === 'verifying') {
  //       const r = await loginWithSign(address, sign)
  //       setState(x => ({...x, status: 'idle', sign: '', nonce: ''}))
  //       dispatch(fetchUserInfo());
  //       dispatch(setAuthUser(true));
  //     }
  //   }
  //   inner().catch(console.error);
  // }, [status])

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected) {
        openConnectModal();
        // if (window.ethereum) {
        //   await connectAsync({
        //     connector: connectors.find((c) => c.id == "injected"),
        //     chainId: localStorage.getItem("chainId")
        //   });
        // } else {
        //   //await open("ConnectWallet");
        //   openConnectModal();
        // }
      } else {
        //setState(x => ({...x, status: 'signing'}))
        const signer = await fetchSigner();
        await signLoginMetaMask(address, signer);
        dispatch(fetchUserInfo());
        dispatch(setAuthUser(true));
        setClicked(false);
      }
      //setClicked(true)
      // const signer = await fetchSigner();
      // await signLoginMetaMask(address, signer);
      // dispatch(fetchUserInfo());
      // dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return { loading, open, handleSignIn };
}
