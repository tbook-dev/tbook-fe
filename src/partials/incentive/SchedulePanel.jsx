import React from "react";
import DetailKV from "./DetailKV";
import VestingSchedule from "@/pages/incentive/VestingSchedule";
import _ from "lodash";
import Statistic from "../../components/local/Statistic";

function SchedulePanel(props) {
  const { grantInfo = {}, tipInfo = {}, scheduleInfo = {} } = props;
  console.log("grantInfo", grantInfo);
  const percent = _.round(
    _.divide(
      grantInfo.grantNum || 0,
      scheduleInfo.vestedAmount || Number.MAX_SAFE_INTEGER
    ) * 100,
    4
  );
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            Vesting Schedule Details
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV
              label="Total Amount"
              value={
                <Statistic
                  style={{ fontWeight: "400", fontSize: 16 }}
                  value={grantInfo.grantNum}
                />
              }
            />
            <DetailKV
              label="Vested Amount"
              value={
                <Statistic
                  style={{ fontWeight: "400", fontSize: 16 }}
                  value={scheduleInfo.vestedAmount}
                />
              }
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
                width: `${percent || "0px"}`,
                background:
                  "linear-gradient(270deg, #6366F1 51.56%, rgba(99, 102, 241, 0) 100%)",
              }}
            />
          </div>
          <div className="text-[#000000] text-sm flex justify-between">
            <div>
              vesting start date:
              {scheduleInfo?.vestingSchedule?.vestingDetail?.[0]?.date}
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
