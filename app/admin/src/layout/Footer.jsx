import { useState } from "react";
import { Drawer, Segmented } from "antd";
import { useResponsive } from "ahooks";
import menu from "./menu";
import { NavLink } from "react-router-dom";
import dotIcon from "@tbook/share/images/icon/dot.svg";
import dotIcon2 from "@tbook/share/images/icon/dot2.svg";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import arrowRight from "@tbook/share/images/icon/arrow-right.svg";
import backIcon from "@tbook/share/images/icon/back3.svg";
import { logout } from "@/utils/web3";
import { useSwitchNetwork } from "wagmi";
import { Icon } from "@tbook/ui";
import { conf } from "@tbook/utils";
import { user } from "@tbook/store";
import { Connect } from "@tbook/ui";
import { useCurrentProject } from "@tbook/hooks";
import { useTheme } from "@tbook/hooks";

const { chains, themeList } = conf;
const { setTheme } = user;
const { SwitchV0 } = Connect;
const { NetWork } = Icon;

export default function () {
  const { pc } = useResponsive();
  const project = useCurrentProject();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menuStep, setStep] = useState(0);
  const authUser = useSelector((state) => state.user.authUser);
  const themeSetting = useSelector((state) => state.user.theme);
  const projectChain = chains.find((v) => project.chain === v.name);
  const { switchNetwork } = useSwitchNetwork();
  const id = projectChain?.evmChainId || 1;
  const theme = useTheme();

  async function handleSwitch(id) {
    // 1 Ethereum
    // 56 BNB
    if (switchNetwork) {
      switchNetwork(id);
    }
    localStorage.setItem("chainId", id);
    await logout();
    window.location.href = `${location.origin}`;
  }

  const InitMenu = () => {
    return (
      <div>
        <h2 className="mt-6 font-medium text-center mb-7 text-c7">Settings</h2>

        {authUser && (
          <div className="flex items-center justify-between px-8 text-c12 h-14">
            <span className="text-[#666] mr-2">Network</span>
            <div className="flex items-center font-medium text-black" onClick={() => setStep(1)}>
              <SwitchV0 placement="rightBottom" networkId={projectChain?.evmChainId || 1} />
              <img src={arrowRight} className="h-5 ml-1" />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-8 text-c12 h-14">
          <span className="text-[#666] mr-2">Theme</span>

          <Segmented
            value={themeSetting}
            onChange={(v) => {
              dispatch(setTheme(v));
              setOpenDrawer(false);
              setStep(0);
            }}
            options={themeList}
          />
        </div>
      </div>
    );
  };
  const SwitchNetwork = () => {
    return (
      <div>
        <h2 className="relative flex justify-center mt-6 font-medium text-center mb-7 text-c7">
          <div className="absolute inset-0 flex items-center px-4">
            <img src={backIcon} className="w-1.5 h-4 object-contain" onClick={() => setStep(0)} />
          </div>
          <p>Choose the network</p>
        </h2>

        <div>
          {chains.map((chain) => (
            <div
              key={chain.evmChainId}
              className={clsx(
                "h-10 flex items-center justify-center text-c6 font-medium",
                chain.evmChainId === id ? "text-black bg-cw1 font-medium" : "text-c-6"
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
        </div>
      </div>
    );
  };
  return pc ? null : (
    <footer className="h-12 mt-1.5">
      <div className="fixed z-10 bottom-0 left-0 right-0 flex items-center justify-between h-12 px-4 text-c9  shadow-l6 dark:shadow-l5 bg-[#FBFDFF] dark:bg-black rounde-t-md">
        {menu.map((v) => (
          <NavLink to={v.link} key={v.link}>
            {({ isActive }) => {
              return (
                <span className={clsx("text-black dark:text-white", isActive ? " font-bold" : "font-medium")}>
                  {v.text}
                </span>
              );
            }}
          </NavLink>
        ))}
        <img
          src={theme === "dark" ? dotIcon : dotIcon2}
          onClick={() => setOpenDrawer(true)}
          className="h-[5px] w-[33px] object-contain"
        />
      </div>
      <Drawer
        placement="bottom"
        closable={false}
        open={openDrawer}
        maskStyle={{ backdropFilter: "blur(7px)" }}
        onClose={() => {
          setOpenDrawer(false);
          setStep(0);
        }}
        contentWrapperStyle={{
          height: "50vh",
          borderRadius: "24px 24px 0px 0px",
          overflow: "hidden",
        }}
      >
        <div className="-mx-6 -my-6">
          {menuStep === 0 && <InitMenu />}
          {menuStep === 1 && <SwitchNetwork />}
        </div>
      </Drawer>
    </footer>
  );
}
