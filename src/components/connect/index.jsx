import React, { useState } from "react";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { Button } from "antd";
import { chains } from "@/utils/const";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleSignIn() {
    setLoading(true);
    try {
      const web3 = await loadWeb3();
      await signLoginMetaMask(web3);
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
