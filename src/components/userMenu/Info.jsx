import { useAccount, useEnsName } from "wagmi";
import NetWork from "../icon/NetWork";
import { shortAddress } from "@/utils/const";
import { logout } from "@/utils/web3";
import closeIcon from "@/images/icon/close.svg";
import { useSelector } from "react-redux";


export default function () {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const userStore = useSelector((state) => state.user.user);

  
  async function handleLogout() {
    await logout();
    window.location.href = `${location.origin}`;
  }
  return (
    <div className="relative flex items-center justify-center w-full px-6 pb-2.5 shadow-c9">
      <div className="flex h-full">
        <NetWork />
        <span className="text-[18px] lg:leading-[20px] text-[#333]">
          {ensName || shortAddress(userStore?.mainWallet)}
        </span>
      </div>

      <div className="absolute top-[-3px] flex items-center justify-end right-6">
        <div
          onClick={handleLogout}
          className="cursor-pointer w-6 h-6 bg-[#ECF1FF] rounded-lg flex items-center justify-center"
        >
          <img src={closeIcon} />
        </div>
      </div>
    </div>
  );
}
