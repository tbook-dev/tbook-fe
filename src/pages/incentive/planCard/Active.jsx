import clsx from "clsx";
import { useMemo } from "react";
import { getDividePercent, formatDollar } from "@/utils/const";
import useFindAudience from "@/hooks/useFindAudience";

export default function ({ tip, pc, isActive }) {
  const conf = useMemo(() => {
    return isActive
      ? [
          {
            title: "Option Pool Size",
            value: formatDollar(tip.tokenOptionsPoolSize),
          },
          {
            title: "Granted Token",
            value: `${formatDollar(tip.grantedTokenNum)}(${getDividePercent(
              tip.grantedTokenNum,
              tip.totalTokenNum
            )}%)`,
          },
          {
            title: "Vested Token",
            value: formatDollar(tip.vestedTokenNum),
          },
          {
            title: "Grantee",
            value: tip.granteeNum,
          },
          {
            title: "Grants",
            value: tip.grantsNum,
          },
        ]
      : [
          {
            title: "Option Pool Size",
            value: formatDollar(tip.tokenOptionsPoolSize),
          },
          {
            title: "Granted Token",
            value: `${formatDollar(tip.grantedTokenNum)}(${getDividePercent(
              tip.grantedTokenNum,
              tip.totalTokenNum
            )}%)`,
          },
        ];
  }, [tip, isActive]);

  const findAudience = useFindAudience();
  const targetAudience = findAudience(tip.target);

  return (
    <div
      className={clsx(
        "flex flex-col justify-between bg-cover shadow-c2 rounded-lg overflow-hidden relative",
        "w-[80vw] h-[180px] flex flex-col lg:w-[218px] lg:h-[140px] dark:shadow-d5",
        isActive ? "dark:bg-cw1 " : "dark:bg-black  dark:hover:bg-cw2"
      )}
    >
      <div className="flex items-center justify-between px-4 lg:pt-2.5">
        <p
          className={clsx(
            "max-w-[96px] truncate text-ellipsis font-medium text-base leading-none m-0 lg:text-c3",
            isActive ? "text-black" : "text-white"
          )}
        >
          {tip.incentivePlanName}
        </p>
        {targetAudience && (
          <span
            className={clsx(
              "w-[96px] truncate text-center border text-xs leading-[16px] py-px lg:text-c4 lg:px-2 rounded",
              isActive ? "text-black border-black" : "text-white border-white"
            )}
          >
            {targetAudience}
          </span>
        )}
      </div>

      <div
        className={clsx(
          "flex-none grid grid-cols-1 gap-y-2 lg:gap-y-1 px-4 pt-4 pb-2.5 lg:pt-0 lg:py-6",
          isActive ? "lg:pb-1" : "lg:pb-4"
        )}
      >
        {conf.map((v) => {
          return (
            <div
              className="flex justify-between leading-4 lg:text-c4"
              key={v.title}
            >
              <p
                className={clsx(
                  "font-normal",
                  isActive ? "text-l-8" : "text-b-8 font-medium"
                )}
              >
                {v.title}
              </p>
              <p
                className={clsx(
                  "font-medium max-w-[90px] truncate",
                  isActive ? "text-black" : "text-white"
                )}
              >
                {v.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
