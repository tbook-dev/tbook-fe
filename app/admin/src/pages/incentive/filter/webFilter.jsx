import clsx from "clsx";
import filterIcon from "@tbook/share/images/icon/filter.svg";
import closeIcon from "@tbook/share/images/icon/close3.svg";
import { useCallback, useEffect, useReducer } from "react";
import { filterReducer, initialFilters } from "@/store/parts";

export default function ({ filters, setOpen, filterOpitons, dispatch }) {
  return (
    <div className="w-full px-4 py-6 space-y-4 rounded-lg shadow-l7">
      {filterOpitons.map((conf) => {
        return (
          <div key={conf.group}>
            <h3 className="mb-3 font-bold dark:text-white text-c-3 text-c17">{conf.group}</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {conf.list.map((v) => {
                return (
                  <div
                    key={v.value}
                    onClick={() => {
                      // dispatchFilter({
                      //   type: conf.group,
                      //   payload: {
                      //     value: v.value,
                      //     isNegate: true,
                      //   },
                      // });
                    }}
                    className={clsx(
                      "w-full text-c4 h-7 px-1  flex justify-center items-center truncate text-ellipsis rounded hover:opacity-70",
                      filters[conf.group] === v.value
                        ? "bg-cw1 text-black font-bold cursor-pointer"
                        : v.disabled
                        ? "bg-[#191919] text-b-1 font-medium"
                        : "bg-[#191919] text-c-6 font-medium cursor-pointer"
                    )}
                  >
                    {v.label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
