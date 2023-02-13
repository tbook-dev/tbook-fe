import clsx from "clsx";
import bgpc from "@/images/incentive/all-plan.png";
import bg from "@/images/incentive/inactive-plan.png";

export default function ({ pc }) {
  return (
    <div className="w-[70vw] h-[180px] py-2.5 px-0 lg:w-[220px] lg:h-[136px] lg:py-0 lg:px-0">
      <div
        className={clsx(
          "bg-cover shadow-c2 rounded-lg overflow-hidden relative",
          "h-full flex flex-col-reverse  justify-between lg:flex-end lg:pb-[22px] lg:pl-4"
        )}
        style={{
          backgroundImage: `url(${pc ? bgpc : bg})`,
        }}
      >
        <div className="flex items-center px-4 pt-4 pb-6 lg:pb-0 lg:items-start lg:flex-col-reverse">
          <div className="text-[#333] text-[18px] lg:text-[20px]">
            All Plans
          </div>
        </div>
      </div>
    </div>
  );
}
