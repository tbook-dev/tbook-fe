import React from "react";
import DetailKV from "./DetailKV";
import Eth from "../../components/local/Eth";
import Statistic from "../../components/local/Statistic";

function DetailPanel(props) {
  const { grantInfo = {}, tipInfo = {}, scheduleInfo = {} } = props;
//  console.log("scheduleInfo", scheduleInfo );
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            My Account
          </h2>
          {/* Picture */}
          <div className="flex justify-start">
            <DetailKV label="Name" value={grantInfo.granteeName} />
            <DetailKV label="Email" value={grantInfo.granteeEmail} />
            <DetailKV
              label="Address"
              value={<Eth>{grantInfo.granteeEthAddress}</Eth>}
            />
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            Grant Details
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV
              label="Grant Type"
              value="token option"
            />
            <DetailKV label="Grant Date" value={grantInfo.grantDate} />
            <div className="w-full h-[10px]" />
            <DetailKV label="Total Amount" value={grantInfo.grantNum} />
            <DetailKV
              label="Exercise Price"
              value={
                <Statistic
                  style={{ fontWeight: "400", fontSize: 16 }}
                  value={grantInfo.exercisePrice}
                  suffix="$"
                />
              }
            />
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-base font-bold text-slate-800">
            Vesting Plan
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV label="Vested Amount" value={scheduleInfo.vestedAmount} />
            <DetailKV
              label="Exercise Amount"
              value={
                <Statistic
                  style={{ fontWeight: "400", fontSize: 16 }}
                  value={0}
                />
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DetailPanel;
