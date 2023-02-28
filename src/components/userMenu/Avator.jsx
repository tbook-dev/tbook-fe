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
        "flex items-center lg:px-6 rounded-lg cursor-pointer lg:dark:hover:bg-cw1 lg:dark:hover:text-white lg:dark:hover:shadow-d7 lg:h-10 lg:dark:shadow-d3",
        open
          ? "lg:bg-cw1 lg:dark:shadow-d7 lg:dark:text-white"
          : "lg:bg-[#141414] dark:text-c-9"
      )}
      onClick={setOpen}
    >
      <div
        className={clsx(
          "hidden lg:w-6 lg:h-6  lg:flex justify-center items-center mr-1 shadow-d4"
        )}
      >
        <NetWork id={id} />
      </div>
      <span className={clsx("hidden lg:block text-c1")}>
        {ensName || shortAddress(userStore?.mainWallet)}
      </span>

      <div className="flex items-center justify-center rounded-full lg:hidden w-9 h-9 bg-b-1">
        <img src={userStore?.avatar} className="w-5 h-5"/>
      </div>
    </div>
  );
}

export default Avator;
