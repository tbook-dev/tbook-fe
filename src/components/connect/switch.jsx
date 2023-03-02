import React, { useState } from "react";
import {  Drawer } from "antd";
import Button  from '@/components/button';
import { chains } from "@/utils/const";
import Network from "../icon/NetWork";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useResponsive } from "ahooks";
import { Popover } from "antd";
import clsx from "clsx";
import { logout } from "@/utils/web3";
import { useDispatch } from "react-redux";


// type = [button,logo]
export default function ({
  type = "button",
  networkId,
  placement = "bottomRight",
}) {
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const  currentId = networkId || chain?.id || parseInt(localStorage.getItem("chainId")) || 1

  // console.log('currentId', {chain}, currentId)
  // sui
  // console.log("chain", chain);

  async function handleSwitch(id) {
    // 1 Ethereum
    // 56 BNB
    if(switchNetwork){
      switchNetwork(id)
    }
    // switchNetwork && switchNetwork(id);
    // setOpenLay(false);
    // disconnect();
    // dispatch(reset());
    localStorage.setItem("chainId", id);
    await logout();
    // window.location.reload();
    window.location.href = `${location.origin}`
  }

  const Lay = () => (
    <div className="-mx-6 lg:-mx-3 w-auto lg:w-[300px]">
      <div className="text-[18px] leading-[26px] text-center pb-4 pt-1">
        <p className="text-[#333]">Choose the network</p>
      </div>
      <div>
        {chains.map((v) => (
          <div
            className={clsx(
              "flex items-center justify-start py-2 pl-6  hover:text-[#666] cursor-pointer",
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
            <Network id={v?.evmChainId} className="mr-1 lg:mr-2" />
            <span className="!lg:block">{v?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const Content = () => {
    const chain = chains.find((v) => v.evmChainId === currentId);

    if (type === "button") {
      return (
        <Button
          className="flex items-center px-4 bg-black shadow-d3 lg:shadow-none lg:px-8 bg-none lg:bg-cw1"
          onClick={() => {
            setOpenLay(true);
          }}
        >
          <Network id={chain?.evmChainId} className="lg:mr-2" />
          <span className="hidden lg:block">{chain?.name}</span>
        </Button>
      );
    }
    if (type === "logo") {
      return (
        <span
          onClick={() => {
            setOpenLay(true);
          }}
        >
          <Network id={chain?.evmChainId} />
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {pc ? (
        <Popover
          onOpenChange={(v) => setOpenLay(v)}
          content={<Lay />}
          trigger="click"
          open={openLay}
          placement={placement}
        >
          <Content />
        </Popover>
      ) : (
        <>
          <Content />
          <Drawer
            placement="bottom"
            closable={false}
            open={openLay}
            contentWrapperStyle={{
              height: "50vh",
              borderRadius: "24px 24px 0px 0px",
              overflow: "hidden",
            }}
            onClose={() => setOpenLay(false)}
          >
            <Lay />
          </Drawer>
        </>
      )}
    </>
  );
}
