import React from "react";
import UserMenu from "../components/DropdownProfile";
import Logo from "../components/icon/Logo";
import ProjectMenu from "../components/DropdownProject";

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div>
            <Logo />
          </div>
          <div className="flex items-center space-x-3">
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
