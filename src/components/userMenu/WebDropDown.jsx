import React from "react";
import { Popover } from "antd";
import Avator from "./Avator";
import Info from "./Info";

export default function ({ open, setOpen }) {
  const Content = () => (
    <div className="-mx-6 lg:-mx-3 lg:w-[330px]">
      <Info />
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
