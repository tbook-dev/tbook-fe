import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Spin } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import { UserMenu, Connect } from "@tbook/ui";
import { useSelector } from "react-redux";
import logo from "@tbook/share/images/icon/logo.svg";

import menu from "./menu";

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const loadingUserStatus = useSelector((state) => state.user.loadingUserStatus);
  const { pc } = useResponsive();

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-black shadow-d2">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>

            {pc && (
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
