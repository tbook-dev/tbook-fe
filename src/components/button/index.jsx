import { Button } from "antd";
import clsx from "clsx";

export default function ({ className, ...props }) {
  return (
    <Button
      className={clsx("dark:!bg-white dark:!text-black", className)}
      {...props}
    />
  );
}
