import React, { useState } from "react";
import { UserMenu } from "@tbook/ui";
import Connect from "@/components/connect";
import { useSelector } from "react-redux";
import logo from "@tbook/share/images/icon/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer } from "antd";
import { useResponsive } from "ahooks";
import menuIcon from "@tbook/share/images/icon/menu.svg";
import useCurrentProject from "@/hooks/useCurrentProject";
import SwitchNet from "@/components/connect/switchV0";
import { chains } from "@/utils/const";
import clsx from "clsx";
import DarkProvider from "@/theme/DarkProvider";

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const loadingUserStatus = useSelector(
    (state) => state.user.loadingUserStatus
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pc } = useResponsive();
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const showLessNav = useSelector((state) => state.user.showLessNav);

  const Content = () => {
    return (
      <div className="flex flex-col justify-between h-full pt-5 -mx-6">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx("flex h-14 items-center px-8 text-cwh2")
            }
          >
            {({ isActive }) => {
              return <span className="font-bold text-white">Incentive</span>;
            }}
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx("flex h-14 items-center px-8 text-cwh2")
            }
          >
            {({ isActive }) => {
              return <span className="text-[#666]">Tokentable</span>;
            }}
          </NavLink>
        </div>

        {authUser && (
          <div className="border-t border-b-1">
            {/* 1、当前项目的网络; 2、默认以太坊*/}
            <div className="flex items-center px-8 text-c12 h-14 text-[#666]">
              Settings
            </div>
            <div className="flex items-center px-8 text-c12 h-14">
              <span className="text-[#666] mr-2">
                Network ｜
              </span>
              <SwitchNet
                placement="rightBottom"
                networkId={projectChain?.evmChainId || 1}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <header className="sticky top-0 z-30 dark:bg-black dark:shadow-d2">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Header: Left side */}
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>

            {showLessNav ? null : pc ? (
              <div className="items-center hidden lg:flex">
                <Link
                  to="/"
                  className="mr-12 font-bold dark:text-white text-c1"
                >
                  INCENTIVE
                </Link>
                <span className="font-medium text-c1 dark:text-c-9">
                  TOKENTABLE
                </span>
              </div>
            ) : (
              <>
                <button onClick={() => setOpenDrawer(true)}>
                  <img src={menuIcon} className="h-8" />
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

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {loadingUserStatus ? (
              <Spin />
            ) : authUser ? (
              <UserMenu />
            ) : (
              <Connect />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
