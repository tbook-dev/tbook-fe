import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import defaultAvator from "@/images/icon/defaultAvator.svg";
import { shortAddress } from "@tbook/utils/lib/conf";
import { useState } from "react";
import useSocial from "@/hooks/useSocial";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function PersonalInfo() {
  const { data, userLogined } = useUserInfoQuery();
  const [mainColor, setMainColor] = useState(null);
  const { socialList } = useSocial();
  const { open } = useWeb3Modal();

  return (
    <div className="pt-4 flex flex-col items-center gap-y-4">
      <img
        src={data?.user?.avatar ?? defaultAvator}
        alt="user avatar"
        className="w-20 h-20 rounded-full"
      />

      {userLogined && (
        <p className="text-[#131517] text-base font-medium cursor-pointer" onClick={open}>
          {shortAddress(data?.user?.wallet)}
        </p>
      )}

      <div className="flex items-center gap-x-3">
        {socialList.map((v) => {
          const logo = (
            <img
              src={v.connected ? v.activePic : v.picUrl}
              className="w-4 h-4 object-contain object-center"
            />
          );
          return v.connected ? (
            <span key={v.name}>{logo}</span>
          ) : (
            <button
              key={v.name}
              onClick={userLogined ? v.loginFn : null}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {logo}
            </button>
          );
        })}
      </div>
    </div>
  );
}
