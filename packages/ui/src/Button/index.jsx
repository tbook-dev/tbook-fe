import React from "react";
import clsx from "clsx";
import { LoadingOutlined } from "@ant-design/icons";

// 默认 背景主题色，文字黑色，其他颜色由class控制
// loading的时候，转圈并且disable
export default function Button({ className, disabled, loading, loadingColor = "white", children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "bg-cw1 dark:text-black lg:hover:opacity-70",
        "py-2.5 px-4 rounded-md",
        "text-c9 lg:text-c1 font-medium",
        "disabled:lg:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading && <LoadingOutlined style={{ fontSize: 12, color: loadingColor, marginRight: 6 }} spin />}
      {children}
    </button>
  );
}
