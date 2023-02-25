import { useResponsive } from "ahooks";
import cardbgpc from "@/images/incentive/headers/vestedpc.png";
import cardbg from "@/images/incentive/headers/vested.png";
import { formatDollar, getLastVested } from "@/utils/const";
import { Button } from "antd";

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
    <div className="overflow-hidden bg-white divide-y rounded-md lg:rounded-lg shadow-c5">
      <div className="h-10 lg:h-[67px] relative overflow-hidden">
        <img
          src={pc ? cardbgpc : cardbg}
          className="absolute top-0 left-0 w-full"
        />
        <h2 className="text-[#333] relative z-10 px-4 py-1.5 text-[20px] leading-[24px] lg:py-3 lg:text-[24px] lg:leading-[32px]">
          Vested
        </h2>
      </div>

      {list.map((v) => {
        return v.value ? (
          <div key={v.label} className="flex px-4 py-3 text-[14px]">
            <span className="flex-[10] leading-[16px] text-[#666] lg:leading-[22px]">
              {v.label}
            </span>
            <span className="flex-[14] text-right lg:text-left leading-[18px] lg:leading-[20px]">
              {typeof v.value === "function" ? <v.value /> : v.value}
            </span>
          </div>
        ) : null;
      })}

      <div className="flex justify-end px-4 py-3 lg:justify-start">
        <Button type="primary" disabled={scheduleInfo?.vestedAmount == 0}>Buyback</Button>
      </div>
    </div>
  );
}
