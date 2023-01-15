import React from "react";
import DetailKV from "./DetailKV";
import { grantType } from "../../utils/const";
import Eth from "../../components/local/Eth";
import Statistic from "../../components/local/Statistic";

function DetailPanel(props) {
  const { grantInfo = {}, tipInfo = {} } = props;
  // console.log("grantInfo", grantInfo, tipInfo);
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
              value={
                grantType.find((v) => v.value === grantInfo.grantType)?.name
              }
            />
            <DetailKV label="Grant Date" value={grantInfo.grantDate} />
            <div className="w-full h-[10px]" />
            <DetailKV label="Total Amount" value={grantInfo.grantNum} />
            <DetailKV
              label="Execrise Price"
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
            <DetailKV label="Vested Amount" value={grantInfo.grantNum} />
            <DetailKV
              label="Execrised Amount"
              value={
                <Statistic
                  style={{ fontWeight: "400", fontSize: 16 }}
                  value={grantInfo.a || 0}
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
