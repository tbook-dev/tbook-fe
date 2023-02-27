import { useResponsive } from "ahooks";
import { formatDollar, getLastVested } from "@/utils/const";

export default function ({ scheduleInfo }) {
  const { pc } = useResponsive();
  const list = [
    {
      label: "Vested Amount",
      value: formatDollar(scheduleInfo?.vestedAmount),
    },
    {
      label: "Latest Vesting",
      value:
        getLastVested(scheduleInfo?.vestingSchedule?.vestingDetail)?.date ||
        "-",
    },
  ];
  // console.log("scheduleInfo", scheduleInfo);

  return (
    <div className="overflow-hidden bg-white divide-y rounded-md dark:bg-black divide-b-1 lg:pt-4 lg:pb-1.5 shadow-d3 lg:rounded-lg">
      <h2 className="text-[#333] dark:text-white font-medium px-4 py-1.5 text-[20px] leading-[24px] lg:px-6 lg:py-1 lg:text-cwh2">
        Vested
      </h2>

      {list.map((v) => {
        return v.value ? (
          <div
            key={v.label}
            className="flex px-4 lg:py-2 lg:px-6 py-3 text-[14px]"
          >
            <span className="flex-[10] leading-[16px] text-[#666] dark:text-b-8 lg:text-c1">
              {v.label}
            </span>
            <span className="flex-[14] text-right dark:text-white lg:text-left leading-[18px] lg:lg:text-c1">
              {typeof v.value === "function" ? <v.value /> : v.value}
            </span>
          </div>
        ) : null;
      })}

      <div className="flex items-center justify-end px-6 lg:py-1 lg:justify-start">
        <button
          type="button"
          className="flex items-center justify-center text-xs font-medium leading-normal transition duration-150 ease-in-out lg:w-[120px] lg:h-10 dark:bg-white lg:rounded-lg dark:text-black shadow-d3 hover:text-white hover:bg-cw1 hover:shadow-d7 dark:disabled:bg-b-1 dark:disabled:text-b-2 hover:disabled:bg-none hover:disabled:shadow-none"
        >
          Buyback
        </button>
      </div>
    </div>
  );
}
