import React from "react";
import UserMenu from "@/components/userMenu";
import { useSelector } from "react-redux";
import Connect from "@/components/connect";
import logo from "@/images/icon/logo.svg";
import { Link } from "react-router-dom";
import { Spin } from "antd";

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const loadingUserStatus = useSelector(
    (state) => state.user.loadingUserStatus
  );

  return (
    <header className="sticky top-0 z-30 dark:bg-black dark:shadow-d2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <Link to="/" className="lg:mr-16">
              <img src={logo} className="h-7" />
            </Link>
            <div className="items-center hidden lg:flex">
              <Link to="/" className="mr-12 font-bold dark:text-white text-c1">
                INCENTIVE
              </Link>
              <span className="font-medium text-c1 dark:text-c-9">
                TOKENTABLE
              </span>
            </div>
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
