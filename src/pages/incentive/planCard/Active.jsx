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
        "flex flex-col justify-between bg-cover shadow-c2 border rounded-2xl overflow-hidden relative",
        "w-[80vw] h-[180px] flex flex-col lg:w-[264px] lg:h-[194px]"
      )}
      style={{
        backgroundImage: `url(${pc ? bgpc : activePlan})`,
      }}
    >
      <div className="flex items-center px-4 py-2.5">
        <p className="mr-2 text-base leading-none m-0 lg:text-xl lg:leading-none text-[#202124]">
          {tip.incentivePlanName}
        </p>
        <span className="border m-0 flex items-center px-4 text-xs leading-none py-[3px] text-[#0049FF] border-[#0049FF] rounded-full">
          {tip.target == "7"
            ? tip.customized_target_name
            : targetMap[tip.target]}
        </span>
      </div>

      <div className="grid grid-cols-1 bg-white gap-y-2 lg:gap-y-1 px-4 pt-4 lg:pt-0 pb-2.5">
        {conf.map((v) => {
          return (
            <div
              className="flex justify-between text-xs leading-4 lg:text-xs lg:leading-[14px]"
              key={v.title}
            >
              <p className="text-[#8C8C8C]">{v.title}</p>
              <p className="text-[#202124]">{v.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
