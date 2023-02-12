import React, { Children, useState } from "react";
import { Button, Drawer } from "antd";
import { chains } from "@/utils/const";
import Network from "../icon/NetWork";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useResponsive } from "ahooks";
import { Popover } from "antd";
import clsx from "clsx";
import { logout } from "@/utils/web3";
import { reset } from '@/store/user';
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
  const  currentId = networkId || chain?.id || 1

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
    await logout();
    window.location.reload();
  }

  const Lay = () => (
    <div className="-mx-6 lg:-mx-3 w-[300px]">
      <div className="text-[18px] leading-[24px] text-center pt-7 pb-6">
        <p className="text-[#333]">Choose the network</p>
      </div>
      <div>
        {chains.map((v) => (
          <div
            className={clsx(
              "flex items-center py-2 pl-24  hover:text-[#666] cursor-pointer",
              networkId === v.evmChainId
                ? "text-[#0049FF] bg-[#ECF1FF]"
                : "text-[#999] hover:bg-white"
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
            <Network id={v?.evmChainId} className="lg:mr-2" />
            <span className="hidden lg:block">{v?.name}</span>
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
          className="flex items-center"
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
