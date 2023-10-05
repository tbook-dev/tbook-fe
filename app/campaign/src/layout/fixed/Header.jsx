import { Link } from "react-router-dom";
import logo from "@/images/icon/logo.svg";
import { Web3Button } from "@web3modal/react";
import clsx from "clsx";
import { useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import Links from "../common/Links";
import MobleMenu from "../common/MobleMenu";

function Header() {
  const { pc } = useResponsive();
  const headerTransparent = useSelector((s) => s.global.headerTransparent);
  return (
    <header
      className={clsx(
        "top-0 z-30 fixed inset-x-0 text-black dark:text-white shadow-d2",
        "transition duration-300 ease-in-out",
        pc && headerTransparent ? "bg-transpant " : "bg-white dark:bg-black"
      )}
    >
      <div className="px-4 py-2 lg:px-20 lg:py-2.5">
        <div className="flex items-center justify-between h-10 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-6 lg:h-10 object-contain" />
            </Link>
          </div>

          <Links hidden={!pc}/>

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
