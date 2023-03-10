import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import logo from "@tbook/share/images/icon/logo.svg";
import menuIcon from "@tbook/share/images/icon/menu.svg";
import DarkProvider from "@/theme/DarkProvider";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pc } = useResponsive();

  const Content = () => {
    return (
      <div className="flex flex-col justify-between h-full pt-5 -mx-6">
        <div>
          <NavLink to="/" className={({ isActive }) => clsx("flex h-14 items-center px-8 text-cwh2")}>
            {({ isActive }) => {
              return <span className="font-bold text-white">Incentive</span>;
            }}
          </NavLink>

          <NavLink to="/" className={({ isActive }) => clsx("flex h-14 items-center px-8 text-cwh2")}>
            {({ isActive }) => {
              return <span className="text-[#666]">Tokentable</span>;
            }}
          </NavLink>
        </div>
      </div>
    );
  };
  return (
    <header className="sticky top-0 z-30 dark:bg-black dark:shadow-d2">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>

            {pc ? (
              <div className="items-center hidden lg:flex">
                <Link to="/" className="mr-12 font-bold dark:text-white text-c1">
                  INCENTIVE
                </Link>
                <span className="font-medium text-c1 dark:text-c-9">TOKENTABLE</span>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
