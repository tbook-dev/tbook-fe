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
import { useCurrentProject } from "@tbook/hooks";
import { conf } from "@tbook/utils";
import DarkProvider from "@/theme/DarkProvider";
import { useTheme } from "@tbook/hooks";

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
      <div className="flex flex-col justify-between h-full pt-5 -mx-6">
        <div
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          {menu.map((v) => (
            <NavLink to={v.link} key={v.link} className="flex items-center px-8 h-14 text-cwh2">
              {({ isActive }) => {
                return <span className={clsx("font-bold", isActive ? "text-white" : "text-[#666]")}>{v.text}</span>;
              }}
            </NavLink>
          ))}
        </div>

        {authUser && (
          <div className="border-t border-b-1">
            <div className="flex items-center px-8 text-c12 h-14 text-[#666]">Settings</div>
            <div className="flex items-center px-8 text-c12 h-14">
              <span className="text-[#666] mr-2">Network ｜</span>
              <SwitchV0 placement="rightBottom" networkId={projectChain?.evmChainId || 1} />
            </div>
          </div>
        )}
      </div>
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
                <DarkProvider>
                  <Drawer
                    placement="top"
                    closable={false}
                    open={openDrawer}
                    maskStyle={{ backdropFilter: "blur(7px)" }}
                    contentWrapperStyle={{
                      height: "50vh",
                      borderRadius: "0 0 24px 24px",
                      overflow: "hidden",
                    }}
                    onClose={() => setOpenDrawer(false)}
                  >
                    <Content />
                  </Drawer>
                </DarkProvider>
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
