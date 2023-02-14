import React, { useState } from "react";
import UserMenu from "@/components/DropdownProfile";
import { useSelector } from "react-redux";
import Connect from "@/components/connect";
import logoText from "@/images/icon/logo-text.svg";
import incentiveIcon1 from "@/images/icon/incentive1.svg";
import incentiveIcon2 from "@/images/icon/incentive2.svg";
import dashboardIcon1 from "@/images/icon/dashboard1.svg";
import dashboardIcon2 from "@/images/icon/dashboard2.svg";
import settingIcon1 from "@/images/icon/setting1.svg";
import settingIcon2 from "@/images/icon/setting2.svg";
import logo from "@/images/icon/logo.svg";
import { useResponsive } from "ahooks";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer } from "antd";
import clsx from "clsx";
import { chains } from "@/utils/const";
import useCurrentProject from "@/hooks/useCurrentProject";
import SwitchNet from "@/components/connect/switchV0";

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const [openDrawer, setOpenDrawer] = useState(false);

  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const loadingUserStatus = useSelector(
    (state) => state.user.loadingUserStatus
  );

  // console.log('loadingUserStatus->',loadingUserStatus)
  const { pc } = useResponsive();
  const Content = () => {
    return (
      <div className="flex flex-col justify-between h-full -mx-6">
        <div className="border-b">
          <NavLink
            to="/incentive"
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
                <>
                  <img
                    src={isActive ? incentiveIcon2 : incentiveIcon1}
                    className="w-7"
                  />
                  <span className="ml-4 text-[24px] leading-[32px]">
                    Incentive
                  </span>
                </>
              );
            }}
          </NavLink>

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
                <>
                  <img
                    src={isActive ? dashboardIcon2 : dashboardIcon1}
                    className="w-7"
                  />
                  <span className="ml-4 text-[24px] leading-[32px]">
                    Dashboard
                  </span>
                </>
              );
            }}
          </NavLink>
        </div>

        {authUser && (
          <div className="border-t pb-9">
            <NavLink
              to="/setting"
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
                  <>
                    <img
                      src={isActive ? settingIcon2 : settingIcon1}
                      className="w-7"
                    />
                    <span className="ml-4 text-[24px] leading-[32px]">
                      Settings
                    </span>
                  </>
                );
              }}
            </NavLink>

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
    <header className="sticky top-0 z-30 bg-white shadow-c11">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <Link to="/incentive">
              <img src={pc ? logoText : logo} className="mr-2 h-9 lg:h-auto" />
            </Link>

            {!pc && (
              <>
                <Drawer
                  placement="top"
                  closable={false}
                  open={openDrawer}
                  contentWrapperStyle={{
                    height: "50vh",
                    borderRadius: "0 0 24px 24px",
                    overflow: "hidden",
                  }}
                  onClose={() => setOpenDrawer(false)}
                >
                  <Content />
                </Drawer>
                {/* Hamburger button */}
                <button
                  className="text-slate-500 hover:text-slate-600"
                  aria-controls="sidebar"
                  onClick={() => setOpenDrawer(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="5" width="16" height="2" />
                    <rect x="4" y="11" width="16" height="2" />
                    <rect x="4" y="17" width="16" height="2" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {loadingUserStatus ? (
              <Spin />
            ) : authUser ? (
              <UserMenu align="right" />
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
