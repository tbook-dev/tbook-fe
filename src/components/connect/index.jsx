import React, { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { Button, Drawer } from "antd";
import { chains } from "@/utils/const";
import { useWeb3Modal } from "@web3modal/react";
import Network from "../icon/NetWork";
import {
  useAccount,
  useConnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { fetchSigner } from "wagmi/actions";
import {
  useAccountBalance,
  useWallet,
  useCoinBalance,
  useChain,
  SuiChainId,
  ConnectModal,
} from "@suiet/wallet-kit";
import { useDisconnect } from "wagmi";
import { useResponsive } from "ahooks";
import SwitchNet from './switch'

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);

  const { address, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // sui
  const suiWallet = useWallet();
  // console.log("chain", chain);

  const [showSuiModal, setShowSuiModal] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected) {
        if (window.ethereum) {
          await connectAsync({
            connector: connectors.find((c) => c.id == "injected"),
          });
        } else {
          await open("ConnectWallet");
        }
      }
      const signer = await fetchSigner();
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  return (
    <>
      <SwitchNet />

      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button>
      <ConnectModal
        open={showSuiModal}
        onOpenChange={(open) => setShowSuiModal(open)}
      ></ConnectModal>
    </>
  );
}
