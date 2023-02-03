import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/icon/Logo";
import { useSelector } from "react-redux";
import clsx from "clsx";
import SidebarLinkGroup from "../partials/SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const authUser = useSelector((state) => state.user.authUser);

  const location = useLocation();
  const { pathname } = location || {};

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

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

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="fixed top-0 left-0 h-[900px]">
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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-24 lg:sidebar-expanded:!w-24 2xl:!w-24 shrink-0 transition-all duration-200 ease-in-out ${
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
        <div className="flex-auto mt-16">
          {/* Pages group */}
          <div className="flex flex-col justify-between h-full max-h-[900px]">
            <div>
              <NavLink
                to="/incentive"
                className={({ isActive }) =>
                  clsx(
                    "flex items-center justify-between h-20  transition duration-150 truncate ",
                    isActive ? "!text-indigo-500" : ""
                    // {'pointer-events-none': !authUser}
                  )
                }
              >
                <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Incentive
                </span>
              </NavLink>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate ",
                    isActive ? "!text-indigo-500" : ""
                  )
                }
              >
                <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Dashboard
                </span>
              </NavLink>
            </div>

            <div className="pb-[145px]">
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  clsx(
                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate ",
                    isActive ? "!text-indigo-500" : ""
                  )
                }
              >
                <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  setting
                </span>
              </NavLink>
            </div>
          </div>
          {/* More group */}
        </div>

        {/* Expand / collapse button */}
        <div className="justify-end hidden pt-3 mt-auto lg:hidden 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
