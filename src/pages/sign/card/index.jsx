import clsx from "clsx";
import React from "react";

export default function ({ title, list = [], className, children }) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-black divide-y divide-b-1 rounded-md shadow-d3 lg:py-4 lg:rounded-lg overflow-hidden",
        className
      )}
    >
      {title && (
        <h2 className="text-[#333] dark:text-white font-medium px-4 py-1.5 text-[20px] leading-[24px] lg:px-6 lg:py-1 lg:text-cwh2">
          {title}
        </h2>
      )}

      {list.map((v) => {
        return v.value ? (
          <div key={v.label} className="flex px-4 lg:py-2 lg:px-6 py-3 text-[14px]">
            <span className="flex-[10] leading-[16px] text-[#666] dark:text-b-8 lg:text-c1">
              {v.label}
            </span>
            <span className="flex-[14] text-right dark:text-white lg:text-left leading-[18px] lg:lg:text-c1">
              {typeof v.value === "function" ? <v.value /> : v.value}
            </span>
          </div>
        ) : null;
      })}
      {children}
    </div>
  );
}
