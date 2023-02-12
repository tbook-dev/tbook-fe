import clsx from "clsx";
import { targetMap, getDividePercent, formatDollar } from "@/utils/const";
import { useMemo } from "react";
import inActivePlan from "@/images/incentive/inactive-plan.png";
import bgpc from "@/images/incentive/all-plan.png";

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
    ];
  }, [tip]);

  return (
    <div className="w-[70vw] h-[180px] py-2.5 px-0 lg:w-[220px] lg:h-[136px] lg:py-0 lg:px-0">
      <div
        className={clsx(
          "bg-cover shadow-c2 border rounded-2xl overflow-hidden relative",
          "h-full flex flex-col-reverse  justify-between lg:flex-col"
        )}
        style={{
          backgroundImage: `url(${pc ? bgpc : inActivePlan})`,
        }}
      >
        <div className="flex items-center px-4 pt-4 pb-6 lg:pb-0 lg:pt-5">
          <p className="max-w-[80px] truncate mr-2 text-base leading-none m-0 lg:text-xl lg:leading-none text-[#202124]">
            {tip.incentivePlanName}
          </p>
          <span className="max-w-[80px] truncate border m-0 flex items-center px-4 text-xs leading-none py-[3px] text-[#0049FF] border-[#0049FF] rounded-full">
            {tip.target == "7"
              ? tip.customized_target_name
              : targetMap[tip.target]}
          </span>
        </div>

        <div className="hidden grid-cols-1 px-4 pt-4 pb-5 lg:grid gap-y-2 lg:gap-y-1 lg:pt-0">
          {conf.map((v) => {
            return (
              <div
                className="flex justify-between text-sm lg:text-xs lg:leading-[14px]"
                key={v.title}
              >
                <p className="text-[#8C8C8C]">{v.title}</p>
                <p className="text-[#202124]">{v.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
