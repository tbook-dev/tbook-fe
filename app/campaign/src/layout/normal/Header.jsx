import { Link } from "react-router-dom";
import logo from "@/images/icon/logo.svg";
import clsx from "clsx";
import Links from "../common/Links";
import MobleMenu from "../common/MobleMenu";
import { useResponsive } from "ahooks";
import useUserInfo from "@/hooks/useUserInfoQuery";
import { useDispatch } from "react-redux";
import { setConnectWalletModal } from "@/store/global";
import { Spin } from "antd";
import { useAccount } from 'wagmi'
import { useWeb3Modal } from "@web3modal/wagmi/react";

function Header() {
  const { pc } = useResponsive();
  const { isConnected } = useAccount()
  const { userLogined, firstLoad, user } = useUserInfo();
  const dispath = useDispatch();
  const { open } = useWeb3Modal();
  const handleClick = () => {
    dispath(setConnectWalletModal(true));
  };
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

          
          <div>
            {!firstLoad ? (
              <Spin spinning size="small" />
            ) : (userLogined && isConnected) ? (
              <div className="flex items-center gap-x-2">
                <img
                  src={user?.avatar}
                  className="w-7 h-7 object-contain object-center rounded-full"
                  onClick={open}
                />
                <MobleMenu />
                <div className="hidden lg:flex items-center space-x-3">
                  <w3m-button icon="show" balance="hide" avatar="hide" />
                </div>
              </div>
            ) : (
              <button className="px-2 py-1 text-sm" onClick={handleClick}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
