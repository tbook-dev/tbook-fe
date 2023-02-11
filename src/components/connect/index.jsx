import React, { useState } from "react";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { Button } from "antd";
import { chains } from "@/utils/const";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useConnect, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";
import { fetchSigner } from 'wagmi/actions'
import { useAccountBalance, useWallet, useCoinBalance, useChain, SuiChainId, ConnectModal } from "@suiet/wallet-kit";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount()
  const { open } = useWeb3Modal()
  const { connectAsync, connectors } = useConnect()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  // sui
  const suiWallet = useWallet()
  const [showSuiModal, setShowSuiModal] = useState(false)

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected){
        if (window.ethereum) {
          await connectAsync({connector: connectors.find(c => c.id == "injected")})
        } else {
          await open('ConnectWallet')
        }
      }
      const signer = await fetchSigner()
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handleSwitch() {
    // 1 Ethereum
    // 56 BNB
    switchNetwork(56)
  }

  const ethConf = chains.find((v) => v.evmChainId === 1);

  return (
    <>
      <div className="flex items-center" onClick={handleSwitch}>
        {React.createElement(ethConf.render)}
        <span>{ethConf.name}</span>
      </div>

      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button>
      <ConnectModal open={showSuiModal} onOpenChange={(open) => setShowSuiModal(open)}></ConnectModal>
    </>
  );
}
