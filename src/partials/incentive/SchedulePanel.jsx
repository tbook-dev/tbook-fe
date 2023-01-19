import React from "react";
import VestingSchedule from "@/pages/incentive/VestingSchedule";
import _ from "lodash";
import { formatDollar } from '@/utils/const'


const KV = ({ label, value}) => {
  return (
    <div>
      <h2 className="text-[#475569] text-sm  font-medium">{label}</h2>
      <p className="text-[#1E293B] text-base font-bold">{value}</p>
    </div>
  )
}

function SchedulePanel(props) {
  const { grantInfo = {}, tipInfo = {}, scheduleInfo = {} } = props;
  const percent = _.round(
    _.divide(
      scheduleInfo.vestedAmount || 0,
      grantInfo.grantNum  || Number.MAX_SAFE_INTEGER
    ) * 100,
    4
  );
  console.log("grantInfo",percent,scheduleInfo.vestedAmount,grantInfo.grantNum,  grantInfo);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            Vesting Schedule Details
          </h2>
          <div className="flex justify-between flex-wrap w-[600px]">
            <KV
              label="Total Amount"
              value={formatDollar(grantInfo.grantNum)}
            />
            <KV
              label="Vested Amount"
              value={formatDollar(scheduleInfo.vestedAmount)}
            />
          </div>
        </section>
        <section className="w-[600px]">
          <div className="text-[#454545] text-sm text-right">
            {percent}% grants vested
          </div>
          <div className="relative bg-[#D9D9D9] rounded h-2">
            <div
              className="absolute top-0 left-0 h-2 rounded"
              style={{
                width: `${(percent+'%') || "0px"}`,
                background:
                  "linear-gradient(270deg, #6366F1 51.56%, rgba(99, 102, 241, 0) 100%)",
              }}
            />
          </div>
          <div className="text-[#000000] text-sm flex justify-between">
            <div>
              vesting start date:
              {scheduleInfo?.grantStartDate}
            </div>
            <div>
              completed:
              {
                scheduleInfo?.vestingSchedule?.vestingDetail?.[
                  scheduleInfo?.vestingSchedule?.vestingDetail?.length - 1 || 0
                ]?.date
              }
            </div>
          </div>

          <div className="mt-[15px]">
            <VestingSchedule
              dataList={scheduleInfo?.vestingSchedule?.vestingDetail}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SchedulePanel;
