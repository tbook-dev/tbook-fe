import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import logo from "@tbook/share/images/icon/logo.svg";
import menuIcon from "@tbook/share/images/icon/menu.svg";
import DarkProvider from "@/theme/DarkProvider";
import MobleMenu from "./MobleMenu";

const links = [
  {
    text: "Home",
    anchor: "home",
  },
  {
    text: "Solution",
    anchor: "solution",
  },
  {
    text: "About",
    anchor: "about",
  },
  {
    text: "Blog",
    anchor: "blog",
  },
  {
    text: "Contact",
    anchor: "contact",
  },
];

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pc } = useResponsive();

  return (
    <header className="sticky top-0 z-30">
      <div className="bx px-4 lg:px-0">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-8 lg:h-7" />
            </Link>
          </div>

          {pc ? (
            <div className="flex items-center space-x-12">
              {links.map((link) => {
                return (
                  <a
                    key={link.anchor}
                    href={`#${link.anchor}`}
                    className="text-[#131517] font-medium hover:opacity-70"
                  >
                    {link.text}
                  </a>
                );
              })}
            </div>
          ) : (
            <MobleMenu links={links} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
