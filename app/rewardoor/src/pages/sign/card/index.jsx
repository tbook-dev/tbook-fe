import clsx from "clsx";
import React from "react";

export default function ({ title, list = [], className, children }) {
  return (
    <div
      className={clsx(
        "bg-[#f6fafe] dark:bg-black divide-y divide-b-1 rounded-md shadow-d3 lg:pt-4 lg:pb-1.5 lg:rounded-lg overflow-hidden",
        className
      )}
    >
      {title && (
        <h2 className="text-[#333] dark:text-white font-medium px-4 h-10 flex items-center text-c12 lg:px-6 lg:text-cwh2">
          {title}
        </h2>
      )}

      {list.map((v) => {
        return v.value ? (
          <div key={v.label} className="flex items-center h-10 px-4 lg:px-6 text-c2">
            <span className="flex-[10] text-[#666] dark:text-b-8">{v.label}</span>
            <span className="flex-[14] dark:text-white text-right lg:text-left">
              {typeof v.value === "function" ? <v.value /> : v.value}
            </span>
          </div>
        ) : null;
      })}
      {children}
    </div>
  );
}
