import React from "react";
import UserMenu from "@/components/DropdownProfile";
import { useSelector } from "react-redux";
import Connect from "@/components/connect";
import logoText from "@/images/icon/logo-text.svg";
import logo from "@/images/icon/logo.svg";
import { useResponsive } from "ahooks";
import { Link } from "react-router-dom";

function Header({ sidebarOpen, setSidebarOpen }) {
  const authUser = useSelector((state) => state.user.authUser);
  const { pc } = useResponsive();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <Link to="/incentive">
              <img src={pc ? logoText : logo} className="mr-2 h-9 lg:h-auto"/>
            </Link>

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
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
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {authUser ? <UserMenu align="right" /> : <Connect />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
