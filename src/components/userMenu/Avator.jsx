import React from "react";
import { useSelector } from "react-redux";
import { useAccount, useEnsName } from "wagmi";
import { shortAddress } from "@/utils/const";
import clsx from "clsx";

function Avator({ setOpen, open }) {
  const userStore = useSelector((state) => state.user.user);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div
      className="flex items-center px-6 rounded-lg cursor-pointer lg:h-10 dark:shadow-d3"
      onClick={setOpen}
    >
      <div
        className={clsx(
          "w-9 h-9 lg:w-6 lg:h-6 rounded-full  flex justify-center items-center mr-1 shadow-d4",
          open ? "bg-[#0049FF]" : "bg-[#141414]"
        )}
      >
        <img src={userStore?.avatar} className="lg:w-[14px] w-[25px]" />
      </div>
      <span
        className={clsx(
          "hidden lg:block text-c1",
          clsx(open ? "text-[#0049FF]" : "dark:text-c-9")
        )}
      >
        {ensName || shortAddress(userStore?.mainWallet)}
      </span>
    </div>
  );
}

export default Avator;
