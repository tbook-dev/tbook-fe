import { Spin } from "antd";
import clsx from "clsx";

export default function ({ h = "h-[200px]" }) {
  return (
    <div className={clsx("flex items-center justify-center w-full", h)}>
      <Spin />
    </div>
  );
}
