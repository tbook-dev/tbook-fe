import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import incentiveIcon1 from "@tbook/share/images/icon/incentive1.svg";
import incentiveIcon2 from "@tbook/share/images/icon/incentive2.svg";
import dashboardIcon1 from "@tbook/share/images/icon/dashboard1.svg";
import dashboardIcon2 from "@tbook/share/images/icon/dashboard2.svg";
import settingIcon1 from "@tbook/share/images/icon/setting1.svg";
import settingIcon2 from "@tbook/share/images/icon/setting2.svg";
import SwitchNet from "@/components/connect/switch";
import { useResponsive } from "ahooks";
import useCurrentProject from "@/hooks/useCurrentProject";
import { chains } from "@/utils/const";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const { pc } = useResponsive();
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  // console.log('projectChain', projectChain)
  const authUser = useSelector((state) => state.user.authUser);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="fixed top-0 left-0 z-40 h-screen lg:top-16">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col bg-slate-800 lg:bg-transparent absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-24 lg:sidebar-expanded:!w-24 2xl:!w-24 shrink-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-24"
        }`}
      >
        <div className="flex justify-between pr-3 mb-10 sm:px-2 lg:hidden">
          <button
            ref={trigger}
            className="text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-auto mt-6">
          {/* Pages group */}
          <div className="flex flex-col justify-between h-full max-h-[900px]">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    "flex flex-col items-center justify-center h-20 transition duration-150 mb-6",
                    isActive
                      ? "text-[#0049FF] rounded-r-2xl bg-[#ECF1FF]"
                      : "text-[#606368]"
                  )
                }
              >
                {({ isActive }) => {
                  return (
                    <>
                      <img src={isActive ? incentiveIcon2 : incentiveIcon1} />
                      <span className="mt-1 text-xs">
                        Incentive
                      </span>
                    </>
                  );
                }}
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  clsx(
                    "flex flex-col items-center justify-center h-20 transition duration-150 mb-6",
                    isActive
                      ? "text-[#0049FF] rounded-r-2xl bg-[#ECF1FF]"
                      : "text-[#606368]"
                  )
                }
              >
                {({ isActive }) => {
                  return (
                    <>
                      <img src={isActive ? dashboardIcon2 : dashboardIcon1} />
                      <span className="mt-1 text-xs">
                        Dashboard
                      </span>
                    </>
                  );
                }}
              </NavLink>
            </div>

            {authUser && (
              <div className="pb-[145px]">
                {/* 1、当前项目的网络; 2、默认以太坊*/}
                {pc && (
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <SwitchNet
                      type="logo"
                      placement="right"
                      networkId={projectChain?.evmChainId || 1}
                    />
                  </div>
                )}

                {/* <NavLink
                  to="/setting"
                  className="flex flex-col items-center justify-center h-20 transition duration-150"
                >
                  {({ isActive }) => {
                    return <img src={isActive ? settingIcon2 : settingIcon1} />;
                  }}
                </NavLink> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
