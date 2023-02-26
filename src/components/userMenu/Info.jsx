import { useAccount, useEnsName } from "wagmi";
import NetWork from "../icon/NetWork";
import { shortAddress } from "@/utils/const";
import { logout } from "@/utils/web3";
import closeIcon from "@/images/icon/close.svg";
import { useSelector } from "react-redux";
import useCurrentProject from "@/hooks/useCurrentProject";
import { chains } from "@/utils/const";

export default function () {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const userStore = useSelector((state) => state.user.user);
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);

  async function handleLogout() {
    await logout();
    window.location.href = `${location.origin}`;
  }
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex">
        <NetWork id={projectChain?.evmChainId || 1} />
        <span className="lg:ml-2 text-[18px] lg:text-c7 dark:text-black">
          {ensName || shortAddress(userStore?.mainWallet)}
        </span>
      </div>

      <div
        onClick={handleLogout}
        className="cursor-pointer w-6 h-6 bg-[#ECF1FF] rounded-lg flex items-center justify-center"
      >
        <img src={closeIcon} />
      </div>
    </div>
  );
}
