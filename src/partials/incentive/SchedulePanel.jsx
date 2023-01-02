import React from "react";
import DetailKV from "./DetailKV";
import { grantType } from "../../utils/const";

function SchedulePanel(props) {
  const { grantInfo = {}, tipInfo = {} } = props;

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-base text-slate-800 font-bold mb-5">
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
              className="absolute h-2 left-0 top-0 rounded"
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
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 mt-[280px]">
          {/* <div className="flex self-end">
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
              Save Changes
            </button>
          </div> */}
          <div className="h-[38px]"></div>
        </div>
      </footer>
    </div>
  );
}

export default SchedulePanel;
