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
  const links = [
    {
      text: "About",
      href: "/about",
    },
    // {
    //   text: "Solution",
    //   href: "",
    // },

    // {
    //   text: "Resource",
    //   href: "",
    // },
    // {
    //   text: "RewardSphere",
    //   href: "https://rewardsphere.tbook.com/",
    // },
  ];

  const Content = () => {
    return (
      <div className="flex flex-col justify-between h-full pt-5 -mx-6">
        <div>
          {links.map((link) => {
            if (link.href) {
              if (link.href.startsWith("http")) {
                return (
                  <a
                    href={link.href}
                    key={link.text}
                    onClick={() => setOpenDrawer(false)}
                    target="_blank"
                    className="flex items-center px-8 font-medium h-14 text-cwh2"
                  >
                    <span className="text-c-6">{link.text}</span>
                  </a>
                );
              } else {
                return (
                  <NavLink
                    onClick={() => setOpenDrawer(false)}
                    to={link.href}
                    key={link.text}
                    className="flex items-center px-8 font-medium h-14 text-cwh2"
                  >
                    {({ isActive }) => {
                      return <span className={clsx(isActive ? "font-bold text-white" : "text-c-6")}> {link.text}</span>;
                    }}
                  </NavLink>
                );
              }
            } else {
              return (
                <span key={link.text} className="flex items-center px-8 font-medium h-14 text-cwh2 text-c-6">
                  {link.text}
                </span>
              );
            }
          })}
        </div>
      </div>
    );
  };
  return (
    <header className="sticky top-0 z-30 dark:bg-black dark:lg:shadow-d2">
      <div className="px-4 lg:px-16">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>
          </div>

          {pc ? (
            <div className="flex items-center space-x-12">
              {links.map((link) => {
                if (link.href) {
                  if (link.href.startsWith("http")) {
                    return (
                      <a href={link.href} key={link.text} target="_blank" className="font-bold dark:text-c-9 text-c1">
                        {link.text}
                      </a>
                    );
                  } else {
                    return (
                      <NavLink to={link.href} key={link.text} className="font-bold text-c1">
                        {({ isActive }) => {
                          return (
                            <span
                              className={clsx(isActive ? "font-bold text-white" : "hover:text-white dark:text-c-9")}
                            >
                              {link.text}
                            </span>
                          );
                        }}
                      </NavLink>
                    );
                  }
                } else {
                  return (
                    <span key={link.text} className="font-medium text-c1 dark:text-c-9">
                      {link.text}
                    </span>
                  );
                }
              })}
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
    </header>
  );
}

export default Header;
