import React from "react";
import DetailKV from "./DetailKV";
import { grantType } from '../../utils/const'

function DetailPanel(props) {
  const { grantInfo = {}, tipInfo = {} } = props;

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-base text-slate-800 font-bold mb-5">
            My Account
          </h2>
          {/* Picture */}
          <div className="flex justify-start">
            <DetailKV label="Name" value={grantInfo.granteeName} />
            <DetailKV label="Email" value={grantInfo.granteeEmail} />
            <DetailKV label="Address" value={grantInfo.granteeName} />
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="text-base text-slate-800 font-bold mb-5">
            Grant Details
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV label="Grant Type" value={grantType.find(v => v.value === grantInfo.grantType)?.name} />
            <DetailKV label="Grant Date" value={grantInfo.grantDate} />
            <div className="w-full h-[10px]" />
            <DetailKV label="Total Amount" value={grantInfo.grantNum} />
            <DetailKV label="Execrise Price" value={grantInfo.exercisePrice} />
          </div>
        </section>
        <section>
          <h2 className="text-base text-slate-800 font-bold mb-5">
            Vesting Plan
          </h2>
          <div className="flex justify-start flex-wrap w-[600px]">
            <DetailKV label="Vested Amount" value={grantInfo.granteeName} />
            <DetailKV label="Execrised Amount" value={grantInfo.granteeEmail} />
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

export default DetailPanel;
