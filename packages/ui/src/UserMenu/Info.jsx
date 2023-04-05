import { useAccount, useEnsName } from "wagmi";
import NetWork from "../Icon/NetWork";
import { logout } from "@/utils/web3";
import closeIcon from "@tbook/share/images/icon/close.svg";
import h5closeIcon from "@tbook/share/images/icon/h5close.svg";
import { useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import { useCurrentProject } from "@tbook/hooks";
import { conf } from "@tbook/utils";

const { shortAddress, chains } = conf;

export default function () {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const userStore = useSelector((state) => state.user.user);
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const { pc } = useResponsive();

  async function handleLogout() {
    await logout();
    window.location.href = `${location.origin}`;
  }
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex">
        <NetWork id={projectChain?.evmChainId || 1} />
        <span className="ml-1 lg:ml-2 text-[18px] lg:text-c7 dark:text-black">
          {ensName || shortAddress(userStore?.mainWallet)}
        </span>
      </div>

      <div onClick={handleLogout} className="flex items-center justify-center w-6 h-6 rounded-lg cursor-pointer">
        <img src={pc ? closeIcon : h5closeIcon} />
      </div>
    </div>
  );
}
