import { Link } from "react-router-dom";
import logo from "@/images/icon/logo.svg";
import { Web3Button } from "@web3modal/react";
import clsx from "clsx";
import Links from "./Links";
import MobleMenu from "./MobleMenu";
import { useResponsive } from "ahooks";

function Header() {
  const { pc } = useResponsive();
  return (
    <header
      className={clsx(
        "top-0 z-30  text-black dark:text-white shadow-d2",
        "transition duration-300 ease-in-out",
        "sticky bg-white dark:bg-black"
      )}
    >
      <div className="px-4 py-2 lg:px-20 lg:py-2.5">
        <div className="flex items-center justify-between h-10 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-6 lg:h-10 object-contain" />
            </Link>
          </div>

          <Links hidden={!pc} />

          <div className="hidden lg:flex items-center space-x-3">
            <Web3Button icon="show" balance="hide" avatar="hide" />
          </div>
          <MobleMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;