import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import { UserMenu, Connect } from "@tbook/ui";
import { useSelector } from "react-redux";
import logo from "@tbook/share/images/icon/logo.svg";
import menuIcon from "@tbook/share/images/icon/menu.svg";
import darkmenu from "@tbook/share/images/icon/darkmenu.svg";
import close2 from "@tbook/share/images/icon/close2.svg";
import arrowRight from "@tbook/share/images/icon/arrow-right.svg";
import { useCurrentProject } from "@tbook/hooks";
import { conf } from "@tbook/utils";
import ConfigProviderV2 from "@/theme/ConfigProviderV2";
import { useTheme } from "@tbook/hooks";
import Setting from "@/components/setting";

const { chains } = conf;
const { SwitchV0 } = Connect;

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const loadingUserStatus = useSelector((state) => state.user.loadingUserStatus);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pc } = useResponsive();
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const theme = useTheme();
  const themeSetting = useSelector((state) => state.user.theme);
  console.log({ themeSetting });
  const [setStatus, setSetStatus] = useState(null);
  const menu = [
    {
      link: "/",
      text: "INCENTIVE",
    },
    {
      link: "/tokenTable",
      text: "TOKENTABLE",
    },
  ];
  const Content = () => {
    return (
      <div className="flex flex-col h-full pt-5 -mx-6">
        <img
          src={close2}
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

        {authUser && (
          <div className="border-t border-b-1">
            <div className="flex items-center justify-between px-8 text-c12 h-14">
              <span className="text-[#666] mr-2">Theme</span>
              <span className="flex items-center dark:text-white" onClick={() => setSetStatus("theme")}>
                {themeSetting}
                <img src={arrowRight} className="h-5 ml-4" />
              </span>
            </div>
            <div className="flex items-center justify-between px-8 text-c12 h-14">
              <span className="text-[#666] mr-2">Network</span>
              <div className="flex items-center dark:text-white">
                <SwitchV0 placement="rightBottom" networkId={projectChain?.evmChainId || 1} />
                <img src={arrowRight} className="h-5 ml-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const SetTheme = () => {
    return (
      <Setting title="Theme" backHandle={() => setSetStatus(null)}>
        xx
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
