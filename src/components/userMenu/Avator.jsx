import React from "react";
import { useSelector } from "react-redux";
import { useAccount, useEnsName } from "wagmi";
import { shortAddress } from "@/utils/const";
import clsx from "clsx";
import NetWork from "../icon/NetWork";


function Avator({ setOpen, open, id }) {
  const userStore = useSelector((state) => state.user.user);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div
      className={clsx(
        "flex items-center px-6 rounded-lg cursor-pointer lg:h-10 dark:shadow-d3",
        open ? "bg-cw1 dark:shadow-d7" : "bg-[#141414]"
      )}
      onClick={setOpen}
    >
      <div
        className={clsx(
          "w-9 h-9 lg:w-6 lg:h-6 rounded-full  flex justify-center items-center mr-1 shadow-d4"
        )}
      >
       <NetWork id={id} />
      </div>
      <span
        className={clsx(
          "hidden lg:block text-c1",
          clsx(open ? "dark:text-white  font-bold" : "dark:text-c-9 font-medium")
        )}
      >
        {ensName || shortAddress(userStore?.mainWallet)}
      </span>
    </div>
  );
}

export default Avator;
