import React, { useState } from "react";
import { signLoginMetaMask } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { Button } from "antd";
import { chains } from "@/utils/const";
import { Web3Button, Web3NetworkSwitch, useWeb3Modal } from "@web3modal/react";
import { useSigner, useAccount } from "wagmi";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount()
  const { data: signer } = useSigner()
  const { open } = useWeb3Modal()

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected){
        await open('ConnectWallet')
      }
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  const ethConf = chains.find((v) => v.evmChainId === 1);

  return (
    <>
      <Web3NetworkSwitch />
      <div className="flex items-center">
        {React.createElement(ethConf.render)}
        <span>{ethConf.name}</span>
      </div>
      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button>
    </>
  );
}
