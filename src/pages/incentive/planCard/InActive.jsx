import clsx from "clsx";
import { targetMap } from "@/utils/const";

import inActivePlan from "@/images/incentive/inactive-plan.png";

export default function ({ tip, pc }) {
  return (
    <div
      className={clsx(
        "bg-cover lg:px-8 shadow-c2 border rounded-[10px] overflow-hidden relative",
        "w-[70vw] h-[180px] flex flex-col-reverse lg:flex-col lg:w-[220px] lg:h-[136px]"
      )}
      style={{
        backgroundImage: `url(${!pc ? inActivePlan : null})`,
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
    </div>
  );
}
