import { Link } from "react-router-dom";
import clsx from "clsx";
import { useResponsive } from "ahooks";
import Links from "./Links";
import MobleMenu from "./MobleMenu";
import { useParams } from "react-router-dom";
import useProjectQuery from "@/hooks/useProjectQuery";
import useUserInfo from "@/hooks/useUserInfoQuery";
import { useDispatch } from "react-redux";
import { setConnectWalletModal } from "@/store/global";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import UserAddress from "../common/UserAddress";
import AvatarSkeleton from "../common/AvatarSkeleton";
import { Skeleton } from "antd";
import LazyImage from "@/components/lazyImage";


function Header() {
  const { pc } = useResponsive();
  const { projectId } = useParams();
  const { isConnected } = useAccount();
  const { data: project } = useProjectQuery(projectId);
  const { userLogined, firstLoad, user } = useUserInfo();
  const dispath = useDispatch();
  const { open } = useWeb3Modal();
  const handleClick = () => {
    dispath(setConnectWalletModal(true));
  };

  return (
    <header
      className={clsx(
        "top-0 z-30 sticky inset-x-0 text-black dark:text-white shadow-d2",
        "transition duration-300 ease-in-out"
      )}
    >
      <div className="px-4 py-2 lg:px-20 lg:py-2.5">
        <div className="flex items-center justify-between h-10 lg:h-16">
          <div className="flex items-center">
            <Link to={`/app/${projectId}/campaign`} className="mr-1 lg:mr-16">
              {!firstLoad ? (
                <Skeleton.Avatar />
              ) : (
                <LazyImage
                  src={project?.avatarUrl}
                  alt="logo"
                  className="h-6 lg:h-10 object-contain"
                />
              )}
            </Link>
          </div>

          <Links hidden={!pc} />

          <div>
            {!firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined && isConnected ? (
              <div className="flex items-center gap-x-2">
                <img
                  src={user?.avatar}
                  className="w-7 h-7 object-contain object-center rounded-full"
                  onClick={async () => await open()}
                />
                <MobleMenu />
                <div className="hidden lg:flex items-center space-x-3">
                  <UserAddress />
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
