import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import { UserMenu, Connect } from "@tbook/ui";
import { useDispatch, useSelector } from "react-redux";
import logo from "@tbook/share/images/icon/logo.svg";
import menuIcon from "@tbook/share/images/icon/menu.svg";
import darkmenu from "@tbook/share/images/icon/darkmenu.svg";
import close2 from "@tbook/share/images/icon/close2.svg";
import close3 from "@tbook/share/images/icon/close3.svg";
import arrowRight from "@tbook/share/images/icon/arrow-right.svg";
import { useCurrentProject } from "@tbook/hooks";
import { conf } from "@tbook/utils";
import { useTheme } from "@tbook/hooks";
import { user } from "@tbook/store";
import { useSwitchNetwork } from "wagmi";
import { logout } from "@/utils/web3";
import { Icon } from "@tbook/ui";
import Setting from "@/components/setting";
import ConfigProviderV2 from "@/theme/ConfigProviderV2";
import menu from "./menu";

const { chains, themeList } = conf;
const { SwitchV0 } = Connect;
const { setTheme } = user;
const { NetWork } = Icon;

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const loadingUserStatus = useSelector((state) => state.user.loadingUserStatus);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pc } = useResponsive();
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const id = projectChain?.evmChainId || 1;
  const theme = useTheme();
  const themeSetting = useSelector((state) => state.user.theme);
  const { switchNetwork } = useSwitchNetwork();

  const dispatch = useDispatch();
  const [setStatus, setSetStatus] = useState(null);

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

  const Content = () => {
    return (
      <div className="flex flex-col h-full pt-5 -mx-6">
        <img
          src={theme === "dark" ? close2 : close3}
          className="absolute w-4 h-4 top-3 right-4"
          onClick={() => {
            setOpenDrawer(false);
          }}
        />
        <div
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="mb-24"
        >
          {menu.map((v) => (
            <NavLink to={v.link} key={v.link} className="flex items-center px-8 h-14 text-cwh2">
              {({ isActive }) => {
                return (
                  <span className={clsx(isActive ? "text-black font-bold dark:text-white" : "text-[#666]")}>
                    {v.text}
                  </span>
                );
              }}
            </NavLink>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between px-8 text-c12 h-14">
            <span className="text-[#666] mr-2">Theme</span>
            <span className="flex items-center dark:text-white" onClick={() => setSetStatus("theme")}>
              {themeList.find((v) => v.value === themeSetting)?.label}
              <img src={arrowRight} className="h-5 ml-4" />
            </span>
          </div>
          {authUser && (
            <div className="flex items-center justify-between px-8 text-c12 h-14">
              <span className="text-[#666] mr-2">Network</span>
              <div className="flex items-center dark:text-white" onClick={() => setSetStatus("network")}>
                <SwitchV0 placement="rightBottom" networkId={projectChain?.evmChainId || 1} />
                <img src={arrowRight} className="h-5 ml-1" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  const SetNetwork = () => {
    return (
      <Setting title="Network" backHandle={() => setSetStatus(null)}>
        {chains.map((chain) => (
          <div
            key={chain.evmChainId}
            className={clsx(
              "h-14 flex items-center text-c13 font-medium",
              chain.evmChainId === id ? "dark:text-white" : "dark:text-c-6 text-c-6"
            )}
            onClick={() => {
              if (chain.evmChainId !== id) {
                handleSwitch(chain.evmChainId);
                setSetStatus(null);
              }
            }}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <NetWork id={chain.evmChainId} />
            </div>
            <span className={clsx("ml-2 ")}>{chain.name}</span>
          </div>
        ))}
      </Setting>
    );
  };
  const SetTheme = () => {
    return (
      <Setting title="Theme" backHandle={() => setSetStatus(null)}>
        {themeList.map((v) => {
          return (
            <div
              onClick={() => {
                if (v.value !== themeSetting) {
                  dispatch(setTheme(v.value));
                  setSetStatus(null);
                  setOpenDrawer(false);
                }
              }}
              key={v.value}
              className={clsx(
                "h-14 flex items-center text-c13",
                themeSetting === v.value ? "dark:text-white font-bold" : "dark:text-c-6 text-c-6"
              )}
            >
              {v.label}
            </div>
          );
        })}
      </Setting>
    );
  };
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-black shadow-d2">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>

            {pc ? (
              <div className="items-center hidden space-x-12 text-c1 lg:flex">
                {menu.map((v) => (
                  <NavLink to={v.link} key={v.link}>
                    {({ isActive }) => {
                      return (
                        <span className={clsx(isActive ? "font-bold dark:text-white" : "font-medium text-c-9")}>
                          {v.text}
                        </span>
                      );
                    }}
                  </NavLink>
                ))}
              </div>
            ) : (
              <>
                <button onClick={() => setOpenDrawer(true)}>
                  <img src={theme === "dark" ? darkmenu : menuIcon} className="h-8" />
                </button>
                <ConfigProviderV2>
                  <Drawer
                    placement="top"
                    closable={false}
                    open={openDrawer}
                    maskStyle={{ backdropFilter: "blur(7px)" }}
                    contentWrapperStyle={{
                      height: "100vh",
                      borderRadius: "0",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {setStatus === null && <Content />}
                    {setStatus === "theme" && <SetTheme />}
                    {setStatus === "network" && <SetNetwork />}
                  </Drawer>
                </ConfigProviderV2>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {loadingUserStatus ? <Spin /> : authUser ? <UserMenu /> : <Connect />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
