import React, { useState } from "react";
import IncentiveLayout from "./Layout";
import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { getGrantInfo, getTIPInfo } from "../../api/incentive";
import SettingsSidebar from "../../partials/incentive/SettingsSidebar";
import AccountPanel from "../../partials/settings/AccountPanel";

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
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            {tipInfo?.incentivePlanName}
          </h1>
          <p className="text-[#475569] text-base">{grantInfo?.granteeName}</p>
        </div>

        {/* Page content */}
        <div className="bg-white shadow-lg rounded-sm mb-8">
          <div className="flex flex-col md:flex-row md:-mr-px">
            <SettingsSidebar />
            <AccountPanel />
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}
