import { Button } from "antd";
import clsx from "clsx";

export default function ({ className, ...props }) {
  return (
    <Button
      className={clsx(
        "dark:!text-white dark:!bg-black dark:!shadow-d3 dark:hover:!font-medium dark:border-none",
        className
      )}
      {...props}
    />
  );
}
