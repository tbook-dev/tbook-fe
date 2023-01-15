import React, { useState } from "react";
import IncentiveLayout from "./Layout";
import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { getGrantInfo, getTIPInfo } from "../../api/incentive";
import SettingsSidebar from "../../partials/incentive/SettingsSidebar";
import DetailPanel from "../../partials/incentive/DetailPanel";

export default function GrantDetail() {
  const { grantId, tipId } = useParams();
  const [tipInfo, setTipInfo] = useState({});
  const [grantInfo, setGrantInfo] = useState({});

  useAsyncEffect(async function () {
    const data = await getGrantInfo(grantId);
    setGrantInfo(data);
  }, []);

  useAsyncEffect(async function () {
    const data = await getTIPInfo(tipId);
    setTipInfo(data);
  }, []);

  return (
    <IncentiveLayout>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="flex items-center text-3xl font-bold md:text-3xl text-slate-800">
            {grantInfo?.granteeName}-{grantInfo?.granteeId}
          </h1>
          <p className="text-[#475569] text-base">
            {tipInfo?.incentivePlanName}
          </p>
        </div>

        {/* Page content */}
        <div className="mb-8 bg-white rounded-sm shadow-lg">
          <div className="flex flex-col md:flex-row md:-mr-px">
            <SettingsSidebar />
            <DetailPanel tipInfo={tipInfo} grantInfo={grantInfo} />
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}
