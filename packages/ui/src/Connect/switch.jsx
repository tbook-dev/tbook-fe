import React, { useState } from "react";
import { Drawer } from "antd";
import Button from "../Button";
import Network from "../Icon/NetWork";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useResponsive } from "ahooks";
import { Popover } from "antd";
import clsx from "clsx";
import { logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { conf } from "@tbook/utils";

const { chains } = conf;

// type = [button,logo]
export default function Switch({ type = "button", networkId, placement = "bottomRight" }) {
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
    window.location.href = `${location.origin}`;
  }

  const Lay = () => (
    <div className="-mx-6 lg:-mx-3 w-auto lg:w-[300px]">
      <div className="pt-1 pb-4 text-center text-c7">
        <p className="font-medium text-black">Choose the network</p>
      </div>
      <div>
        {chains.map((v) => (
          <div
            className={clsx(
              "flex items-center text-c6 justify-start py-2 pl-6 ",
              currentId === v.evmChainId
                ? " bg-cw1 dark:text-black cursor-not-allowed hover:opacity-70"
                : "text-[#999] bg-white cursor-pointer"
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
          className="flex items-center px-4 dark:bg-black bg-[#f6f8fa] lg:bg-white lg:shadow-l4 shadow-d3 dark:lg:shadow-none lg:px-8 bg-none dark:lg:bg-cw1"
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
