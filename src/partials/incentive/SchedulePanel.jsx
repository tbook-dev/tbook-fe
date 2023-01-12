import React from "react";
import DetailKV from "./DetailKV";
import { grantType } from "@/utils/const";
import VestingSchedule from "@/pages/incentive/VestingSchedule";



function SchedulePanel(props) {
  const { grantInfo = {}, tipInfo = {}, scheduleInfo={} } = props;

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            Vesting Schedule Details
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV label="Total Amount" value={grantInfo.grantNum} />
            <DetailKV label="Vested Amount" value={grantInfo.granteeEmail} />
          </div>
        </section>
        <section className="w-[600px]">
          <div className="text-[#454545] text-sm text-right">
            50% grants vested
          </div>
          <div className="relative bg-[#D9D9D9] rounded h-2">
            <div
              className="absolute top-0 left-0 h-2 rounded"
              style={{
                width: `${grantInfo?.percent || "100px"}`,
                background:
                  "linear-gradient(270deg, #6366F1 51.56%, rgba(99, 102, 241, 0) 100%)",
              }}
            />
          </div>
          <div className="text-[#000000] text-sm flex justify-between">
            <div>vesting start date: {grantInfo?.vestingScheduleDate}</div>
            <div>completed: 2024-01-01: {grantInfo?.vestingScheduleDate}</div>
          </div>

          <div className="mt-[15px]">
            <VestingSchedule dataList={scheduleInfo.vestingDetail}/>
          </div>
          
        </section>
      </div>
    </div>
  );
}

export default SchedulePanel;
