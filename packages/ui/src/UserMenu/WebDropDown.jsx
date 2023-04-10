import React, { useState } from "react";
import { Popover, Segmented } from "antd";
import Avator from "./Avator";
import Info from "./Info";
import { useCurrentProject } from "@tbook/hooks";
import { conf } from "@tbook/utils";
import NetWork from "../Icon/NetWork";
import back from "@tbook/share/images/icon/back.svg";
import clsx from "clsx";
import { logout } from "@/utils/web3";
import { useSwitchNetwork } from "wagmi";
import { user } from "@tbook/store";
import { useDispatch, useSelector } from "react-redux";

const { setTheme } = user;

const { chains, themeList } = conf;
export default function ({ open, setOpen }) {
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const id = projectChain?.evmChainId || 1;
  const [menuStep, setStep] = useState(0);
  const { switchNetwork } = useSwitchNetwork();
  const theme = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  const InitMenu = () => (
    <>
      <Info />
      <>
        <div className="flex items-center justify-between text-c6 lg:h-10">
          <span className="dark:text-l-8">Network</span>
          <span onClick={() => setStep(1)} className="flex items-center font-medium cursor-pointer dark:text-black">
            <NetWork id={id} />
            <span className="ml-2">{projectChain?.name}</span>
          </span>
        </div>
        <div className="flex items-center justify-between text-c6 lg:h-10">
          <span className="dark:text-l-8">Theme</span>

          <Segmented
            value={theme}
            onChange={(v) => {
              dispatch(setTheme(v));
              setOpen(false);
              setStep(0);
            }}
            options={themeList}
          />
        </div>
      </>
    </>
  );
  const Setting = () => {
    return (
      <>
        <div className="mb-6">
          <div className="flex">
            <img className="w-6 h-6 mr-[27px] cursor-pointer" src={back} onClick={() => setStep(0)} />
            <span className="font-medium text-black text-c7">Switch the network</span>
          </div>
        </div>
        {chains.map((chain) => (
          <div
            key={chain.evmChainId}
            className={clsx(
              chain.evmChainId === id ? "bg-cw1  text-black" : "text-c-9",
              "lg:-mx-6 px-6 flex items-center h-10 text-c6 font-medium cursor-pointer dark:hover:text-black dark:hover:bg-cw1 dark:hover:opacity-60"
            )}
            onClick={() => {
              if (chain.evmChainId !== id) {
                handleSwitch(chain.evmChainId);
              }
            }}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <NetWork id={chain.evmChainId} />
            </div>
            <span className={clsx("ml-2 ")}>{chain.name}</span>
          </div>
        ))}
      </>
    );
  };

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

  const Content = () => (
    <div className="-mx-6 lg:-mx-3">
      <div className="px-6 pb-5 pt-3 w-[306px]">
        {menuStep === 0 && <InitMenu />}
        {menuStep === 1 && <Setting />}
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      content={<Content />}
      placement="bottomRight"
      trigger="click"
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setTimeout(() => {
            setStep(0);
          }, 1000);
        }
      }}
    >
      <Avator
        id={id}
        setOpen={() => {
          setOpen(true);
        }}
        open={open}
      />
    </Popover>
  );
}
