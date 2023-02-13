import clsx from "clsx";
import { useMemo } from "react";
import { targetMap, getDividePercent, formatDollar } from "@/utils/const";
import activePlan from "@/images/incentive/active-plan.png";
import bgpc from "@/images/incentive/all-plan-ap.png";

export default function ({ tip, pc }) {
  const conf = useMemo(() => {
    return [
      {
        title: "Option Pool Size",
        value: formatDollar(tip.tokenOptionsPoolSize),
      },
      {
        title: "Granted Token",
        value: `${formatDollar(tip.grantedTokenNum)}(${getDividePercent(
          tip.grantedTokenNum,
          tip.totalTokenNum
        )})%`,
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
    ];
  }, [tip]);

  return (
    <div
      className={clsx(
        "flex flex-col justify-between bg-cover shadow-c2 rounded-lg overflow-hidden relative",
        "w-[80vw] h-[180px] flex flex-col lg:w-[264px]"
      )}
      style={{
        backgroundImage: `url(${pc ? bgpc : activePlan})`,
      }}
    >
      <div className="flex items-center px-4 py-2.5">
        <p className="max-w-[50%] truncate mr-2 text-base leading-none m-0 lg:text-xl lg:leading-[24px] text-[#202124]">
          {tip.incentivePlanName}
        </p>
        <span className="max-w-[50%] truncate border m-0 flex items-center px-4 text-xs leading-[16px] py-px lg:leading-[20px]  text-[#0049FF] border-[#0049FF] rounded	 lg:rounded-md">
          {tip.target == "7"
            ? tip.customized_target_name
            : targetMap[tip.target]}
        </span>
      </div>

      <div className="flex-auto grid grid-cols-1 bg-white gap-y-2 lg:gap-y-1 px-4 pt-4 pb-2.5 lg:py-6">
        {conf.map((v) => {
          return (
            <div
              className="flex justify-between text-xs leading-4 lg:text-xs lg:leading-[14px]"
              key={v.title}
            >
              <p className="text-[#666]">{v.title}</p>
              <p className="text-[#333]">{v.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
