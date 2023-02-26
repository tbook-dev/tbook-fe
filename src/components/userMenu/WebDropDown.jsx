import React from "react";
import { Popover } from "antd";
import Avator from "./Avator";
import Info from "./Info";
import useCurrentProject from "@/hooks/useCurrentProject";
import { chains } from "@/utils/const";
import NetWork from "../icon/NetWork";


export default function ({ open, setOpen }) {
  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const id = projectChain?.evmChainId || 1;

  const Content = () => (
    <div className="-mx-6 lg:-mx-3">
      <div className="px-6 pt- pb-5 pt-3 w-[306px]">
        <Info />
        <>
          <div className="flex items-center justify-between text-c6 lg:h-10">
            <span className="dark:text-l-8">Network</span>
            <span className="flex items-center font-medium cursor-pointer dark:text-black">
              <NetWork id={id} />
              <span className="ml-2">{projectChain?.name}</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-c6 lg:h-10">
            <span className="dark:text-l-8">Theme</span>
            <span className="font-medium cursor-pointer dark:text-black">Dark</span>
          </div>
        </>
      </div>
    </div>
  );

  

  return (
    <Popover
      open={open}
      // open
      content={<Content />}
      placement="bottomRight"
      onOpenChange={(v) => setOpen(v)}
    >
      <Avator
        setOpen={() => {
          setOpen(true);
        }}
        open={open}
      />
    </Popover>
  );
}
