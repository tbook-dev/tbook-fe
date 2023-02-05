import clsx from "clsx";
import { useMemo } from "react";
import { targetMap, getDividePercent } from "@/utils/const";
import activePlan from "@/images/incentive/active-plan.png";

export default function ({ tip, pc }) {
  // console.log(tip);
  const conf = useMemo(() => {
    return [
      {
        title: "Option Pool Size",
        value: tip.tokenOptionsPoolSize,
      },
      {
        title: "Granted Token",
        value: `${tip.grantedTokenNum}(${getDividePercent(
          tip.grantedTokenNum,
          tip.totalTokenNum
        )})%`,
      },
      {
        title: "Vested Token",
        value: tip.vestedTokenNum,
      },
      {
        title: "Grantee",
        value: 1,
      },
      {
        title: "Grants",
        value: 2,
      },
    ];
  }, [tip]);

  return (
    <div
      className={clsx(
        "bg-cover lg:px-8 shadow-c2 border rounded-[10px] overflow-hidden relative",
        "w-[80vw] h-[200px] flex flex-col lg:w-[264px] lg:h-[194px]"
      )}
      style={{
        backgroundImage: `url(${!pc ? activePlan : null})`,
      }}
    >
      <div className="flex px-4 py-5">
        <p className="mr-2 text-base text-[#202124]">{tip.incentivePlanName}</p>
        <span className="border px-4  text-xs py-[3px] text-[#0049FF] border-[#0049FF] rounded-full">
          {tip.target == "7"
            ? tip.customized_target_name
            : targetMap[tip.target]}
        </span>
      </div>

      <div className="grid flex-auto grid-cols-1 bg-white gap-y-2 px-4 pt-4 pb-2.5">
        {conf.map((v) => {
          return (
            <div className="flex justify-between text-sm" key={v.title}>
              <p className="text-[#8C8C8C]">{v.title}</p>
              <p className="text-[#202124]">{v.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
