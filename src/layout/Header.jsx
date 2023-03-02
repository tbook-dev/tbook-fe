import React, { useState } from "react";
import UserMenu from "@/components/userMenu";
import { useSelector } from "react-redux";
import Connect from "@/components/connect";
import logo from "@/images/icon/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer } from "antd";
import { useResponsive } from "ahooks";
import menuIcon from "@/images/icon/menu.svg";
import useCurrentProject from "@/hooks/useCurrentProject";
import SwitchNet from "@/components/connect/switchV0";
import { chains } from "@/utils/const";
import clsx from "clsx";

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
      <div className="flex flex-col justify-between h-full -mx-6">
        <div className="border-b">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                "flex px-4 items-center h-14 transition duration-150",
                isActive
                  ? "!text-[#0049FF] rounded-r-2xl !bg-[#ECF1FF]"
                  : "!text-[#666]"
              )
            }
          >
            {({ isActive }) => {
              return (
                <span className="ml-4 text-[24px] leading-[32px]">
                  Incentive
                </span>
              );
            }}
          </NavLink>
        </div>

        {authUser && (
          <div className="border-t pb-9">
            {/* 1、当前项目的网络; 2、默认以太坊*/}
            <div className="flex items-center px-4 h-14">
              <span className="text-[24px] leading-[32px] text-[#666]">
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
