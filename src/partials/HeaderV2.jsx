import React from "react";
import UserMenu from "../components/DropdownProfile";
import ProjectMenu from "../components/DropdownProject";
import Logo from "../components/icon/Logo";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex lg:hidden">
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

          <div>
            <Logo />
          </div>
          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/*  Divider */}
            <ProjectMenu align="right" />
            <hr className="w-px h-6 mx-3 bg-slate-200" />

            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
