import React, { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import {
  getGrantInfo,
  getTIPInfo,
  getGrantVestingScheduleInfo,
} from "@/api/incentive";
import SettingsSidebar from "../../partials/incentive/SettingsSidebar";
import SchedulePanel from "../../partials/incentive/SchedulePanel";

export default function GrantsSchedule() {
  const { grantId, tipId } = useParams();
  const [tipInfo, setTipInfo] = useState({});
  const [grantInfo, setGrantInfo] = useState({});

  const [scheduleInfo, setSchedule] = useState({});

  useAsyncEffect(async () => {
    const vestingSchedule = await getGrantVestingScheduleInfo(grantId);
    console.log("vestingSchedule->", vestingSchedule);
    setSchedule(vestingSchedule || {});
  }, [grantId]);
  console.log("scheduleInfo", scheduleInfo);

  useAsyncEffect(async function () {
    const data = await getGrantInfo(grantId);
    setGrantInfo(data);
  }, []);

  useAsyncEffect(async function () {
    const data = await getTIPInfo(tipId);
    setTipInfo(data);
  }, []);

  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
      {/* Page header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
          {tipInfo?.incentivePlanName}
        </h1>
        <p className="text-[#475569] text-base">{grantInfo?.granteeName}</p>
      </div>

      {/* Page content */}
      <div className="mb-8 bg-white rounded-sm shadow-lg">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SettingsSidebar />
          <SchedulePanel grantInfo={grantInfo} scheduleInfo={scheduleInfo} />
        </div>
      </div>
    </div>
  );
}
