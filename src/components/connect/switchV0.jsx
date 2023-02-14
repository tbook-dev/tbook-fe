import React, { useState } from "react";
import { chains } from "@/utils/const";
import Network from "../icon/NetWork";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useResponsive } from "ahooks";
import { Popover } from "antd";
import clsx from "clsx";
import { logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

// type = [button,logo]
export default function ({ networkId, placement = "bottomRight" }) {
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const currentId = networkId || chain?.id || parseInt(localStorage.getItem("chainId")) || 1;

  // console.log('currentId', {chain}, currentId)
  // sui
  // console.log("chain", chain);

  async function handleSwitch(id) {
    // 1 Ethereum
    // 56 BNB
    if (switchNetwork) {
      switchNetwork(id);
    }
    // switchNetwork && switchNetwork(id);
    // setOpenLay(false);
    // disconnect();
    // dispatch(reset());
    localStorage.setItem("chainId", id);
    await logout();
    // window.location.reload();
    window.location.href = `${location.origin}/incentive`;
  }

  const Lay = () => (
    <div className="-mx-3 w-[150px]">
      {chains.map((v) => (
        <div
          className={clsx(
            "flex items-center pl-2 py-2 hover:text-[#666] cursor-pointer",
            currentId === v.evmChainId
              ? "text-[#0049FF] bg-[#ECF1FF]"
              : "text-[#999] bg-white hover:bg-white"
          )}
          onClick={() => {
            setOpenLay(false);
            if (currentId === v.evmChainId) {
              return;
            }
            handleSwitch(v.evmChainId);
          }}
          key={v.evmChainId}
        >
          <Network id={v?.evmChainId} className="mr-2" />
          <span>{v?.name}</span>
        </div>
      ))}
    </div>
  );

  const Content = () => {
    const chain = chains.find((v) => v.evmChainId === currentId);

    return (
      <span
        className="flex items-center"
        onClick={() => {
          setOpenLay(true);
        }}
      >
        <Network id={chain?.evmChainId} />
        <DownOutlined className="ml-1"/>
      </span>
    );
  };

  return (
    <Popover
      onOpenChange={(v) => setOpenLay(v)}
      content={<Lay />}
      trigger="click"
      open={openLay}
      placement={placement}
    >
      <Content />
    </Popover>
  );
}
