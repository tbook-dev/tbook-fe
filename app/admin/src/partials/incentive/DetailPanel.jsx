import React from "react";
import DetailKV from "./DetailKV";
import Eth from "../../components/local/Eth";
import Statistic from "../../components/local/Statistic";
import { formatDollar, periodMap } from "@/utils/const";

function DetailPanel(props) {
  const { grantInfo = {}, tipInfo = {}, scheduleInfo = {} } = props;
  //  console.log("scheduleInfo", scheduleInfo );
  return (
    <div className="grow">
      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Grantee</h2>
          <div className="grid  grid-cols-2	gap-y-2 gap-x-16 w-[670px]">
            <DetailKV label="Name" value={grantInfo.granteeName} />
            <DetailKV label="Email Address" value={grantInfo.granteeEmail} />
            <DetailKV
              label="Ethereum Address"
              value={<Eth>{grantInfo.granteeEthAddress}</Eth>}
            />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Grant Details
          </h2>
          <div className="grid  grid-cols-2	gap-y-2 gap-x-16 w-[670px]">
            <DetailKV
              label="Incentive Plan"
              value={tipInfo.incentivePlanName}
            />
            <DetailKV label="Grant Type" value="token option" />
            {/* <DetailKV label="Grant Date" value={grantInfo.grantDate} /> */}
            <DetailKV
              label="Total Amount"
              value={formatDollar(grantInfo.grantNum) + " Token"}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Vesting Schedule
          </h2>
          <div className="grid  grid-cols-2	gap-y-2 gap-x-16 w-[670px]">
            <DetailKV
              label="Vesting Start Date"
              value={scheduleInfo.grantStartDate}
            />
            <DetailKV
              label="Vesting by"
              value={grantInfo.grantType === 1 ? "Duration" : "Milestone"}
            />
            <DetailKV
              label="Length"
              value={`${grantInfo.vestingTotalLength} ${
                periodMap[grantInfo.vestingTotalPeriod]
              }`}
            />
            <DetailKV
              label="Vesting Frequency"
              value={`${grantInfo.vestingFrequency}  ${
                periodMap[grantInfo.vestingPeriod]
              }`}
            />

            {grantInfo.cliffTime !== 0 && (
              <DetailKV
                label="Cliff Duration"
                value={`${grantInfo.cliffTime} ${
                  periodMap[grantInfo.cliffPeriod]
                }`}
              />
            )}
            {grantInfo.cliffAmount !== 0 && (
              <DetailKV
                label="Cliff Amount"
                value={`${grantInfo.cliffAmount}%`}
              />
            )}

            <DetailKV
              label="Vesting Times"
              value={scheduleInfo?.vestingSchedule?.vestingDetail?.length}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Exercise Details
          </h2>
          <div className="grid  grid-cols-2	gap-y-2 gap-x-16 w-[670px]">
            <DetailKV label="Exercised Amount" value={formatDollar(scheduleInfo.vestedAmount)} />
            <DetailKV
              label="Exercise Price"
              value={`${formatDollar(grantInfo.exercisePrice)} USD`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DetailPanel;
